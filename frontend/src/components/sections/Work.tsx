import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Placeholder visual tints per case study (TODO: replace with real imagery).
const tints: Record<string, string> = {
  primary: "linear-gradient(135deg,#4f2ff0,#7c4dff)",
  accent: "linear-gradient(135deg,#ff5a36,#ff2d6f)",
  violet: "linear-gradient(135deg,#7c4dff,#4f2ff0)",
};

export function Work() {
  return (
    <section id="work" className="bg-ink py-20 text-white md:py-28">
      <Container>
        <SectionHeading
          onDark
          eyebrow={site.work.eyebrow}
          title={site.work.title}
          subtitle={site.work.subtitle}
        />
        <div className="mt-14 flex flex-col gap-6">
          {site.work.caseStudies.map((cs, i) => (
            <Reveal key={cs.client} delay={i * 0.05}>
              <article className="group grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-2">
                {/* Visual panel - TODO: swap gradient for a real case-study image */}
                <div className="relative min-h-[220px] overflow-hidden md:min-h-[320px]">
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    style={{ background: tints[cs.tint] }}
                  />
                  <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
                  <div className="relative flex h-full flex-col justify-between p-8">
                    <span className="eyebrow text-white/80">{cs.category}</span>
                    <div>
                      <div className="font-display text-6xl font-semibold tracking-tight md:text-7xl">
                        {cs.metric}
                      </div>
                      <div className="mt-1 text-white/85">{cs.metricLabel}</div>
                    </div>
                  </div>
                </div>

                {/* Story */}
                <div className="flex flex-col gap-5 p-8 md:p-10">
                  <h3 className="font-display text-2xl font-semibold">{cs.client}</h3>
                  <div>
                    <p className="eyebrow text-accent">Problem</p>
                    <p className="mt-1.5 text-white/70">{cs.problem}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-accent">Approach</p>
                    <p className="mt-1.5 text-white/70">{cs.approach}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-accent">Outcome</p>
                    <p className="mt-1.5 font-medium text-white">{cs.outcome}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
