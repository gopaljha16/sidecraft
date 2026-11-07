"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { gentleSpring, useMotionPreference } from "./motion-provider";
import { categories, type Category } from "@/lib/project-categories";

type FilterableProject = {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  brief: string;
  card: ReactNode;
};

export function PortfolioGrid({
  projects,
  featured = false,
}: {
  projects: FilterableProject[];
  featured?: boolean;
}) {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const id = useId();
  const reducedMotion = useMotionPreference();
  const matches = projects.filter(
    (project) =>
      (category === "All" || project.category === category) &&
      `${project.title} ${project.category} ${project.brief}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  function reset() {
    setCategory("All");
    setQuery("");
  }
  return (
    <div>
      <div className="portfolio-filters mb-10 space-y-6 border-y border-line py-6">
        <LayoutGroup id={id}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by category">
            {categories.map((item) => (
              <motion.button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                className="relative isolate min-h-11 cursor-pointer rounded-full border border-line px-4 py-2 text-xs focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand aria-pressed:border-ink aria-pressed:text-canvas"
              >
                {category === item && (
                  <motion.span
                    layoutId={reducedMotion ? undefined : "active-category"}
                    className="absolute -inset-px -z-10 rounded-full bg-ink"
                    transition={reducedMotion ? { duration: 0 } : gentleSpring}
                  />
                )}
                <span className="relative">{item}</span>
              </motion.button>
            ))}
          </div>
        </LayoutGroup>
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-full max-w-sm">
            <label htmlFor={id} className="mb-2 block text-xs font-medium">
              Search projects
            </label>
            <input
              id={id}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “founder” or “strategy”"
              className="min-h-11 w-full rounded-md border border-line bg-transparent px-4 text-sm outline-brand"
            />
          </div>
          {(category !== "All" || query) && (
            <button
              type="button"
              onClick={reset}
              className="min-h-11 cursor-pointer px-3 text-xs underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-brand"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
      <p role="status" className="mb-6 text-xs text-muted">
        {matches.length} {matches.length === 1 ? "project" : "projects"}
        {category !== "All" ? ` in ${category}` : " to explore"}
      </p>
      <div
        style={{ position: "relative" }}
        className={
          featured
            ? "portfolio-results grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-12"
            : "portfolio-results grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3"
        }
      >
        <AnimatePresence initial={false} mode="popLayout">
          {matches.map((project, index) => (
            <motion.div
              key={project.slug}
              layout={reducedMotion ? false : "position"}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
              transition={
                reducedMotion ? { duration: 0 } : { duration: 0.28, layout: gentleSpring }
              }
              whileHover={reducedMotion ? undefined : { y: -5 }}
              className={
                featured
                  ? index < 2
                    ? "min-w-0 xl:col-span-6"
                    : "min-w-0 xl:col-span-3"
                  : "min-w-0"
              }
            >
              {project.card}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {matches.length === 0 && (
        <div className="rounded-2xl border border-line px-6 py-14 text-center">
          <h3 className="text-2xl">No matching projects.</h3>
          <p className="mt-3 text-sm text-muted">Try another category or a shorter search.</p>
          <button className="button mt-6 cursor-pointer" type="button" onClick={reset}>
            Show all work
          </button>
        </div>
      )}
      <noscript>
        <style>{".portfolio-filters{display:none}"}</style>
        <p className="mt-6 text-sm text-muted">
          All six projects are shown. Open any project to explore the complete carousel.
        </p>
      </noscript>
    </div>
  );
}
