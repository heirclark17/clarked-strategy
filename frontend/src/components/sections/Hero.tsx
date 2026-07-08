"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { eyebrow, titleLead, kineticWords, subtitle, primaryCta, secondaryCta } = site.hero;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % kineticWords.length), 2600);
    return () => clearInterval(id);
  }, [reduce, kineticWords.length]);

  const word = kineticWords[index];

  return (
    <section className="gradient-mesh relative overflow-hidden text-white">
      {/* One moving element: a slow-drifting blurred orb behind the headline. */}
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute -top-32 left-1/2 size-[42rem] max-w-[120vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,77,255,0.55), rgba(255,90,54,0.28) 60%, transparent 75%)",
        }}
      />
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />

      <Container className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-24 md:py-32">
        <div className="max-w-4xl">
          <span className="eyebrow mb-6 inline-block text-accent">{eyebrow}</span>

          <h1 className="font-display text-display-lg font-semibold tracking-tight text-balance">
            {titleLead}{" "}
            <span className="block min-h-[1.1em] md:inline md:min-h-0">
              {reduce ? (
                <span className="kinetic-gradient">{word}</span>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={index}
                    className="kinetic-gradient inline-block"
                    initial={{ opacity: 0, y: "0.4em" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-0.4em" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </AnimatePresence>
              )}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg text-white/75 md:text-xl">{subtitle}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href={secondaryCta.href} size="lg" variant="secondary" onDark>
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* screen-reader-only full sentence for context */}
      <span className="sr-only">
        {titleLead} {kineticWords.join(", ")}
      </span>

      <style>{`
        .kinetic-gradient {
          background-image: linear-gradient(90deg, #9d86ff, #ff7a52);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
