import assert from "node:assert/strict";
import { test } from "node:test";
import { createContactHandler } from "../lib/contact-handler";
import { getContactConfig, type ContactConfig } from "../lib/contact-config";

const config: ContactConfig = {
  resendKey: "test-resend-key",
  fromEmail: "studio@example.test",
  toEmail: "owner@example.test",
  publicEmail: "studio@example.test",
  turnstileSecret: "test-turnstile-secret",
  turnstileSiteKey: "test-turnstile-site-key",
  redisUrl: "https://redis.example.test",
  redisToken: "test-redis-token",
  rateLimitSecret: "test-only-secret-with-more-than-thirty-two-characters",
  retentionDays: 90,
  allowedOrigins: ["https://studio.example.test"],
};
const valid = {
  name: "Example Founder",
  email: "founder@example.test",
  company: "Example Studio",
  service: "Monthly carousel content",
  brief: "We need a clear carousel explaining a fictional onboarding workflow.",
  budget: "",
  timeline: "",
  website: "",
  privacy: true,
  token: "test-token",
  requestId: "11111111-1111-4111-8111-111111111111",
};
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request("https://studio.example.test/api/contact", {
    method: "POST",
    headers: { origin: config.allowedOrigins[0], "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
type Call = { url: string; init: RequestInit | undefined };
function providerMock(
  options: {
    challenge?: unknown;
    limit?: unknown;
    mail?: unknown;
    failedStep?: number;
    throwStep?: number;
  } = {},
) {
  const calls: Call[] = [];
  const send: typeof fetch = async (input, init) => {
    calls.push({ url: String(input), init });
    const step = calls.length;
    if (step === options.throwStep) throw new Error("simulated network failure");
    if (step === options.failedStep)
      return Response.json({ error: "simulated provider error" }, { status: 500 });
    if (String(input).includes("siteverify"))
      return Response.json(
        options.challenge ?? { success: true, hostname: "studio.example.test", action: "contact" },
      );
    if (String(input) === config.redisUrl) return Response.json(options.limit ?? { result: 1 });
    if (String(input) === "https://api.resend.com/emails")
      return Response.json(options.mail ?? { id: "test-provider-id" });
    throw new Error("Unexpected network destination");
  };
  return { calls, send };
}

test("unconfigured enquiries fail closed without contacting a provider", async () => {
  const mock = providerMock();
  const response = await createContactHandler(null, mock.send)(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
  assert.equal(mock.calls.length, 0);
});

test("a valid enquiry is sent as plain text to the configured owner only", async () => {
  const mock = providerMock();
  const response = await createContactHandler(
    config,
    mock.send,
  )(request({ ...valid, brief: valid.brief + " <script>example text</script>" }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(mock.calls.length, 3);
  const email = JSON.parse(String(mock.calls[2].init?.body));
  assert.deepEqual(email.to, [config.toEmail]);
  assert.equal(email.reply_to, valid.email);
  assert.equal(email.subject, "New Slidecraft Studio enquiry");
  assert.equal(email.html, undefined);
  assert.match(email.text, /<script>example text<\/script>/);
  const rateRequest = String(mock.calls[1].init?.body);
  assert.equal(rateRequest.includes(valid.email), false);
  assert.equal(rateRequest.includes(valid.name), false);
});

for (const [label, body] of [
  ["invalid email", { ...valid, email: "invalid" }],
  ["header injection", { ...valid, name: "Name\r\nBcc: target@example.test" }],
  ["honeypot", { ...valid, website: "https://spam.example.test" }],
  ["missing acknowledgement", { ...valid, privacy: false }],
  ["unsupported service", { ...valid, service: "Unsupported" }],
  ["unexpected fields", { ...valid, to: "other@example.test" }],
  ["short brief", { ...valid, brief: "short" }],
] as const) {
  test(`rejects ${label} before any provider call`, async () => {
    const mock = providerMock();
    const response = await createContactHandler(config, mock.send)(request(body));
    assert.equal(response.status, 400);
    assert.equal(mock.calls.length, 0);
  });
}

test("rejects cross-origin and originless requests", async () => {
  const mock = providerMock();
  const handle = createContactHandler(config, mock.send);
  assert.equal(
    (await handle(request(valid, { origin: "https://other.example.test" }))).status,
    403,
  );
  const absent = request();
  absent.headers.delete("origin");
  assert.equal((await handle(absent)).status, 403);
  assert.equal(mock.calls.length, 0);
});

test("rejects malformed JSON and unsupported media types", async () => {
  const mock = providerMock();
  const handle = createContactHandler(config, mock.send);
  assert.equal((await handle(request("{bad"))).status, 400);
  assert.equal((await handle(request(valid, { "content-type": "text/plain" }))).status, 415);
  assert.equal(mock.calls.length, 0);
});

test("bounds payload size even when Content-Length is missing", async () => {
  const mock = providerMock();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("x".repeat(17000)));
      controller.close();
    },
  });
  const streamed = new Request("https://studio.example.test/api/contact", {
    method: "POST",
    headers: { origin: config.allowedOrigins[0], "content-type": "application/json" },
    body: stream,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
  assert.equal((await createContactHandler(config, mock.send)(streamed)).status, 413);
  assert.equal(mock.calls.length, 0);
});

for (const challenge of [
  { success: false },
  { success: true, hostname: "other.example.test", action: "contact" },
  { success: true, hostname: "studio.example.test", action: "wrong-action" },
]) {
  test(`rejects an invalid challenge: ${JSON.stringify(challenge)}`, async () => {
    const mock = providerMock({ challenge });
    assert.equal((await createContactHandler(config, mock.send)(request())).status, 400);
    assert.equal(mock.calls.length, 1);
  });
}

test("durable rate limit denial prevents sending and provides a retry interval", async () => {
  const mock = providerMock({ limit: { result: 0 } });
  const response = await createContactHandler(config, mock.send)(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "3600");
  assert.equal(mock.calls.length, 2);
});

for (const options of [
  { failedStep: 1 },
  { failedStep: 2 },
  { limit: { error: "redis failure" } },
  { limit: { result: 3 } },
  { throwStep: 2 },
]) {
  test(`fails closed when spam verification is unavailable: ${JSON.stringify(options)}`, async () => {
    const mock = providerMock(options);
    const response = await createContactHandler(config, mock.send)(request());
    assert.equal(response.status, 503);
    assert.equal((await response.json()).ok, false);
    assert.ok(mock.calls.every((call) => !call.url.includes("api.resend.com")));
  });
}

for (const [options, status] of [
  [{ failedStep: 3 }, 502],
  [{ throwStep: 3 }, 503],
  [{ mail: {} }, 502],
  [{ mail: { id: "", error: "no acceptance" } }, 502],
] as const) {
  test(`never reports success for email failure: ${JSON.stringify(options)}`, async () => {
    const mock = providerMock(options);
    const response = await createContactHandler(config, mock.send)(request());
    assert.equal(response.status, status);
    assert.equal((await response.json()).ok, false);
  });
}

test("provider idempotency stays stable for a retry and changes with the brief", async () => {
  const keys: string[] = [];
  for (const body of [
    valid,
    { ...valid, token: "fresh-token" },
    { ...valid, brief: valid.brief + " A different brief." },
  ]) {
    const mock = providerMock();
    assert.equal((await createContactHandler(config, mock.send)(request(body))).status, 200);
    keys.push(new Headers(mock.calls[2].init?.headers).get("Idempotency-Key")!);
  }
  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[0], keys[2]);
  assert.ok(keys[0].length <= 256);
});

test("configuration requires real readiness decisions and private dependencies", () => {
  assert.equal(getContactConfig({}), null);
  assert.equal(
    getContactConfig({ CONTACT_ENABLED: "true", CONTACT_PRIVACY_REVIEWED: "true" }),
    null,
  );
  const env = {
    CONTACT_ENABLED: "true",
    CONTACT_PRIVACY_REVIEWED: "true",
    CONTACT_RETENTION_DAYS: "90",
    CONTACT_FROM_EMAIL: config.fromEmail,
    CONTACT_TO_EMAIL: config.toEmail,
    NEXT_PUBLIC_CONTACT_EMAIL: config.publicEmail,
    RESEND_API_KEY: config.resendKey,
    TURNSTILE_SECRET_KEY: config.turnstileSecret,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: config.turnstileSiteKey,
    UPSTASH_REDIS_REST_URL: config.redisUrl,
    UPSTASH_REDIS_REST_TOKEN: config.redisToken,
    CONTACT_RATE_LIMIT_SECRET: config.rateLimitSecret,
  };
  assert.ok(getContactConfig(env));
  assert.equal(getContactConfig({ ...env, CONTACT_PRIVACY_REVIEWED: "false" }), null);
  assert.equal(getContactConfig({ ...env, CONTACT_RETENTION_DAYS: "" }), null);
  assert.equal(getContactConfig({ ...env, VERCEL_ENV: "preview" }), null);
  assert.equal(
    getContactConfig({ ...env, UPSTASH_REDIS_REST_URL: "http://insecure.example.test" }),
    null,
  );
});
