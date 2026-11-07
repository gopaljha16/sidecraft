import type { Metadata } from "next";
import { site } from "./site";

// Indexing is an explicit launch step. A Vercel preview stays noindex even if
// production environment variables were copied into it.
export function indexingEnabled() {
  return (
    process.env.SITE_INDEXING_ENABLED === "true" &&
    (process.env.VERCEL_ENV
      ? process.env.VERCEL_ENV === "production"
      : process.env.DEPLOYMENT_ENV === "production")
  );
}

export function pageMetadata(
  path: string,
  title: string,
  description: string,
  type: "website" | "article" = "website",
): Metadata {
  const url = new URL(path, site.url).toString();
  const image = new URL(`/social-image?path=${encodeURIComponent(path)}`, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — Slidecraft Studio` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
