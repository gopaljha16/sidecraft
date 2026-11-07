"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPreference } from "./motion-provider";
import { Arrow } from "./icons";

const steps = [
  {
    title: "Discover",
    heading: "Find the idea worth sharing.",
    text: "Your goal, your audience, your voice. We start with the useful thing you know and the person who needs to hear it.",
  },
  {
    title: "Structure",
    heading: "Give the story a spine.",
    text: "A clear hook, a thoughtful sequence, and one useful takeaway. Every slide has a job, and the next one follows naturally.",
  },
  {
    title: "Design",
    heading: "Make every slide count.",
    text: "Typography, hierarchy, and diagrams give the same idea a distinctive visual language. The design serves the story.",
  },
  {
    title: "Deliver",
    heading: "A consistent, considered system.",
    text: "Refine the work together, then deliver the agreed assets. A monthly rhythm gives your expertise a recognisable home.",
  },
];
const outline = [
  ["Hook", "Great products. Better growth."],
  ["Context", "A user is not a funnel."],
  ["Insight", "Define the first useful outcome."],
  ["Example", "Less setup. More doing."],
  ["Framework", "Observe → improve → review."],
  ["Takeaway", "Make the learning repeatable."],
  ["Next step", "Map your user’s first win."],
];

export function Approach({
  design,
  deliverySlides,
}: {
  design: ReactNode;
  deliverySlides: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const manual = useRef(false);
  const id = useId();
  const reducedMotion = useMotionPreference();
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let observer: IntersectionObserver | undefined;
    function connect() {
      observer?.disconnect();
      if (!desktop.matches || !list.current || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        () => {
          if (manual.current || !list.current) return;
          const visible = [...list.current.children]
            .map((element, index) => ({ index, rect: element.getBoundingClientRect() }))
            .filter(
              ({ rect }) =>
                rect.bottom > window.innerHeight * 0.3 && rect.top < window.innerHeight * 0.65,
            );
          if (visible.length) {
            visible.sort(
              (a, b) =>
                Math.abs(a.rect.top + a.rect.height / 2 - window.innerHeight * 0.48) -
                Math.abs(b.rect.top + b.rect.height / 2 - window.innerHeight * 0.48),
            );
            setActive(visible[0].index);
          }
        },
        { rootMargin: "-30% 0px -35% 0px", threshold: [0, 0.2, 0.5, 1] },
      );
      for (const element of list.current.children) observer.observe(element);
    }
    const unlock = () => {
      manual.current = false;
    };
    const unlockForKey = (event: KeyboardEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      if (
        ["PageUp", "PageDown", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key) ||
        (event.key === " " && target === document.body)
      )
        unlock();
    };
    connect();
    desktop.addEventListener("change", connect);
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchmove", unlock, { passive: true });
    window.addEventListener("keydown", unlockForKey);
    return () => {
      observer?.disconnect();
      desktop.removeEventListener("change", connect);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchmove", unlock);
      window.removeEventListener("keydown", unlockForKey);
    };
  }, []);
  return (
    <section
      className="bg-ink py-16 text-canvas md:py-24"
      id="approach"
      aria-labelledby="approach-heading"
    >
      <div className="container">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-5 text-lime">02 / OUR APPROACH</p>
            <h2 id="approach-heading">
              Your idea. A story.
              <br />
              <span className="text-lime">A carousel people remember.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-canvas/70">
            A repeatable creative process that turns raw expertise into clear, visual storytelling.
          </p>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <ol ref={list} className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-0">
            {steps.map((step, index) => (
              <li key={step.title} data-approach-step={index} className="min-w-0 lg:min-h-52">
                <button
                  type="button"
                  aria-pressed={active === index}
                  aria-controls={id}
                  onClick={() => {
                    manual.current = true;
                    setActive(index);
                  }}
                  className="approach-step flex h-full min-h-40 w-full cursor-pointer flex-col items-start rounded-xl border border-white/20 p-4 text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-lime aria-pressed:border-lime aria-pressed:bg-white/5 lg:min-h-48 lg:rounded-none lg:border-x-0 lg:border-t lg:border-b-0 lg:px-0 lg:py-7 lg:aria-pressed:bg-transparent"
                >
                  <span className="mb-4 flex w-full items-center justify-between text-xs text-lime">
                    0{index + 1}
                    <Arrow />
                  </span>
                  <span className="font-heading text-2xl tracking-tight lg:text-3xl">
                    {step.title}
                  </span>
                  <span className="mt-3 hidden text-sm lg:block">{step.heading}</span>
                  <span className="mt-2 block text-xs leading-relaxed text-canvas/70 lg:max-w-sm lg:text-sm">
                    {step.text}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="approach-preview-column mx-auto w-full max-w-lg lg:sticky lg:top-32">
            <figure id={id} aria-labelledby={`${id}-caption`}>
              <div className="approach-preview relative aspect-4/5 overflow-hidden rounded-xl bg-canvas text-ink">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    className="approach-state absolute inset-0 h-full"
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
                    transition={{ duration: reducedMotion ? 0 : 0.32 }}
                  >
                    {active === 0 ? (
                      <div className="approach-notes flex h-full flex-col p-[8%]">
                        <div className="flex items-center justify-between border-b border-line pb-[5%] text-[2.4cqw] tracking-wider">
                          <span>THE STARTING POINT</span>
                          <span>01 / 04</span>
                        </div>
                        <span className="mt-[12%] text-[2.5cqw] tracking-widest text-muted">
                          ONE RAW IDEA
                        </span>
                        <h3 className="mt-[5%] text-[12cqw] leading-none tracking-[-.06em]">
                          What makes
                          <br />a product
                          <br />
                          <span className="text-brand">feel useful?</span>
                        </h3>
                        <p className="mt-[8%] border-l-2 border-brand pl-[5%] text-[3.5cqw] leading-relaxed">
                          Audience: SaaS founders
                          <br />
                          Goal: a better first experience
                        </p>
                        <ul className="mt-[7%] space-y-[3%] text-[3cqw] text-muted">
                          <li>↳ Find the first useful outcome.</li>
                          <li>↳ Remove unnecessary setup.</li>
                          <li>↳ Learn where people get stuck.</li>
                        </ul>
                        <span className="mt-auto border-t border-line pt-[5%] text-[2.4cqw] tracking-wider">
                          A BRIEF BEFORE A BEAUTIFUL SLIDE.
                        </span>
                      </div>
                    ) : active === 1 ? (
                      <div className="approach-notes flex h-full flex-col p-[8%]">
                        <span className="border-b border-line pb-[5%] text-[2.4cqw] tracking-wider">
                          THE SAME IDEA, GIVEN STRUCTURE
                        </span>
                        <h3 className="my-[6%] text-[10cqw] leading-none tracking-tight">
                          Seven slides.
                          <br />
                          <span className="text-brand">One clear story.</span>
                        </h3>
                        <ol className="flex flex-1 flex-col justify-between">
                          {outline.map(([label, text], index) => (
                            <li
                              key={label}
                              className="flex items-baseline gap-[5%] border-t border-line py-[1.5%]"
                            >
                              <span className="text-[2.6cqw] text-brand-strong">0{index + 1}</span>
                              <div>
                                <span className="block text-[2.4cqw] tracking-wider text-muted uppercase">
                                  {label}
                                </span>
                                <span className="mt-[1%] block text-[3cqw]">{text}</span>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : active === 2 ? (
                      design
                    ) : (
                      <div className="approach-notes relative flex h-full flex-col overflow-hidden p-[8%]">
                        <span className="text-[2.4cqw] tracking-wider">
                          A COHESIVE CONTENT SYSTEM
                        </span>
                        <h3 className="mt-[7%] text-[11cqw] leading-none tracking-tight">
                          Ready for
                          <br />
                          <span className="text-brand">the next swipe.</span>
                        </h3>
                        <div
                          className="relative mt-[10%] h-[48%]"
                          aria-label="Three finished slide concepts"
                        >
                          {deliverySlides.map((slide, index) => (
                            <div key={index} className={`delivery-fan delivery-fan-${index}`}>
                              {slide}
                            </div>
                          ))}
                        </div>
                        <p className="mt-auto text-[4cqw] font-medium">8 carousels per month.</p>
                        <p className="mt-[2%] text-[2.5cqw] text-muted">
                          Illustrative concept assets. A repeatable creative rhythm.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <figcaption
                id={`${id}-caption`}
                className="mt-5 flex items-center justify-between gap-4 text-xs text-canvas/70"
              >
                <span role="status" aria-atomic="true">
                  0{active + 1} / 04 · {steps[active].title}
                </span>
                <span>ONE IDEA, THROUGH EVERY STAGE.</span>
              </figcaption>
            </figure>
            {active === 3 && (
              <Link className="text-link mt-6 text-lime" href="/#pricing">
                Get your monthly carousel plan <Arrow />
              </Link>
            )}
            <noscript>
              <style>{".approach-step{cursor:default}"}</style>
              <p className="mt-5 text-sm text-canvas/70">
                Start with the brief above. Read all four steps to explore the complete process.
              </p>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
