"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { Arrow } from "./icons";

export function ProjectViewer({ title, slides }: { title: string; slides: ReactNode[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const id = useId();
  function goTo(index: number) {
    const next = Math.max(0, Math.min(index, slides.length - 1));
    const element = track.current;
    if (element)
      element.scrollTo({
        left: element.clientWidth * next,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  const controlClass =
    "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-canvas disabled:cursor-default disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand";
  return (
    <div
      className="mx-auto w-full max-w-xl"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title}, seven-slide concept`}
    >
      <p id={`${id}-help`} className="mb-4 text-xs leading-relaxed text-muted">
        Swipe or scroll to explore. Focus the artwork and use the left/right arrows, Home, or End.
      </p>
      <div
        id={id}
        ref={track}
        tabIndex={0}
        aria-label="Carousel slides"
        aria-describedby={`${id}-help`}
        className="viewer-track flex w-full snap-x snap-mandatory overflow-x-auto rounded-xl outline-brand focus-visible:outline-3 focus-visible:outline-offset-4"
        onScroll={(event) => {
          const element = event.currentTarget;
          setCurrent(
            Math.max(
              0,
              Math.min(slides.length - 1, Math.round(element.scrollLeft / element.clientWidth)),
            ),
          );
        }}
        onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          goTo(
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? slides.length - 1
                : current + (event.key === "ArrowRight" ? 1 : -1),
          );
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-0 shrink-0 grow-0 basis-full snap-start snap-always"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="viewer-controls mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className={controlClass}
          aria-label="Previous slide"
          aria-controls={id}
          disabled={current === 0}
          onClick={() => goTo(current - 1)}
        >
          <span className="rotate-180">
            <Arrow />
          </span>
        </button>
        <p role="status" aria-atomic="true" className="text-sm tabular-nums">
          Slide {current + 1} / {slides.length}
        </p>
        <button
          type="button"
          className={controlClass}
          aria-label="Next slide"
          aria-controls={id}
          disabled={current === slides.length - 1}
          onClick={() => goTo(current + 1)}
        >
          <Arrow />
        </button>
      </div>
      <div
        className="viewer-controls mt-4 flex justify-center gap-1"
        role="group"
        aria-label="Choose a slide"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
            onClick={() => goTo(index)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full text-xs text-muted outline-brand aria-current:bg-ink aria-current:text-canvas"
          >
            {index + 1}
          </button>
        ))}
      </div>
      <noscript>
        <style>{".viewer-controls{display:none}"}</style>
      </noscript>
    </div>
  );
}
