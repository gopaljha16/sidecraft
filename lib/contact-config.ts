import { z } from "zod";
import { site } from "./site";

export type ContactConfig = {
  resendKey: string;
  fromEmail: string;
  toEmail: string;
  publicEmail: string;
  turnstileSecret: string;
  turnstileSiteKey: string;
  redisUrl: string;
  redisToken: string;
  rateLimitSecret: string;
  retentionDays: number;
  allowedOrigins: string[];
};

// This module is used only by server components and the API route. Never pass
// the full config into a client component; only the public widget key is needed.
export function getContactConfig(
  env: Readonly<Record<string, string | undefined>> = process.env,
): ContactConfig | null {
  if (env.CONTACT_ENABLED !== "true" || env.CONTACT_PRIVACY_REVIEWED !== "true") return null;
  if (env.VERCEL_ENV === "preview" && !env.CONTACT_PREVIEW_ORIGIN) return null;
  const retentionDays = Number(env.CONTACT_RETENTION_DAYS);
  const emails = [env.CONTACT_FROM_EMAIL, env.CONTACT_TO_EMAIL, env.NEXT_PUBLIC_CONTACT_EMAIL];
  if (
    emails.some((value) => !z.email().safeParse(value).success) ||
    !Number.isInteger(retentionDays) ||
    retentionDays < 1 ||
    retentionDays > 3650
  )
    return null;
  const required = [
    env.RESEND_API_KEY,
    env.TURNSTILE_SECRET_KEY,
    env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    env.UPSTASH_REDIS_REST_URL,
    env.UPSTASH_REDIS_REST_TOKEN,
    env.CONTACT_RATE_LIMIT_SECRET,
  ];
  if (required.some((value) => !value?.trim()) || (env.CONTACT_RATE_LIMIT_SECRET?.length || 0) < 32)
    return null;
  try {
    const redis = new URL(env.UPSTASH_REDIS_REST_URL!);
    if (redis.protocol !== "https:") return null;
    const allowedOrigins = [site.url];
    if (env.CONTACT_PREVIEW_ORIGIN) {
      const preview = new URL(env.CONTACT_PREVIEW_ORIGIN);
      if (
        preview.protocol !== "https:" &&
        !(preview.protocol === "http:" && ["localhost", "127.0.0.1"].includes(preview.hostname))
      )
        return null;
      allowedOrigins.push(preview.origin);
    }
    return {
      resendKey: env.RESEND_API_KEY!,
      fromEmail: emails[0]!,
      toEmail: emails[1]!,
      publicEmail: emails[2]!,
      turnstileSecret: env.TURNSTILE_SECRET_KEY!,
      turnstileSiteKey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
      redisUrl: redis.origin,
      redisToken: env.UPSTASH_REDIS_REST_TOKEN!,
      rateLimitSecret: env.CONTACT_RATE_LIMIT_SECRET!,
      retentionDays,
      allowedOrigins,
    };
  } catch {
    return null;
  }
}
