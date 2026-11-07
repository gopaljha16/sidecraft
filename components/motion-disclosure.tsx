"use client";

import { animate, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { editorialEase, useMotionPreference } from "./motion-provider";

// Keep native details/summary behavior when JavaScript is unavailable.
export function useMotionDisclosure() {
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const animation = useRef<AnimationPlaybackControls | null>(null);
  const requestedOpen = useRef<boolean | null>(null);
  const reducedMotion = useMotionPreference();

  function clearStyles() {
    const element = content.current;
    if (!element) return;
    element.style.removeProperty("height");
    element.style.removeProperty("opacity");
    element.style.removeProperty("overflow");
  }

  function setOpen(next: boolean, immediate = false) {
    const disclosure = details.current;
    const element = content.current;
    if (!disclosure || !element) return;
    requestedOpen.current = next;
    animation.current?.stop();
    element.inert = !next;
    if (reducedMotion || immediate) {
      disclosure.open = next;
      clearStyles();
      return;
    }
    if (!disclosure.open) {
      disclosure.open = true;
      element.style.height = "0px";
      element.style.opacity = "0";
    }
    element.style.overflow = "hidden";
    animation.current = animate(
      element,
      { height: next ? element.scrollHeight : 0, opacity: next ? 1 : 0 },
      {
        duration: next ? 0.34 : 0.24,
        ease: editorialEase,
        onComplete: () => {
          disclosure.open = next;
          clearStyles();
          animation.current = null;
        },
      },
    );
  }

  useEffect(() => {
    if (!reducedMotion) return;
    animation.current?.stop();
    if (details.current && requestedOpen.current !== null)
      details.current.open = requestedOpen.current;
    clearStyles();
  }, [reducedMotion]);
  useEffect(() => () => animation.current?.stop(), []);

  return {
    details,
    summary,
    content,
    toggle: () => setOpen(!(requestedOpen.current ?? details.current?.open)),
    close: (immediate = false) => setOpen(false, immediate),
  };
}

export function MotionDisclosure({
  summary,
  children,
  className,
  summaryClassName,
}: {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
}) {
  const disclosure = useMotionDisclosure();
  return (
    <details ref={disclosure.details} className={className}>
      <summary
        ref={disclosure.summary}
        className={summaryClassName}
        onClick={(event) => {
          event.preventDefault();
          disclosure.toggle();
        }}
      >
        {summary}
      </summary>
      <div ref={disclosure.content}>{children}</div>
    </details>
  );
}
