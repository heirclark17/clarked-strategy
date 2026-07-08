import { Crosshair, Megaphone, Users, TrendingUp, FileText, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const ICONS: Record<string, LucideIcon> = {
  Crosshair,
  Megaphone,
  Users,
  TrendingUp,
  FileText,
};

export function B2B() {
  const { b2b } = site;

  return (
    <section id="b2b" className="bg-cream">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <div>
            <p className="eyebrow mb-4">{b2b.eyebrow}</p>
            <h2 className="font-display text-display font-normal leading-[1.15] text-ink">
              {b2b.title}
            </h2>
            {b2b.body.map((p, i) => (
              <p key={i} className="mt-5 max-w-[520px] text-[1.05rem] leading-[1.85] text-[#3d4a56]">
                {p}
              </p>
            ))}
            <div className="mt-10">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink">
                {b2b.industriesLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {b2b.industries.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-line bg-white px-3.5 py-1.5 text-[0.75rem] font-medium tracking-[0.04em] text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3.5">
          {b2b.pillars.map((pillar, i) => {
            const Icon = ICONS[pillar.icon] ?? Crosshair;
            return (
              <Reveal key={pillar.name} delay={i * 0.05}>
                <div className="flex gap-4 rounded-sm border border-line border-l-[3px] border-l-gold bg-white p-5">
                  <span className="mt-0.5 shrink-0 text-gold">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-ink">
                      {pillar.name}
                    </h3>
                    <p className="mt-1.5 text-[0.9rem] leading-[1.65] text-gray">{pillar.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
