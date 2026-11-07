import { pageMetadata } from "@/lib/seo";
import { getContactConfig } from "@/lib/contact-config";

export const metadata = pageMetadata(
  "/privacy",
  "Privacy Notice — Slidecraft Studio",
  "How this studio website handles project enquiries, security checks, email delivery, and contact information.",
);

export default function PrivacyPage() {
  const config = getContactConfig();
  return (
    <main id="main-content">
      <article className="container max-w-4xl py-16 md:py-24">
        <p className="eyebrow mb-6">YOUR INFORMATION</p>
        <h1 className="font-heading text-5xl tracking-tight md:text-7xl">Privacy notice.</h1>
        <div className="mt-10 max-w-prose space-y-9 text-base leading-relaxed text-muted">
          <section>
            <h2 className="mb-4 text-2xl tracking-tight">This website</h2>
            <p>
              Slidecraft Studio uses this website to show its work, explain services, and help
              people discuss a potential project. No advertising tracker or analytics script is
              currently configured in this application.
            </p>
          </section>
          {config ? (
            <>
              <section>
                <h2 className="mb-4 text-2xl tracking-tight">Project enquiries</h2>
                <p>
                  If you submit an enquiry, we collect your name, email, company or brand, chosen
                  service, project brief, and any optional budget or timeline you provide. We use
                  these details to review your request and respond about the proposed work. Please
                  avoid sending passwords, payment-card details, or sensitive personal information
                  in the brief.
                </p>
              </section>
              <section>
                <h2 className="mb-4 text-2xl tracking-tight">How the request is processed</h2>
                <p className="mb-4">
                  Cloudflare Turnstile provides a security check. Our server validates that check
                  before sending the enquiry to our monitored mailbox through Resend. Upstash Redis
                  stores a keyed, non-plaintext representation of the email address and submission
                  counters for up to one hour to limit abuse. The application does not store the
                  enquiry brief in a website database or log it to the console.
                </p>
                <p>
                  Cloudflare, Resend, the mailbox provider, and the hosting provider process
                  information necessary to provide these services. Their own policies explain their
                  processing:{" "}
                  <a
                    className="text-brand-strong underline"
                    href="https://www.cloudflare.com/privacypolicy/"
                  >
                    Cloudflare
                  </a>
                  ,{" "}
                  <a
                    className="text-brand-strong underline"
                    href="https://resend.com/legal/privacy-policy"
                  >
                    Resend
                  </a>
                  , and{" "}
                  <a
                    className="text-brand-strong underline"
                    href="https://upstash.com/trust/privacy.pdf"
                  >
                    Upstash
                  </a>
                  .
                </p>
              </section>
              <section>
                <h2 className="mb-4 text-2xl tracking-tight">Retention and contact</h2>
                <p className="mb-4">
                  The studio’s configured retention period for enquiries is {config.retentionDays}{" "}
                  days. Mailbox deletion is managed by the studio; this website does not
                  automatically delete provider or mailbox records. If an enquiry becomes a project,
                  the records needed for that work are handled under the project agreement.
                </p>
                <p>
                  To ask about information you have provided, request a correction, or request
                  deletion, email{" "}
                  <a
                    className="break-all text-brand-strong underline"
                    href={`mailto:${config.publicEmail}`}
                  >
                    {config.publicEmail}
                  </a>
                  .
                </p>
              </section>
            </>
          ) : (
            <section>
              <h2 className="mb-4 text-2xl tracking-tight">Enquiries are not enabled yet</h2>
              <p>
                This version of the website does not accept project enquiries through an online
                form. No enquiry is saved or sent when the form is unavailable. A processing and
                retention notice will be shown here when the enquiry service is enabled.
              </p>
            </section>
          )}
          <section>
            <h2 className="mb-4 text-2xl tracking-tight">Hosting and external links</h2>
            <p>
              The hosting provider may process routine request information such as IP addresses and
              technical logs when you visit. Links to the developer portfolio, platform references,
              and provider policies take you to websites that operate under their own policies.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
