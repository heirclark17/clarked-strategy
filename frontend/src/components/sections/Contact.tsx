"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, CircleAlert } from "lucide-react";
import { site } from "@/content/site";
import { submitContact } from "@/lib/api";
import {
  contactSchema,
  contactDefaults,
  SERVICE_OPTIONS,
  type ContactFormValues,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const labelCls = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-ink";
const controlCls =
  "w-full rounded-sm border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors " +
  "placeholder:text-gray/60 focus:border-gold";

export function Contact() {
  const { contact } = site;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  async function onSubmit(values: ContactFormValues) {
    if (values.website) {
      // Honeypot tripped by a bot: pretend success, send nothing.
      setStatus("success");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const name = `${values.firstName} ${values.lastName}`.trim();
      const message = values.service
        ? `Service interest: ${values.service}\n\n${values.message}`
        : values.message;
      await submitContact({ name, email: values.email, company: values.company, message });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  function border(hasError: boolean) {
    return hasError ? "border-error" : "border-line";
  }

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-10 md:py-28 lg:px-16">
        {/* Left: details */}
        <div>
          <p className="eyebrow mb-4">{contact.eyebrow}</p>
          <h2 className="font-display text-display font-normal leading-[1.15] text-ink">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-[440px] text-[1.05rem] leading-[1.8] text-gray">{contact.body}</p>

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-ink">
                {contact.detailsLabel.email}
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-gray underline-offset-4 hover:text-ink hover:underline"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            {site.phone ? (
              <div>
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-ink">
                  {contact.detailsLabel.phone}
                </dt>
                <dd className="mt-1 text-sm text-gray">{site.phone}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-ink">
                {contact.detailsLabel.location}
              </dt>
              <dd className="mt-1 text-sm text-gray">{site.location}</dd>
            </div>
          </dl>

          <p className="mt-10 text-sm text-gray">
            {contact.discoveryPrompt}{" "}
            <Link
              href={site.discovery.href}
              className="inline-flex items-center gap-1 font-medium text-ink underline-offset-4 hover:text-gold hover:underline"
            >
              {contact.discoveryLink}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </p>
        </div>

        {/* Right: form */}
        <div>
          {status === "success" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded border border-line bg-cream p-10 text-center">
              <span className="grid size-14 place-items-center rounded-full border-[1.5px] border-gold text-gold">
                <Check className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-2xl font-normal text-ink">Message received.</h3>
              <p className="mt-2 max-w-[320px] text-sm text-gray">
                Thanks for reaching out. We&apos;ll be in touch from {site.email} within one business
                day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelCls}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="Jane"
                    autoComplete="given-name"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className={`${controlCls} ${border(!!errors.firstName)}`}
                    {...register("firstName")}
                  />
                  {errors.firstName ? (
                    <FieldError id="firstName-error">{errors.firstName.message}</FieldError>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="lastName" className={labelCls}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Smith"
                    autoComplete="family-name"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    className={`${controlCls} ${border(!!errors.lastName)}`}
                    {...register("lastName")}
                  />
                  {errors.lastName ? (
                    <FieldError id="lastName-error">{errors.lastName.message}</FieldError>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="company" className={labelCls}>
                  Company / Brand
                </label>
                <input
                  id="company"
                  placeholder="Your Brand Name"
                  autoComplete="organization"
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? "company-error" : undefined}
                  className={`${controlCls} ${border(!!errors.company)}`}
                  {...register("company")}
                />
                {errors.company ? (
                  <FieldError id="company-error">{errors.company.message}</FieldError>
                ) : null}
              </div>

              <div className="mt-5">
                <label htmlFor="email" className={labelCls}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@yourbrand.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${controlCls} ${border(!!errors.email)}`}
                  {...register("email")}
                />
                {errors.email ? (
                  <FieldError id="email-error">{errors.email.message}</FieldError>
                ) : null}
              </div>

              <div className="mt-5">
                <label htmlFor="service" className={labelCls}>
                  Service Interest <span className="text-gray/60">(optional)</span>
                </label>
                <select id="service" className={`${controlCls} ${border(false)}`} {...register("service")}>
                  <option value="">Select a service area...</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className={labelCls}>
                  Tell Us About Your Brand
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Share a bit about your goals, challenges, or what you're looking to accomplish..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${controlCls} resize-y ${border(!!errors.message)}`}
                  {...register("message")}
                />
                {errors.message ? (
                  <FieldError id="message-error">{errors.message.message}</FieldError>
                ) : null}
              </div>

              {/* Honeypot: hidden from users + assistive tech, off the tab order. */}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              {status === "error" ? (
                <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-error">
                  <CircleAlert className="size-4 shrink-0" aria-hidden />
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-6 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-ink-mid disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Get Clarked, Submit"}
                {status === "submitting" ? null : <ArrowRight className="size-4" aria-hidden />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[0.8rem] text-error">
      <CircleAlert className="size-3.5 shrink-0" aria-hidden />
      {children}
    </p>
  );
}
