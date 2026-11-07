import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { PortfolioGrid } from "./portfolio-grid";

// Artwork and case-study data stay on the server. The client receives only the
// filter/search fields and rendered card slots, rather than the art components.
export function Portfolio({ featured = false }: { featured?: boolean }) {
  return (
    <PortfolioGrid
      featured={featured}
      projects={projects.map((project) => ({
        slug: project.slug,
        title: project.title,
        category: project.category,
        brief: project.brief,
        card: <ProjectCard key={project.slug} project={project} />,
      }))}
    />
  );
}
