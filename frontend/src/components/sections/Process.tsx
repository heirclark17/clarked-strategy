import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow={site.process.eyebrow}
          title={site.process.title}
          subtitle={site.process.subtitle}
          className="max-w-3xl"
        />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {site.process.steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.06}>
              <li className="flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                <span className="font-mono text-sm font-medium text-primary">{s.no}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button href={site.cta.href} size="lg">
            {site.cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Button>
          <p className="text-sm text-muted">Free, no obligation. Takes about 10 minutes.</p>
        </div>
      </Container>
    </section>
  );
}
