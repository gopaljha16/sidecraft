import Link from "next/link";
import { Wordmark } from "./wordmark";

export function Footer() {
  return (
    <footer className="container pt-10 pb-6 md:pt-16">
      <div className="flex flex-wrap items-start justify-between gap-8 pb-8 md:pb-12">
        <Wordmark />
        <p className="font-heading text-xl leading-tight tracking-tight md:text-2xl">
          Good ideas deserve
          <br />a better frame.
        </p>
        <nav className="flex w-full gap-8 text-xs md:w-auto" aria-label="Footer navigation">
          <Link href="/work">Work</Link>
          <Link href="/services/carousel-design">Services</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-4 border-t border-line pt-6 text-[10px] text-muted">
        <span>© {new Date().getFullYear()} Slidecraft Studio</span>
        <a href="https://gopaldev.in">Explore the developer portfolio ↗</a>
        <span className="hidden md:inline">Independent by design.</span>
      </div>
    </footer>
  );
}
