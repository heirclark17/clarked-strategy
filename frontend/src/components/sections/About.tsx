import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="border-t border-line bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionHeading eyebrow={site.about.eyebrow} title={site.about.title} />
            <div className="mt-6 space-y-4 text-lg text-muted">
              {site.about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <Reveal>
            {/* TODO: replace this typographic panel with a founder/studio photo */}
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-ink p-8 text-white md:p-10">
              <p className="font-display text-2xl font-semibold leading-snug text-balance md:text-3xl">
                Most founders don’t have a marketing problem. They have a clarity problem.
              </p>
              <ul className="space-y-4">
                {site.about.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-white">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-white/80">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
