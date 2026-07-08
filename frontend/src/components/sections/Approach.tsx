import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function Approach() {
  const { approach } = site;

  return (
    <section id="approach" className="bg-ink text-white">
      <div className="mx-auto max-w-[1360px] px-6 py-24 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <p className="eyebrow mb-4">{approach.eyebrow}</p>
          <h2 className="font-display text-display font-normal leading-[1.15] text-white">
            {approach.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {approach.steps.map((step, i) => (
            <Reveal key={step.no} delay={(i % 4) * 0.06}>
              <div className="border-t border-gold/30 pt-6">
                <div className="font-display text-[2.5rem] font-normal leading-none text-gold/40">
                  {step.no}
                </div>
                <h3 className="mt-4 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-gold">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-[1.7] text-white/55">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
