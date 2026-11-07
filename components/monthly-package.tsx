import Link from "next/link";
import { offer } from "@/lib/offer";
import { Arrow } from "./icons";

export function MonthlyPackage() {
  return (
    <section
      className="container mb-5 grid overflow-hidden rounded-2xl border border-line md:grid-cols-2"
      id="pricing"
      aria-labelledby="pricing-heading"
    >
      <div className="p-7 md:p-10 lg:p-12">
        <p className="eyebrow">CONSISTENCY, WITHOUT THE CREATIVE CHAOS.</p>
        <h2 id="pricing-heading" className="my-7 text-[clamp(2.3rem,3.6vw,3.4rem)]">
          A month of ideas.
          <br />
          Made tangible.
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          One focused package. Room for your expertise.
          <br />A recognisable presence, month after month.
        </p>
      </div>
      <div className="border-t border-line p-7 md:border-t-0 md:border-l md:p-10 lg:p-12">
        <span className="eyebrow">MONTHLY CAROUSEL CONTENT</span>
        <p className="my-6 flex flex-wrap items-baseline gap-1.5 font-heading text-[clamp(2.5rem,3.7vw,3.5rem)] leading-tight tracking-[-2px]">
          <span className="font-sans text-xs tracking-normal text-muted">from</span>
          {offer.price}
          <span className="font-sans text-xs tracking-normal text-muted">/ month</span>
        </p>
        <ul className="my-6 grid list-none gap-3 text-sm leading-relaxed">
          {offer.inclusions.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="text-brand">
                ↗
              </span>
              {item}
            </li>
          ))}
        </ul>
        <Link className="button mt-2" href="/#contact">
          Request a monthly plan <Arrow diagonal />
        </Link>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Additional services are quoted separately. Scope, delivery, and terms agreed before
          starting.
        </p>
      </div>
    </section>
  );
}
