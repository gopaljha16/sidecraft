import Link from "next/link";
import { Arrow } from "@/components/icons";
import { CarouselArtwork } from "@/components/carousel-artwork";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { MonthlyPackage } from "@/components/monthly-package";
import { DeliveryProcess } from "@/components/delivery-process";
import { Faq } from "@/components/faq";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> INDEPENDENT CAROUSEL DESIGN STUDIO
          </p>
          <h1 id="hero-heading">
            Make your ideas <span className="hero-emphasis">impossible</span> to scroll past
            <span className="blue-period">.</span>
          </h1>
          <p className="hero-description">
            We turn ideas, expertise and products into premium social media content that captures
            attention, communicates value and makes your brand memorable.
          </p>
          <div className="hero-actions">
            <a className="button" href="#work">
              Explore our work <Arrow diagonal />
            </a>
            <a className="text-link" href="#contact">
              Start a project <Arrow />
            </a>
          </div>
          <p className="hero-price">
            A consistent voice. A distinctive look.
            <br />
            <strong>Monthly content packages from ₹10,000.</strong>
          </p>
        </div>
        <div className="hero-visual" aria-label="Three original carousel cover concepts">
          <span className="visual-label">A FEW IDEAS, BEAUTIFULLY FRAMED.</span>
          <div className="hero-card hero-card-back">
            <CarouselArtwork variant="education" />
          </div>
          <div className="hero-card hero-card-middle">
            <CarouselArtwork variant="founder" />
          </div>
          <div className="hero-card hero-card-front">
            <CarouselArtwork variant="saas" />
          </div>
          <span className="visual-caption">
            <span aria-hidden="true">↳</span> Small format. Big presence.
          </span>
          <span className="concept-caption">SELF-INITIATED CONCEPT PROJECTS</span>
        </div>
      </section>

      <div className="value-strip">
        <div className="container">
          <span>LESS NOISE. MORE MEANING.</span>
          <p>
            Research<span>✳</span>Story<span>✳</span>Design<span>✳</span>Delivered consistently.
          </p>
        </div>
      </div>

      <section className="section container" id="work" aria-labelledby="work-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2 id="work-heading">
              Design that
              <br />
              <span className="muted-heading">communicates.</span>
            </h2>
          </div>
          <p>
            Different stories. Distinct visual worlds.
            <br />
            One shared belief: every slide should earn the next swipe.
          </p>
        </div>
        <PortfolioGrid
          featured
          projects={projects.map(({ slides, ...project }) => ({ ...project, cover: slides[0] }))}
        />
        <Link className="text-link mt-10" href="/work">
          Explore & filter all work <Arrow diagonal />
        </Link>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-heading">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / THE APPROACH</p>
              <h2 id="approach-heading">
                A little structure.
                <br />A lot of <span>possibility.</span>
              </h2>
            </div>
            <p>
              Good design starts before the first pixel.
              <br />
              We find the story, then give it a form worth remembering.
            </p>
          </div>
          <ol className="process-grid">
            {[
              [
                "Discover",
                "Find the idea worth sharing.",
                "Your expertise, your audience, and the reason they should care.",
              ],
              [
                "Structure",
                "Give the story a spine.",
                "A strong hook, a thoughtful sequence, and one clear takeaway.",
              ],
              [
                "Design",
                "Make every slide count.",
                "Purposeful typography, visual rhythm, and a language that feels like you.",
              ],
              [
                "Deliver",
                "Ready for the next swipe.",
                "Refine together and deliver a consistent, considered carousel.",
              ],
            ].map(([title, subtitle, description], index) => (
              <li key={title}>
                <span className="step-number">
                  0{index + 1} <Arrow />
                </span>
                <h3>{title}</h3>
                <strong>{subtitle}</strong>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section container services-section"
        id="services"
        aria-labelledby="services-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / WHAT WE MAKE</p>
            <h2 id="services-heading">
              Your expertise.
              <br />
              Our creative toolkit.
            </h2>
          </div>
          <p>
            A focused content system for founders,
            <br />
            brands, and people with something to say.
          </p>
        </div>
        <div className="services-layout">
          <div className="service-feature">
            <span className="eyebrow">THE SIGNATURE SERVICE</span>
            <h3>
              Carousel
              <br />
              design<span>↗</span>
            </h3>
            <p>
              From the first hook to the final slide. Original LinkedIn and Instagram carousels that
              make complex ideas feel clear.
            </p>
            <Link className="text-link" href="/services/carousel-design">
              Explore carousel design <Arrow />
            </Link>
          </div>
          <div className="service-list">
            {[
              [
                "01",
                "Content writing",
                "Research, hooks, slide copy, and captions. Words with a clear purpose.",
              ],
              [
                "02",
                "Brand & social graphics",
                "Cohesive visual assets and templates that carry your identity.",
              ],
              [
                "03",
                "Short-form motion",
                "Thoughtful motion content to bring your ideas into a new format.",
              ],
            ].map(([number, title, description]) => (
              <div key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MonthlyPackage />
      <DeliveryProcess />

      <section
        className="section container about-section"
        id="about"
        aria-labelledby="about-heading"
      >
        <p className="eyebrow">04 / INDEPENDENT BY DESIGN</p>
        <div>
          <h2 id="about-heading">
            Small studio.
            <br />
            <span className="muted-heading">Considered work.</span>
          </h2>
          <p>
            Slidecraft is an independent creative studio focused on one thing: giving good ideas the
            clarity and visual presence they deserve.
          </p>
          <p>
            We believe useful content can be beautiful, and beautiful content should have something
            to say. Every project starts with that balance.
          </p>
        </div>
        <span className="about-symbol" aria-hidden="true">
          ✳
        </span>
      </section>

      <Faq />
      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <div className="container">
          <p className="eyebrow">YOUR NEXT GOOD IDEA STARTS HERE.</p>
          <h2 id="contact-heading">
            Let’s make your
            <br />
            next scroll <em>stop.</em>
            <span aria-hidden="true">↗</span>
          </h2>
          <div className="contact-bottom">
            <p>
              Bring your expertise.
              <br />
              We’ll bring structure, words, and design.
            </p>
            <span className="contact-status">
              <span className="status-dot" /> Project enquiries opening soon
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
