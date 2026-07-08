import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  // Deterministic on the server; avoids hydration mismatch from new Date().
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <div className="flex items-center">
            <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{site.footer.blurb}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="eyebrow text-white/40">Explore</p>
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={site.cta.href}
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            {site.cta.label}
          </Link>
        </nav>

        <nav aria-label="Social" className="flex flex-col gap-3">
          <p className="eyebrow text-white/40">Follow</p>
          {site.footer.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              {s.label}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ))}
        </nav>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.domain}</p>
        </Container>
      </div>
    </footer>
  );
}
