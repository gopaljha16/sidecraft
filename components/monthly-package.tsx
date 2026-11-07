import Link from "next/link";
import { offer } from "@/lib/offer";
import { Arrow } from "./icons";

export function MonthlyPackage() {
  return (
    <section className="container pricing-section" id="pricing" aria-labelledby="pricing-heading">
      <div className="pricing-intro">
        <p className="eyebrow">CONSISTENCY, WITHOUT THE CREATIVE CHAOS.</p>
        <h2 id="pricing-heading">
          A month of ideas.
          <br />
          Made tangible.
        </h2>
        <p>
          One focused package. Room for your expertise.
          <br />A recognisable presence, month after month.
        </p>
      </div>
      <div className="pricing-details">
        <span className="eyebrow">MONTHLY CAROUSEL CONTENT</span>
        <p className="price">
          <span>from</span> {offer.price}
          <span> / month</span>
        </p>
        <ul>
          {offer.inclusions.map((item) => (
            <li key={item}>
              <span aria-hidden="true">↗</span>
              {item}
            </li>
          ))}
        </ul>
        <Link className="button" href="/#contact">
          Request a monthly plan <Arrow diagonal />
        </Link>
        <p className="pricing-note">
          Additional services are quoted separately. Scope, delivery, and terms agreed before
          starting.
        </p>
      </div>
    </section>
  );
}
