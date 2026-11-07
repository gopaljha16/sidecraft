import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, insights, readingMinutes } from "@/lib/insights";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { ProjectCta } from "@/components/project-cta";
import { Arrow } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const article = getInsight((await params).slug);
  if (!article) notFound();
  return pageMetadata(`/insights/${article.slug}`, article.title, article.description, "article");
}

export default async function InsightPage({ params }: Props) {
  const article = getInsight((await params).slug);
  if (!article) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: `${site.url}/insights/${article.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    image: `${site.url}/social-image?path=${encodeURIComponent(`/insights/${article.slug}`)}`,
  };
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <article className="container py-12 md:py-20">
        <Link className="text-link" href="/insights">
          <span className="rotate-180">
            <Arrow />
          </span>
          All insights
        </Link>
        <header className="mt-12 max-w-4xl">
          <p className="eyebrow mb-5">
            {article.category} · ~{readingMinutes(article)} MIN READ
          </p>
          <h1 className="font-heading text-4xl leading-[1.08] tracking-[-.055em] md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">{article.intro}</p>
        </header>
        <div className="mt-14 grid gap-12 lg:grid-cols-[.6fr_1.4fr]">
          <aside className="self-start rounded-xl border border-line p-6 lg:sticky lg:top-32">
            <p className="eyebrow mb-5">IN THIS GUIDE</p>
            <nav aria-label="Article contents">
              <ol className="space-y-4">
                {article.sections.map((section, index) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${index + 1}`}
                      className="text-sm leading-relaxed text-muted underline-offset-4 hover:underline"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="max-w-prose space-y-12">
            {article.sections.map((section, index) => (
              <section key={section.title} id={`section-${index + 1}`}>
                <h2 className="mb-6 text-3xl leading-tight tracking-tight">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-base leading-[1.85] text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.checklist && (
                  <ul className="mt-6 space-y-4 border-l-2 border-lime pl-5 text-sm leading-relaxed">
                    {section.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.example && (
                  <div className="mt-6 rounded-xl bg-[#eeeee7] p-6">
                    <p className="eyebrow mb-3 text-brand-strong">A WORKING EXAMPLE</p>
                    <p className="text-sm leading-relaxed">{section.example}</p>
                  </div>
                )}
              </section>
            ))}
            {article.sources && (
              <section className="border-t border-line pt-8">
                <h2 className="text-xl tracking-tight">Platform reference</h2>
                <p className="mt-3 text-sm text-muted">
                  Check the platform’s own guidance before publishing.
                </p>
                <ul className="mt-4 space-y-3">
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        className="text-sm text-brand-strong underline underline-offset-4"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="space-y-5 border-t border-line pt-8">
              <Link className="text-link" href={`/work/${article.relatedProject}`}>
                Explore the related concept <Arrow diagonal />
              </Link>
              <br />
              <Link className="text-link" href="/services/carousel-design">
                See the monthly carousel service <Arrow diagonal />
              </Link>
            </div>
          </div>
        </div>
      </article>
      <ProjectCta />
    </main>
  );
}
