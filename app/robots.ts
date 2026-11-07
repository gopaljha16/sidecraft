import type { MetadataRoute } from "next";
import { indexingEnabled } from "@/lib/seo";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return indexingEnabled()
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: `${site.url}/sitemap.xml`,
        host: site.url,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
