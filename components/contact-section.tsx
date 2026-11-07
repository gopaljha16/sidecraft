import { getContactConfig } from "@/lib/contact-config";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const config = getContactConfig();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const publicEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
  return (
    <section className="bg-lime py-16 md:py-20" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <p className="eyebrow">YOUR NEXT GOOD IDEA STARTS HERE.</p>
        <h2
          data-reveal
          id="contact-heading"
          className="relative mt-8 text-[clamp(2.8rem,8vw,4.5rem)] tracking-[-.065em] md:text-[clamp(3.2rem,6.8vw,6.4rem)]"
        >
          Let’s make your
          <br />
          next scroll <em className="font-[Georgia] font-normal">stop.</em>
          <span
            className="absolute top-0 right-0 hidden min-[400px]:inline md:text-[1.3em]"
            aria-hidden="true"
          >
            ↗
          </span>
        </h2>
        <div className="mt-10 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <p className="text-sm leading-relaxed">
            Bring your expertise.
            <br />
            We’ll bring structure, words, and design.
          </p>
          {publicEmail ? (
            <a href={`mailto:${publicEmail}`} className="text-link break-all">
              {publicEmail} ↗
            </a>
          ) : (
            !config && (
              <span className="border-b border-[#829f55] pb-2 text-xs">
                <span className="mr-2 inline-block size-1.5 rounded-full bg-ink" />
                Project enquiries opening soon
              </span>
            )
          )}
        </div>
        {config && <ContactForm siteKey={config.turnstileSiteKey} />}
      </div>
    </section>
  );
}
