import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { insights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/work",
    "/services/carousel-design",
    "/insights",
    "/privacy",
    ...projects.map((project) => `/work/${project.slug}`),
    ...insights.map((article) => `/insights/${article.slug}`),
  ].map((path) => ({ url: new URL(path, site.url).toString() }));
}
