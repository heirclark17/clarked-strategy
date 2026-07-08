import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow={site.services.eyebrow}
          title={site.services.title}
          subtitle={site.services.subtitle}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-card p-7 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <span className="font-mono text-sm font-medium text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-muted">{item.body}</p>
                <span
                  aria-hidden
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  Explore in a session
                  <ArrowUpRight className="size-4" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
