import { pageMetadata, jsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { MonthlyPackage } from "@/components/monthly-package";
import { DeliveryProcess } from "@/components/delivery-process";
import { Faq } from "@/components/faq";
import { ProjectCta } from "@/components/project-cta";
import { Arrow } from "@/components/icons";

export const metadata = pageMetadata(
  "/services/carousel-design",
  "LinkedIn & Instagram Carousel Design Services — Slidecraft Studio",
  "A monthly carousel content system for founders and brands. Eight carousels with research, copy, design, captions, and two revision rounds, from ₹10,000/month.",
);

export default function CarouselDesignPage() {
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Monthly LinkedIn & Instagram Carousel Design",
            provider: { "@id": `${site.url}/#studio` },
            url: `${site.url}/services/carousel-design`,
            description:
              "Eight carousels per month, six to eight slides each, research, writing, design, captions, and two revision rounds. Additional services quoted separately.",
            offers: {
              "@type": "Offer",
              description:
                "Monthly package starting from INR 10,000; final scope agreed before work begins.",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceCurrency: "INR",
                minPrice: 10000,
                unitText: "month",
              },
            },
          }),
        }}
      />
      <section className="container pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="eyebrow mb-6">LINKEDIN & INSTAGRAM CAROUSEL DESIGN</p>
        <h1 className="max-w-4xl font-heading text-5xl leading-[1.03] tracking-[-.06em] md:text-7xl">
          Turn what you know
          <br />
          into content <span className="text-brand">worth saving.</span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
          A focused monthly service for founders and brands with useful expertise to share. We
          connect research, writing, and visual design into a consistent carousel content system.
        </p>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link className="button" href="#pricing">
            See the monthly package <Arrow />
          </Link>
          <Link className="text-link" href="/work">
            Explore the work <Arrow diagonal />
          </Link>
        </div>
      </section>
      <section className="border-y border-line bg-white/30 py-14">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            [
              "For SaaS & B2B teams",
              "Explain an idea, teach a useful framework, or make a complex product topic easier to follow.",
            ],
            [
              "For founders & experts",
              "Turn your point of view into a structured story while keeping the subject-matter expertise yours.",
            ],
            [
              "For brands & agencies",
              "Build a coherent visual language and a repeatable approach to monthly carousel content.",
            ],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="text-2xl tracking-tight">{title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container py-20 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-5">THE WORK, UP CLOSE</p>
            <h2>
              See the story
              <br />
              across every slide.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Original self-initiated concepts.
            <br />
            Explore the brief, design decisions, and all seven slides.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {projects.slice(0, 3).map(({ slides, ...project }) => (
            <ProjectCard key={project.slug} project={{ ...project, cover: slides[0] }} />
          ))}
        </div>
      </section>
      <MonthlyPackage />
      <DeliveryProcess />
      <Faq />
      <ProjectCta />
    </main>
  );
}
