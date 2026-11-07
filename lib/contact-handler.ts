import { createHash, createHmac } from "node:crypto";
import { z } from "zod";
import { contactServices } from "./contact-options";
import type { ContactConfig } from "./contact-config";

const oneLine = (limit: number) =>
  z
    .string()
    .trim()
    .max(limit)
    .regex(/^[^\u0000-\u001f\u007f]*$/, "Use a single line of text.");
const schema = z
  .object({
    name: oneLine(100).min(2),
    email: z.email().max(254),
    company: oneLine(140).min(2),
    service: z.enum(contactServices),
    brief: z
      .string()
      .trim()
      .min(20)
      .max(4000)
      .refine((value) => !value.includes("\0")),
    budget: oneLine(100).default(""),
    timeline: oneLine(100).default(""),
    website: z.string().max(0),
    privacy: z.literal(true),
    token: z.string().min(1).max(2048),
    requestId: z.uuid(),
  })
  .strict();
const maxBytes = 16_384;

class BodyTooLarge extends Error {}
async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > maxBytes) throw new BodyTooLarge();
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty_body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new BodyTooLarge();
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const rateScript = `
local sender = tonumber(redis.call('GET', KEYS[1]) or '0')
local total = tonumber(redis.call('GET', KEYS[2]) or '0')
if sender >= 3 or total >= 30 then return 0 end
for _, key in ipairs(KEYS) do
  local value = redis.call('INCR', key)
  if value == 1 then redis.call('EXPIRE', key, 3600) end
end
return 1`;

function reply(
  status: number,
  message: string,
  extra?: Record<string, unknown>,
  headers?: Record<string, string>,
) {
  return Response.json(
    { ok: status === 200, message, ...extra },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}

// Dependencies are injected so failure paths can be tested without sending
// mail, making network calls, or requiring real provider credentials.
export function createContactHandler(config: ContactConfig | null, send: typeof fetch = fetch) {
  return async function handle(request: Request) {
    if (!config)
      return reply(503, "Project enquiries are not available yet. Please try again later.");
    const origin = request.headers.get("origin");
    if (!origin || !config.allowedOrigins.includes(origin))
      return reply(403, "This enquiry could not be verified. Please use the studio website.");
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json")
      return reply(415, "Please send a valid enquiry.");
    let raw: unknown;
    try {
      raw = await readBody(request);
    } catch (error) {
      return reply(
        error instanceof BodyTooLarge ? 413 : 400,
        error instanceof BodyTooLarge
          ? "Your enquiry is too long. Please shorten the brief."
          : "Please check your enquiry and try again.",
      );
    }
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !fields[field]) fields[field] = issue.message;
      }
      return reply(400, "Please check the highlighted fields.", { fields });
    }
    const { name, email, company, service, brief, budget, timeline, token, requestId } =
      parsed.data;
    try {
      const verification = await send("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: config.turnstileSecret, response: token }),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (!verification.ok)
        return reply(503, "The security check is unavailable. Please try again.");
      const challenge = (await verification.json()) as {
        success?: boolean;
        hostname?: string;
        action?: string;
      };
      if (
        !challenge.success ||
        challenge.hostname !== new URL(origin).hostname ||
        challenge.action !== "contact"
      )
        return reply(400, "Please complete a fresh security check and try again.");
      const senderKey = createHmac("sha256", config.rateLimitSecret)
        .update(email.trim().toLowerCase())
        .digest("hex");
      const limit = await send(config.redisUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "EVAL",
          rateScript,
          "2",
          `slidecraft:contact:sender:${senderKey}`,
          "slidecraft:contact:global",
        ]),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (!limit.ok)
        return reply(503, "Enquiries are temporarily unavailable. Please try again later.");
      const allowance = (await limit.json()) as { result?: number; error?: string };
      if (allowance.error || (allowance.result !== 0 && allowance.result !== 1))
        return reply(503, "Enquiries are temporarily unavailable. Please try again later.");
      if (allowance.result === 0)
        return reply(
          429,
          "Too many enquiries have been submitted. Please try again later.",
          undefined,
          { "Retry-After": "3600" },
        );
      const text = [
        "New Slidecraft Studio enquiry",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company / brand: ${company}`,
        `Service: ${service}`,
        `Budget: ${budget || "Not specified"}`,
        `Timeline: ${timeline || "Not specified"}`,
        "",
        "Brief:",
        brief,
      ].join("\n");
      const digest = createHash("sha256").update(text).digest("hex");
      const result = await send("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.resendKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `enquiry/${requestId}/${digest}`,
        },
        body: JSON.stringify({
          from: `Slidecraft Studio <${config.fromEmail}>`,
          to: [config.toEmail],
          reply_to: email,
          subject: "New Slidecraft Studio enquiry",
          text,
        }),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (!result.ok) return reply(502, "Your enquiry could not be sent. Please try again later.");
      const accepted = (await result.json()) as { id?: string; error?: unknown };
      if (typeof accepted.id !== "string" || !accepted.id || accepted.error)
        return reply(502, "Your enquiry could not be sent. Please try again later.");
      return reply(200, "Thank you. Your enquiry has been accepted for email delivery.");
    } catch {
      // Never log the brief, email address, provider payload, or API secrets.
      return reply(503, "Your enquiry could not be completed. Please try again later.");
    }
  };
}
