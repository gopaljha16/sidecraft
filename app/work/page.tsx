import { pageMetadata } from "@/lib/seo";
import { Portfolio } from "@/components/portfolio";
import { ProjectCta } from "@/components/project-cta";

export const metadata = pageMetadata(
  "/work",
  "Carousel Design Portfolio — Slidecraft Studio",
  "Explore six self-initiated carousel concepts, with seven complete slides each and the creative thinking behind the work.",
);

export default function WorkPage() {
  return (
    <main id="main-content">
      <section className="container pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="eyebrow mb-6">THE STUDIO PORTFOLIO</p>
        <h1 className="max-w-4xl font-heading text-5xl leading-[1.03] tracking-[-.06em] md:text-7xl">
          Different ideas.
          <br />
          <span className="text-muted">Distinct visual worlds.</span>
        </h1>
        <p className="mt-7 mb-12 max-w-xl text-base leading-relaxed text-muted">
          Six self-initiated concept projects. Forty-two original slides. A closer look at how we
          turn a topic into a clear, considered carousel.
        </p>
        <h2 className="sr-only">Concept projects</h2>
        <Portfolio />
      </section>
      <ProjectCta />
    </main>
  );
}
