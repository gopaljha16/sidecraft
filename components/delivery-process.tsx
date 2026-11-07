import { deliverySteps } from "@/lib/offer";

export function DeliveryProcess() {
  return (
    <section className="container py-20 md:py-28" aria-labelledby="delivery-heading">
      <p className="eyebrow mb-5">A SHARED PROCESS</p>
      <h2 id="delivery-heading">
        Clear steps.
        <br />
        Thoughtful collaboration.
      </h2>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {deliverySteps.map((step, index) => (
          <li key={step.title} className="border-t border-line pt-5">
            <span className="text-xs text-brand-strong">0{index + 1}</span>
            <h3 className="mt-5 text-2xl tracking-tight">{step.title}</h3>
            <p className="mt-4 text-sm leading-relaxed">
              <strong className="font-medium">Studio:</strong> {step.studio}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              <strong className="font-medium">You:</strong> {step.client}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
