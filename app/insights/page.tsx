import { pageMetadata } from "@/lib/seo";
import { InsightCards } from "@/components/insight-cards";
import { ProjectCta } from "@/components/project-cta";

export const metadata = pageMetadata(
  "/insights",
  "Carousel Content Guides — Slidecraft Studio",
  "Practical studio guides to briefing a carousel designer and planning a focused month of content for a SaaS founder.",
);

export default function InsightsPage() {
  return (
    <main id="main-content">
      <section className="container py-16 md:py-24">
        <p className="eyebrow mb-6">FROM THE STUDIO NOTEBOOK</p>
        <h1 className="max-w-4xl font-heading text-5xl leading-[1.04] tracking-[-.06em] md:text-7xl">
          Better briefs.
          <br />
          <span className="text-muted">More useful stories.</span>
        </h1>
        <p className="mt-7 mb-14 max-w-xl text-base leading-relaxed text-muted">
          Practical ideas for people commissioning, planning, and creating thoughtful carousel
          content.
        </p>
        <h2 className="sr-only">Studio guides</h2>
        <InsightCards />
      </section>
      <ProjectCta />
    </main>
  );
}
