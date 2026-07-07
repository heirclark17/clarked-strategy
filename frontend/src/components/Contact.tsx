"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { submitContact } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { contact } = site;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");
    try {
      await submitContact({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        company: String(data.get("company") || "") || undefined,
        message: String(data.get("message") || ""),
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow text-gold">{contact.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy md:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 text-lg text-slate">{contact.subtitle}</p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-navy">Email</dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-slate underline-offset-2 hover:text-navy hover:underline"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Location</dt>
              <dd className="text-slate">{contact.location}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-card p-8">
          {status === "success" ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4 10-11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy">
                Thanks — message received.
              </h3>
              <p className="mt-2 text-sm text-slate">
                We&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Name" name="name" required autoComplete="name" />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
              <Field
                label="Company"
                name="company"
                required={false}
                autoComplete="organization"
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-navy"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-y rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-navy"
                  placeholder="A few sentences about your goals or challenge…"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {!required && <span className="ml-1 text-slate/60">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-navy"
      />
    </div>
  );
}
