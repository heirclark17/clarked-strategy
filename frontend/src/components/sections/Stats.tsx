import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={site.stats.eyebrow} title={site.stats.title} />
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {site.stats.items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <Stat
                value={s.value}
                label={s.label}
                suffix={s.suffix}
                decimals={"decimals" in s ? s.decimals : 0}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
