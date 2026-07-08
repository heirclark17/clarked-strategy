import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function Founder() {
  const { founder } = site;

  return (
    <section id="founder" className="bg-white">
      <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-6 py-24 md:grid-cols-[420px_1fr] md:gap-16 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <div className="relative w-full max-w-[420px]">
            <Image
              src={founder.photo}
              alt={founder.photoAlt}
              width={560}
              height={560}
              className="relative z-10 aspect-square w-full rounded object-cover object-top"
              priority={false}
            />
            <div
              aria-hidden
              className="absolute -right-4 -bottom-4 z-0 h-full w-full rounded border-2 border-gold"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="eyebrow mb-4">{founder.eyebrow}</p>
            <h2 className="font-display text-[2rem] font-normal leading-[1.2] text-ink">
              {founder.name}
            </h2>
            <p className="mt-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-gold">
              {founder.title}
            </p>
            {founder.bio.map((p, i) => (
              <p key={i} className="mt-5 text-base leading-[1.85] text-gray">
                {p}
              </p>
            ))}
            <div className="mt-8 border-t border-line pt-6 font-display text-[1.75rem] italic text-ink">
              {founder.signature}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
