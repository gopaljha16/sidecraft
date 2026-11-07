"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { contactServices } from "@/lib/contact-options";
import { Arrow } from "./icons";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
const inputClass =
  "mt-2 min-h-12 w-full rounded-md border border-ink/25 bg-white/35 px-4 py-3 text-base outline-brand placeholder:text-ink/50 md:text-sm";

export function ContactForm({ siteKey }: { siteKey: string }) {
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const widgetSize = useRef<"compact" | "flexible" | null>(null);
  const requestId = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({});
  const status = useRef<HTMLParagraphElement>(null);
  const setup = useCallback(() => {
    if (!widget.current || !window.turnstile) return;
    const size = widget.current.clientWidth < 300 ? "compact" : "flexible";
    if (widgetId.current !== null && widgetSize.current === size) return;
    if (widgetId.current !== null) window.turnstile.remove(widgetId.current);
    widgetSize.current = size;
    setToken("");
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey: siteKey,
      action: "contact",
      theme: "light",
      size,
      callback: (value: string) => setToken(value),
      "expired-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setMessage("The security check could not load. Please refresh and try again.");
      },
    });
  }, [siteKey]);
  useEffect(() => {
    setup();
    const observer = new ResizeObserver(setup);
    if (widget.current) observer.observe(widget.current);
    return () => {
      observer.disconnect();
      if (widgetId.current !== null) {
        window.turnstile?.remove(widgetId.current);
        widgetId.current = null;
        widgetSize.current = null;
      }
    };
  }, [setup]);
  function resetChallenge() {
    setToken("");
    if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !token) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    requestId.current ||= crypto.randomUUID();
    setPending(true);
    setFields({});
    setMessage("");
    setSucceeded(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          service: data.get("service"),
          brief: data.get("brief"),
          budget: data.get("budget") || "",
          timeline: data.get("timeline") || "",
          website: data.get("website") || "",
          privacy: data.get("privacy") === "on",
          token,
          requestId: requestId.current,
        }),
        signal: AbortSignal.timeout(30000),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fields?: Record<string, string>;
      };
      if (response.ok && result.ok) {
        setSucceeded(true);
        setMessage(result.message || "Your enquiry has been submitted.");
        form.reset();
        requestId.current = null;
      } else {
        setFields(result.fields || {});
        setMessage(result.message || "Your enquiry could not be sent. Please try again.");
      }
    } catch {
      setMessage(
        "Your enquiry could not be completed. Please check your connection and try again.",
      );
    } finally {
      setPending(false);
      resetChallenge();
      requestAnimationFrame(() => status.current?.focus());
    }
  }
  function error(name: string) {
    return fields[name] ? (
      <span id={`contact-${name}-error`} className="mt-2 block text-xs font-medium">
        {fields[name]}
      </span>
    ) : null;
  }
  return (
    <>
      <Script
        id="slidecraft-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={setup}
        onError={() =>
          setMessage("The security check could not load. Please refresh and try again.")
        }
      />
      <form
        onSubmit={submit}
        aria-label="Project enquiry"
        className="mt-12 rounded-2xl border border-ink/20 p-6 md:p-10"
        onChange={(event) => {
          const field = event.target;
          if (!(
            field instanceof HTMLInputElement ||
            field instanceof HTMLTextAreaElement ||
            field instanceof HTMLSelectElement
          ))
            return;
          if (
            [
              "name",
              "email",
              "company",
              "service",
              "brief",
              "budget",
              "timeline",
              "privacy",
            ].includes(field.name)
          )
            requestId.current = null;
        }}
      >
        <fieldset disabled={pending} className="grid min-w-0 gap-6 md:grid-cols-2">
          <legend className="sr-only">Tell us about your project</legend>
          {[
            ["name", "Your name", "text", "name", 100],
            ["email", "Business email", "email", "email", 254],
            ["company", "Company or brand", "text", "organization", 140],
          ].map(([name, label, type, autocomplete, max]) => (
            <label key={name} className="text-sm font-medium">
              {label}
              <input
                name={String(name)}
                id={`contact-${name}`}
                type={String(type)}
                autoComplete={String(autocomplete)}
                maxLength={Number(max)}
                required
                className={inputClass}
                aria-invalid={!!fields[name]}
                aria-describedby={fields[name] ? `contact-${name}-error` : undefined}
              />
              {error(String(name))}
            </label>
          ))}
          <label className="text-sm font-medium">
            Service needed
            <select
              name="service"
              required
              className={inputClass}
              aria-invalid={!!fields.service}
              aria-describedby={fields.service ? "contact-service-error" : undefined}
            >
              <option value="">Choose a service</option>
              {contactServices.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
            {error("service")}
          </label>
          <label className="text-sm font-medium md:col-span-2">
            A little about your project
            <textarea
              name="brief"
              required
              minLength={20}
              maxLength={4000}
              rows={5}
              placeholder="Your audience, the idea you want to share, and what you need help with."
              className={inputClass}
              aria-invalid={!!fields.brief}
              aria-describedby={fields.brief ? "contact-brief-error" : undefined}
            />
            {error("brief")}
          </label>
          {[
            ["budget", "Budget (optional)"],
            ["timeline", "Timeline (optional)"],
          ].map(([name, label]) => (
            <label key={name} className="text-sm font-medium">
              {label}
              <input name={name} maxLength={100} className={inputClass} />
              {error(name)}
            </label>
          ))}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Website
              <input name="website" autoComplete="off" tabIndex={-1} />
            </label>
          </div>
          <label className="flex items-start gap-3 text-xs leading-relaxed md:col-span-2">
            <input
              name="privacy"
              type="checkbox"
              required
              className="mt-1 size-4 shrink-0 accent-ink"
            />
            <span>
              I’ve read the{" "}
              <Link href="/privacy" className="underline underline-offset-4">
                privacy notice
              </Link>{" "}
              and agree to be contacted about this enquiry.
            </span>
          </label>
          <div className="@container min-w-0 md:col-span-2">
            <div ref={widget} className="min-h-[140px] @min-[300px]:min-h-[65px]" />
            <noscript>
              <p className="text-sm">
                JavaScript is required for the security check. You can use the contact email above
                instead.
              </p>
            </noscript>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={!token || pending}
              className="button bg-ink text-canvas disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Sending enquiry…" : "Send project enquiry"}
              <Arrow diagonal />
            </button>
          </div>
        </fieldset>
        <p
          ref={status}
          tabIndex={-1}
          role={succeeded ? "status" : "alert"}
          className="mt-5 text-sm leading-relaxed outline-none"
          aria-live="polite"
        >
          {message}
        </p>
      </form>
    </>
  );
}
