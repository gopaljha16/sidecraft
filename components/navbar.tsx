"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";
import { Wordmark } from "./wordmark";

const links = [
  ["Work", "/work"],
  ["Services", "/services/carousel-design"],
  ["Approach", "/#approach"],
  ["About", "/#about"],
] as const;

export function Navbar() {
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    if (!sentinel.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);
  function close() {
    if (menu.current) menu.current.open = false;
  }
  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none -mb-px h-px" />
      <header
        data-compact={compact}
        className="header-shell sticky top-0 z-20 h-[78px] border-b border-line bg-canvas/97 md:h-24"
      >
        <div className="nav-content container flex h-full items-center justify-between gap-3 md:gap-6">
          <Wordmark />
          <nav
            className="desktop-nav hidden gap-6 text-xs md:flex lg:gap-8"
            aria-label="Main navigation"
          >
            {links.map(([label, href]) => (
              <Link className="nav-link py-2" key={label} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <Link
            className="button ml-auto min-h-10 gap-3 px-3 py-2 text-[11px] md:ml-0 md:min-h-11 md:gap-6 md:px-5 md:text-xs [&>svg]:size-4 md:[&>svg]:size-5"
            href="/#contact"
          >
            Let’s talk <Arrow diagonal />
          </Link>
          <details
            className="mobile-menu md:hidden"
            ref={menu}
            onKeyDown={(event) => {
              if (event.key === "Escape" && menu.current?.open) {
                close();
                trigger.current?.focus();
              }
            }}
          >
            <summary
              ref={trigger}
              aria-label="Toggle navigation"
              className="flex size-10 cursor-pointer list-none flex-col items-center justify-center gap-[5px] rounded-md border border-line in-open:bg-lime [&::-webkit-details-marker]:hidden"
            >
              <span className="h-px w-4 bg-ink" />
              <span className="h-px w-4 bg-ink" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              onClick={close}
              className="absolute inset-x-0 top-[77px] border-b border-line bg-canvas px-6 pt-4 pb-6 shadow-sm"
            >
              {[...links, ["Let’s talk", "/#contact"]].map(([label, href]) => (
                <Link
                  className="flex min-h-14 items-center justify-between border-b border-line py-4 text-base"
                  key={label}
                  href={href}
                >
                  {label}
                  <Arrow diagonal />
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
