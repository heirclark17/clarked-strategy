import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your Client Discovery Session request is in.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <div className="gradient-mesh flex min-h-screen flex-col text-white">
      <div aria-hidden className="bg-grid pointer-events-none fixed inset-0 opacity-40" />
      <main
        id="main"
        className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 text-center"
      >
        <Container size="narrow" className="flex flex-col items-center">
          <span className="grid size-16 place-items-center rounded-full bg-white text-ink shadow-glow">
            <Check className="size-8" aria-hidden strokeWidth={2.5} />
          </span>

          <h1 className="mt-8 font-display text-display font-semibold tracking-tight text-balance">
            Got it — this is the fun part for us.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/75">
            Thanks for the detail. We’re already reading it. You’ll hear back from us at{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-white underline underline-offset-4">
              {site.email}
            </a>{" "}
            within one business day — usually with a first read on where the biggest opportunity is.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/" variant="secondary" onDark size="lg">
              <ArrowRight className="size-4 rotate-180" aria-hidden />
              Back to home
            </Button>
            <Button href="/#work" size="lg">
              See our work
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>

          <p className="mt-12 text-sm text-white/50">
            {site.name} · {site.domain}
          </p>
        </Container>
      </main>
    </div>
  );
}
