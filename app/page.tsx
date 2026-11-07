import Link from "next/link";
import { Arrow } from "@/components/icons";
import { CarouselArtwork } from "@/components/carousel-artwork";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { MonthlyPackage } from "@/components/monthly-package";
import { DeliveryProcess } from "@/components/delivery-process";
import { Faq } from "@/components/faq";
import { Approach } from "@/components/approach";
import { ProjectSlide } from "@/components/project-slide";
import { MotionEnhancements } from "@/components/motion-enhancements";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { InsightCards } from "@/components/insight-cards";
import { ContactSection } from "@/components/contact-section";

export const metadata = pageMetadata(
  "/",
  "Slidecraft Studio — Premium Carousel Design for Founders & Brands",
  site.description,
);

export default function Home() {
  return (
    <main id="main-content">
      <MotionEnhancements />
      <section
        className="hero container grid items-center gap-5 pt-11 pb-14 md:min-h-[680px] md:grid-cols-2 md:gap-4 md:py-16 xl:min-h-[760px] xl:gap-8"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-2">
          <p data-reveal className="eyebrow max-md:text-[8px]">
            <span className="mr-2 inline-block size-[7px] rounded-full bg-brand" />
            INDEPENDENT CAROUSEL DESIGN STUDIO
          </p>
          <h1
            data-reveal
            data-reveal-delay="70"
            id="hero-heading"
            className="my-6 max-w-[660px] text-[clamp(2.75rem,8.8vw,4.7rem)] leading-[1.035] tracking-[-.065em] md:text-[clamp(3rem,5.8vw,4rem)] xl:text-[clamp(3.4rem,5.15vw,5.2rem)]"
          >
            Make your ideas{" "}
            <span className="relative inline-block text-brand after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:-rotate-2 after:bg-lime">
              impossible
            </span>{" "}
            to scroll past<span className="text-brand">.</span>
          </h1>
          <p
            data-reveal
            data-reveal-delay="140"
            className="max-w-[440px] text-sm leading-[1.85] text-muted md:text-base"
          >
            We turn ideas, expertise and products into premium social media content that captures
            attention, communicates value and makes your brand memorable.
          </p>
          <div
            data-reveal
            data-reveal-delay="210"
            className="mt-7 flex flex-wrap items-center gap-5 xl:gap-6"
          >
            <a className="button" href="#work">
              Explore our work <Arrow diagonal />
            </a>
            <a className="text-link" href="#contact">
              Start a project <Arrow />
            </a>
          </div>
          <p
            data-reveal
            data-reveal-delay="280"
            className="mt-7 text-xs leading-relaxed text-muted"
          >
            A consistent voice. A distinctive look.
            <br />
            <strong className="font-medium text-ink">Monthly content packages from ₹10,000.</strong>
          </p>
        </div>
        <div
          className="relative mx-auto mt-10 aspect-[1/1.15] w-[90%] max-w-[480px] min-w-0 md:mt-0 md:aspect-auto md:h-[490px] md:w-full md:max-w-none xl:h-[570px]"
          aria-label="Three original carousel cover concepts"
        >
          <span className="absolute -top-[3%] left-0 text-[7px] tracking-[.15em] md:top-0 md:left-[5%]">
            A FEW IDEAS, BEAUTIFULLY FRAMED.
          </span>
          <div className="hero-card absolute top-[6%] -right-[3%] z-1 w-[64%] rotate-[11deg] md:top-[35px] md:-right-[2%] md:w-[70%] xl:top-[25px] xl:w-[64%]">
            <div data-reveal data-reveal-delay="120">
              <div className="hero-float rounded-xl border-[5px] border-canvas shadow-[0_15px_30px_rgb(21_22_25/.09)]">
                <CarouselArtwork variant="education" />
              </div>
            </div>
          </div>
          <div className="hero-card absolute top-[17%] -left-[2%] z-2 w-[64%] -rotate-12 md:top-[90px] md:w-[70%] xl:top-[85px] xl:left-0 xl:w-[64%]">
            <div data-reveal data-reveal-delay="220">
              <div className="hero-float rounded-xl border-[5px] border-canvas shadow-[0_15px_30px_rgb(21_22_25/.09)]">
                <CarouselArtwork variant="founder" />
              </div>
            </div>
          </div>
          <div className="hero-card absolute top-[25%] right-[8%] z-3 w-[64%] rotate-3 md:top-[140px] md:right-[4%] md:w-[70%] xl:top-[118px] xl:right-[9%] xl:w-[64%]">
            <div data-reveal data-reveal-delay="320">
              <div className="hero-float rounded-xl border-[5px] border-canvas shadow-[0_15px_30px_rgb(21_22_25/.09)]">
                <CarouselArtwork variant="saas" />
              </div>
            </div>
          </div>
          <span className="absolute bottom-0 left-[2%] -rotate-5 font-heading text-xs md:bottom-1 md:text-sm">
            <span className="mr-2 text-3xl" aria-hidden="true">
              ↳
            </span>
            Small format. Big presence.
          </span>
          <span className="absolute right-0 -bottom-6 text-[6px] tracking-widest text-muted md:text-[7px]">
            SELF-INITIATED CONCEPT PROJECTS
          </span>
        </div>
      </section>
      <div className="border-y border-line">
        <div className="container flex flex-col justify-between gap-3 py-6 lg:flex-row lg:items-center">
          <span className="text-[9px] tracking-widest text-muted">LESS NOISE. MORE MEANING.</span>
          <p className="flex flex-wrap items-center gap-2.5 font-heading text-xs tracking-tight md:gap-5 md:text-lg">
            Research<span className="text-brand">✳</span>Story<span className="text-brand">✳</span>
            Design<span className="text-brand">✳</span>Delivered consistently.
          </p>
        </div>
      </div>
      <section className="container py-20 md:py-28" id="work" aria-labelledby="work-heading">
        <div
          data-reveal
          className="mb-10 flex flex-col justify-between gap-6 md:mb-12 lg:flex-row lg:items-end"
        >
          <div>
            <p className="eyebrow mb-5">01 / SELECTED WORK</p>
            <h2 id="work-heading">
              Design that
              <br />
              <span className="text-[#85867f]">communicates.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
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
      <Approach
        design={<CarouselArtwork variant="saas" />}
        deliverySlides={projects[0].slides.slice(0, 3).map((slide, index) => (
          <ProjectSlide key={index} theme="saas" slide={slide} index={index} />
        ))}
      />
      <section
        className="container py-20 md:py-28"
        id="services"
        aria-labelledby="services-heading"
      >
        <div
          data-reveal
          className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <p className="eyebrow mb-5">03 / WHAT WE MAKE</p>
            <h2 id="services-heading">
              Your expertise.
              <br />
              Our creative toolkit.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            A focused content system for founders,
            <br />
            brands, and people with something to say.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start rounded-2xl bg-[#eeeee7] p-8 lg:p-10">
            <span className="eyebrow">THE SIGNATURE SERVICE</span>
            <h3 className="relative my-8 w-full text-[clamp(3rem,5vw,4.7rem)] leading-none tracking-[-.06em]">
              Carousel
              <br />
              design<span className="absolute top-0 right-0 text-brand">↗</span>
            </h3>
            <p className="mb-7 max-w-sm text-sm leading-relaxed text-muted">
              From the first hook to the final slide. Original LinkedIn and Instagram carousels that
              make complex ideas feel clear.
            </p>
            <Link className="text-link mt-auto" href="/services/carousel-design">
              Explore carousel design <Arrow />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
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
              <div key={number} className="flex gap-6 border-b border-line py-7 first:border-t">
                <span className="pt-1.5 text-xs text-brand">{number}</span>
                <div>
                  <h3 className="text-2xl tracking-tight">{title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
                  <Link href="/#contact" className="text-link mt-4">
                    Discuss {title.toLowerCase()} <Arrow diagonal />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MonthlyPackage />
      <DeliveryProcess />
      <section
        className="container grid items-start gap-8 py-20 md:grid-cols-[.7fr_1.4fr] md:py-28 xl:grid-cols-[.65fr_1.4fr_.5fr]"
        id="about"
        aria-labelledby="about-heading"
      >
        <p className="eyebrow md:pt-3">04 / INDEPENDENT BY DESIGN</p>
        <div data-reveal>
          <h2 id="about-heading">
            Small studio.
            <br />
            <span className="text-[#85867f]">Considered work.</span>
          </h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-muted">
            Slidecraft is an independent creative studio focused on one thing: giving good ideas the
            clarity and visual presence they deserve.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            We believe useful content can be beautiful, and beautiful content should have something
            to say. Every project starts with that balance.
          </p>
        </div>
        <span
          className="hidden text-right text-[150px] leading-none text-brand xl:block"
          aria-hidden="true"
        >
          ✳
        </span>
      </section>
      <section className="container py-20 md:py-28" aria-labelledby="insights-heading">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">FROM THE STUDIO NOTEBOOK</p>
            <h2 id="insights-heading">
              A little clarity,
              <br />
              before you create.
            </h2>
          </div>
          <Link className="text-link" href="/insights">
            Explore the guides <Arrow diagonal />
          </Link>
        </div>
        <InsightCards />
      </section>
      <Faq />
      <ContactSection />
    </main>
  );
}
