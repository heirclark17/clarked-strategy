import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/** Renders a word-stat with its trailing symbol (. or °) in gold. */
function StatValue({ value }: { value: string }) {
  const main = value.slice(0, -1);
  const accent = value.slice(-1);
  return (
    <>
      {main}
      <span className="text-gold">{accent}</span>
    </>
  );
}

export function About() {
  const { about } = site;

  return (
    <section id="about" className="bg-cream">
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <div>
            <p className="eyebrow mb-4">{about.eyebrow}</p>
            <h2 className="max-w-[560px] font-display text-display font-normal leading-[1.15] text-ink">
              {about.title}
            </h2>
            {about.body.map((p, i) => (
              <p key={i} className="mt-5 max-w-[520px] text-[1.05rem] leading-[1.85] text-[#3d4a56]">
                {p}
              </p>
            ))}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {about.stats.map((s) => (
                <div key={s.label} className="rounded border border-line bg-white p-6">
                  <div className="font-display text-[2.5rem] font-bold leading-none text-ink">
                    <StatValue value={s.value} />
                  </div>
                  <div className="mt-2 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-gray">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded bg-ink p-10 md:p-12">
            <p className="font-display text-[1.6rem] italic leading-[1.5] text-white">
              &ldquo;{about.quote.lead} <em>{about.quote.em}</em>
              {about.quote.tail}&rdquo;
            </p>
            <p className="mt-6 text-[0.78rem] uppercase tracking-[0.14em] text-gold">
              {about.quote.attribution}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
