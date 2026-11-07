import type { ProjectTheme, Slide } from "@/lib/projects";
import { CarouselArtwork } from "./carousel-artwork";
import { Arrow } from "./icons";

export function ProjectSlide({
  theme,
  slide,
  index,
}: {
  theme: ProjectTheme;
  slide: Slide;
  index: number;
}) {
  if (index === 0 && (theme === "saas" || theme === "founder" || theme === "education")) {
    return <CarouselArtwork variant={theme} />;
  }
  return (
    <div className={`project-slide theme-${theme} layout-${slide.layout}`}>
      <div className="slide-masthead">
        <span>SLIDECRAFT / CONCEPT SERIES</span>
        <span>{String(index + 1).padStart(2, "0")} / 07</span>
      </div>
      <span className="slide-kicker">{slide.kicker}</span>
      <h3>{slide.title}</h3>
      <p className="slide-body">{slide.body}</p>
      {slide.points ? (
        <ol className="slide-points">
          {slide.points.map((point, i) => (
            <li key={point}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{point}</p>
            </li>
          ))}
        </ol>
      ) : (
        <span className="slide-symbol" aria-hidden="true">
          {slide.layout === "closing" ? "↗" : "✳"}
        </span>
      )}
      <div className="slide-footer">
        <span>{slide.note}</span>
        <Arrow />
      </div>
    </div>
  );
}
