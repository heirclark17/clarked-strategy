import { Quote } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={site.testimonials.eyebrow} title={site.testimonials.title} />
        {/* TODO: replace with real quotes + attribution before launch. */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {site.testimonials.quotes.map((q, i) => (
            <Reveal key={q.quote} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-card p-7 shadow-sm">
                <Quote className="size-7 text-primary" aria-hidden />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink text-pretty">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5 text-sm">
                  <span className="font-semibold text-ink">{q.name}</span>
                  <span className="mt-0.5 block text-muted">{q.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
