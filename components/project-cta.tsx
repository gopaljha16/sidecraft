import Link from "next/link";
import { Arrow } from "./icons";

export function ProjectCta() {
  return (
    <section className="bg-lime py-16 md:py-24">
      <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-5">A STORY THAT FEELS LIKE YOURS.</p>
          <h2>
            Want something similar
            <br />
            for your brand?
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed">
            A thoughtful content system starts with your expertise, your audience, and a clear
            creative brief.
          </p>
        </div>
        <Link className="button shrink-0" href="/#contact">
          Let’s talk <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
