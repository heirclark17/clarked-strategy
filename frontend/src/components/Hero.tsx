import { site } from "@/content/site";

export default function Hero() {
  const { hero } = site;

  return (
    <section id="top" className="bg-navy relative overflow-hidden text-white">
      <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
      <div
        className="bg-gold/20 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="eyebrow text-gold">{hero.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{hero.subtitle}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={hero.primaryCta.href}
            className="bg-gold text-navy-deep rounded-full px-6 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full border border-white/25 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <dl className="mt-16 grid max-w-2xl grid-cols-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
          {hero.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-2xl font-semibold text-white">{s.value}</dt>
              <dd className="mt-1 text-sm text-white/60">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
