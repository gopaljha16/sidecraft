import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectSlide } from "./project-slide";
import { Arrow } from "./icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="min-w-0">
      <Link
        className="project-card-link group block rounded-2xl focus-visible:outline-3 focus-visible:outline-offset-8 focus-visible:outline-brand"
        href={`/work/${project.slug}`}
        prefetch={false}
      >
        <div className={`project-thumbnail theme-${project.theme}`}>
          <ProjectSlide theme={project.theme} slide={project.slides[0]} index={0} />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <span>{project.category}</span>
          <span className="rounded border border-line px-1.5 py-1 text-[8px] tracking-wider">
            CONCEPT · 7 SLIDES
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <h3 className="text-2xl tracking-tight">{project.title}</h3>
          <Arrow diagonal />
        </div>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{project.brief}</p>
        <p className="mt-3 text-xs text-muted">Self-initiated concept project</p>
      </Link>
    </article>
  );
}
