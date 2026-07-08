import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, MessageSquare } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { DiscoveryForm } from "@/components/discovery/DiscoveryForm";

export const metadata: Metadata = {
  title: "Client Discovery Session",
  description:
    "Tell us about your product, your audience, and your goals. It takes about 10 minutes and it's where our best engagements begin.",
};

const assurances = [
  { icon: Clock, text: "About 10 minutes" },
  { icon: ShieldCheck, text: "No obligation" },
  { icon: MessageSquare, text: "We reply within 1 business day" },
];

export default function DiscoveryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Slim, distraction-reduced header */}
      <header className="border-b border-line">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <span className="grid size-8 place-items-center rounded-lg bg-ink font-display text-base font-bold text-white">
              C
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-ink">
              {site.name}
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to site
          </Link>
        </Container>
      </header>

      <main id="main" className="flex-1 py-12 md:py-16">
        <Container size="narrow">
          <div className="mx-auto w-full max-w-2xl">
            <span className="eyebrow mb-4 inline-block text-primary">Client Discovery Session</span>
            <h1 className="font-display text-display-sm font-semibold tracking-tight text-ink text-balance">
              Let’s learn your world before we plan a single thing.
            </h1>
            <p className="mt-4 text-lg text-muted">
              Six quick sections on your product, audience, goals, and competition. The sharper your
              answers, the sharper the strategy we bring back.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {assurances.map((a) => (
                <li key={a.text} className="flex items-center gap-2 text-sm font-medium text-ink/70">
                  <a.icon className="size-4 text-primary" aria-hidden />
                  {a.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <DiscoveryForm />
          </div>
        </Container>
      </main>

      <footer className="border-t border-line py-8">
        <Container className="flex flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            {site.email}
          </a>
        </Container>
      </footer>
    </div>
  );
}
