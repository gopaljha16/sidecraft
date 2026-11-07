import Link from "next/link";
import { insights, readingMinutes } from "@/lib/insights";
import { Arrow } from "./icons";

export function InsightCards() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {insights.map((article, index) => (
        <article key={article.slug}>
          <Link
            href={`/insights/${article.slug}`}
            className="group block h-full rounded-2xl border border-line p-7 focus-visible:outline-3 focus-visible:outline-brand md:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow text-muted">{article.category}</span>
              <span className="font-heading text-4xl tracking-tight text-brand">0{index + 1}</span>
            </div>
            <h3 className="mt-10 max-w-lg text-3xl leading-tight tracking-tight">
              {article.title}
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
              {article.description}
            </p>
            <div className="mt-8 flex items-center justify-between gap-4 text-xs">
              <span>~{readingMinutes(article)} min read</span>
              <span className="text-link">
                Read the guide <Arrow diagonal />
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
