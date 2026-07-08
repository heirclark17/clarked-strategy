import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export function Hero() {
  const { eyebrow, title, subtitle, primaryCta, secondaryCta, scrollCue } = site.hero;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink px-6 pt-28 pb-24 md:px-10 md:pt-32 lg:px-16"
    >
      <span aria-hidden className="hero-watermark">
        CLARKED
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1360px]">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-[720px] text-balance font-display text-display-lg font-normal text-white">
            {title.lead} <em>{title.em}</em> {title.tail}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-[480px] text-lg leading-relaxed text-white/60">{subtitle}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="ghost" onDark>
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </div>

      <span
        aria-hidden
        className="absolute bottom-8 left-6 z-10 hidden items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-white/30 md:left-10 md:inline-flex lg:left-16"
      >
        <span className="h-px w-8 bg-white/30" />
        {scrollCue}
      </span>
    </section>
  );
}
