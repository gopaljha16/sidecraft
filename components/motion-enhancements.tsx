"use client";

import { animate, inView, type AnimationPlaybackControls } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionEnhancements() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const reveals = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const floats = [...document.querySelectorAll<HTMLElement>(".hero-float")];
    let stopReveals: (() => void) | undefined;
    let stopHero: (() => void) | undefined;
    const animations = new Set<AnimationPlaybackControls>();
    let floatAnimations: AnimationPlaybackControls[] = [];
    const hero = document.querySelector<HTMLElement>(".hero");
    let heroVisible = false;
    function updateFloat() {
      for (const animation of floatAnimations) {
        if (heroVisible && !document.hidden) animation.play();
        else animation.pause();
      }
    }
    function reset() {
      stopReveals?.();
      stopHero?.();
      for (const animation of animations) animation.stop();
      for (const animation of floatAnimations) animation.stop();
      animations.clear();
      floatAnimations = [];
      for (const element of [...reveals, ...floats]) {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      }
    }
    function connect() {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      // Start only on intersection; server-rendered content is visible without JS.
      stopReveals = inView(
        reveals,
        (element) => {
          const target = element as HTMLElement;
          const animation = animate(
            target,
            { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] },
            {
              duration: desktop.matches ? 0.6 : 0.38,
              delay: Number(target.dataset.revealDelay || 0) / 1000,
              ease,
            },
          );
          animations.add(animation);
          animation.then(() => animations.delete(animation));
        },
        { amount: 0.08 },
      );
      if (hero && desktop.matches) {
        floatAnimations = floats.map((element, index) =>
          animate(
            element,
            { transform: ["translateY(0px)", "translateY(-8px)", "translateY(0px)"] },
            { duration: 7 + index, repeat: Infinity, ease: "easeInOut" },
          ),
        );
        updateFloat();
        stopHero = inView(hero, () => {
          heroVisible = true;
          updateFloat();
          return () => {
            heroVisible = false;
            updateFloat();
          };
        });
      }
    }
    connect();
    preference.addEventListener("change", connect);
    desktop.addEventListener("change", connect);
    document.addEventListener("visibilitychange", updateFloat);
    return () => {
      reset();
      preference.removeEventListener("change", connect);
      desktop.removeEventListener("change", connect);
      document.removeEventListener("visibilitychange", updateFloat);
    };
  }, [pathname]);
  return null;
}
