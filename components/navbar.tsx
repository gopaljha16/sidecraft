"use client";

import Link from "next/link";
import { useRef } from "react";
import { Arrow, BrandMark } from "./icons";

const links = [
  ["Work", "/work"],
  ["Services", "/services/carousel-design"],
  ["Approach", "/#approach"],
  ["About", "/#about"],
] as const;

export function Navbar() {
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  function close() {
    if (menu.current) menu.current.open = false;
  }
  return (
    <header className="header-shell">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Slidecraft Studio home">
          <BrandMark />
          <span>
            slidecraft<span className="wordmark-studio">STUDIO</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button button-small header-cta" href="/#contact">
          Let’s talk <Arrow diagonal />
        </Link>
        <details
          className="mobile-menu"
          ref={menu}
          onKeyDown={(event) => {
            if (event.key === "Escape" && menu.current?.open) {
              close();
              trigger.current?.focus();
            }
          }}
        >
          <summary ref={trigger} aria-label="Toggle navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation" onClick={close}>
            {links.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
                <Arrow diagonal />
              </Link>
            ))}
            <Link href="/#contact">
              Let’s talk
              <Arrow diagonal />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
