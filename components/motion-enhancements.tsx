"use client";

import { useEffect } from "react";

export function MotionEnhancements() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let revealObserver: IntersectionObserver | undefined;
    let heroObserver: IntersectionObserver | undefined;
    const animations = new Set<Animation>();
    const hero = document.querySelector<HTMLElement>(".hero");
    let heroVisible = false;
    function setFloat() {
      if (hero)
        hero.dataset.inView = String(heroVisible && !document.hidden && !preference.matches);
    }
    function connect() {
      revealObserver?.disconnect();
      heroObserver?.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
      setFloat();
      if (
        preference.matches ||
        !("IntersectionObserver" in window) ||
        !("animate" in Element.prototype)
      )
        return;
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            revealObserver?.unobserve(element);
            const animation = element.animate(
              [
                { opacity: 0, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: window.innerWidth < 768 ? 350 : 550,
                delay: Number(element.dataset.revealDelay || 0),
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "backwards",
              },
            );
            animations.add(animation);
            animation.finished.then(
              () => animations.delete(animation),
              () => animations.delete(animation),
            );
          }
        },
        { threshold: 0.08 },
      );
      for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]"))
        revealObserver.observe(element);
      if (hero) {
        heroObserver = new IntersectionObserver(([entry]) => {
          heroVisible = entry.isIntersecting;
          setFloat();
        });
        heroObserver.observe(hero);
      }
    }
    connect();
    preference.addEventListener("change", connect);
    document.addEventListener("visibilitychange", setFloat);
    return () => {
      revealObserver?.disconnect();
      heroObserver?.disconnect();
      for (const animation of animations) animation.cancel();
      if (hero) delete hero.dataset.inView;
      preference.removeEventListener("change", connect);
      document.removeEventListener("visibilitychange", setFloat);
    };
  }, []);
  return null;
}
