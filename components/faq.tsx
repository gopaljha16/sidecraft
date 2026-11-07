import { faqs } from "@/lib/offer";

export function Faq() {
  return (
    <section className="container py-20 md:py-28" aria-labelledby="faq-heading">
      <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-5">THE USEFUL DETAILS</p>
          <h2 id="faq-heading">
            Before we
            <br />
            get started.
          </h2>
        </div>
        <div>
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group border-b border-line py-5 first:border-t">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-sm font-medium [&::-webkit-details-marker]:hidden">
                {question}
                <span aria-hidden="true" className="text-xl text-brand group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-prose pt-4 text-sm leading-relaxed text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
