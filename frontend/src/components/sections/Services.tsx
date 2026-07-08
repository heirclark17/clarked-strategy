import { Newspaper, Share2, ShieldAlert, Target, PenLine, BarChart3, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const ICONS: Record<string, LucideIcon> = {
  Newspaper,
  Share2,
  ShieldAlert,
  Target,
  PenLine,
  BarChart3,
};

export function Services() {
  const { services } = site;

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-[1360px] px-6 py-24 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className="eyebrow mb-4">{services.eyebrow}</p>
              <h2 className="max-w-[440px] font-display text-display font-normal leading-[1.15] text-ink">
                {services.title}
              </h2>
            </div>
            <p className="text-[1.05rem] leading-[1.8] text-gray">{services.subtitle}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Target;
            return (
              <Reveal key={item.name} delay={(i % 3) * 0.06}>
                <article className="group h-full rounded border border-line p-8 transition-colors duration-300 hover:bg-cream">
                  <span className="grid size-12 place-items-center rounded-sm border-[1.5px] border-gold text-gold">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.7] text-gray">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
