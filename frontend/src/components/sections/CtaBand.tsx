import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export function CtaBand() {
  const { ctaBand } = site;

  return (
    <div className="bg-gold">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-8 px-6 py-20 text-center md:flex-row md:items-center md:justify-between md:px-10 md:py-24 md:text-left lg:px-16">
        <Reveal className="md:max-w-[720px]">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.2] text-ink">
            {ctaBand.lead} <em>{ctaBand.em}</em>
            {ctaBand.tail}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="shrink-0">
          <Button href={ctaBand.button.href} variant="dark" size="lg">
            {ctaBand.button.label}
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
