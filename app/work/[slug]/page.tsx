import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { ProjectSlide } from "@/components/project-slide";
import { ProjectViewer } from "@/components/project-viewer";
import { ProjectCta } from "@/components/project-cta";
import { Arrow } from "@/components/icons";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return pageMetadata(
    `/work/${project.slug}`,
    `${project.title} — Carousel Concept | Slidecraft Studio`,
    `${project.brief} A self-initiated, seven-slide concept project.`,
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: `${project.title} — self-initiated concept`,
            description: `${project.brief} Self-initiated concept project; no commissioned client results claimed.`,
            url: `${site.url}/work/${project.slug}`,
            creator: { "@id": `${site.url}/#studio` },
            genre: project.category,
            isAccessibleForFree: true,
          }),
        }}
      />
      <div className="container pt-12 md:pt-20">
        <Link className="text-link" href="/work">
          <span className="rotate-180">
            <Arrow />
          </span>
          All work
        </Link>
        <div className="mt-10 mb-12">
          <p className="eyebrow mb-5">{project.category} / 7 SLIDES</p>
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.04] tracking-[-.06em] md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 text-sm font-medium text-brand">Self-initiated concept project.</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{project.brief}</p>
          {project.theme === "business" && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              This is a fictional business scenario. It does not describe a client engagement or
              measured business results.
            </p>
          )}
        </div>
        <section
          className="grid items-start gap-12 pb-20 lg:grid-cols-[1fr_1.2fr] lg:gap-20"
          aria-label="Project story and complete carousel"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl tracking-tight">The objective</h2>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                {project.objective}
              </p>
            </div>
            <dl className="space-y-7">
              <div>
                <dt className="eyebrow">INTENDED AUDIENCE</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted">{project.audience}</dd>
              </div>
              <div>
                <dt className="eyebrow">CONTENT ANGLE</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted">{project.angle}</dd>
              </div>
              <div>
                <dt className="eyebrow">VISUAL STRATEGY</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted">{project.strategy}</dd>
              </div>
              <div>
                <dt className="eyebrow">THE PALETTE</dt>
                <dd className="mt-4 flex flex-wrap gap-5">
                  {project.palette.map((color) => (
                    <span key={color.hex} className="flex items-center gap-2 text-xs">
                      <span
                        className="size-7 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>
                        {color.name}
                        <span className="mt-1 block text-[10px] text-muted">{color.hex}</span>
                      </span>
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <ProjectViewer
            title={project.title}
            slides={project.slides.map((slide, index) => (
              <ProjectSlide key={index} slide={slide} index={index} theme={project.theme} />
            ))}
          />
        </section>
        <div className="flex flex-col justify-between gap-5 border-t border-line py-10 sm:flex-row">
          <Link className="text-link" href="/services/carousel-design">
            Explore carousel design <Arrow diagonal />
          </Link>
          <Link className="text-link" href={`/work/${next.slug}`}>
            Next: {next.title} <Arrow />
          </Link>
        </div>
      </div>
      <ProjectCta />
    </main>
  );
}
