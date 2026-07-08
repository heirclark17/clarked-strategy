import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function TrustBar() {
  return (
    <section className="border-y border-line py-8">
      <Container>
        <p className="text-center text-sm font-medium text-muted">{site.trust.heading}</p>
        {/* TODO: replace credibility signals with real client/partner logos when available. */}
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-6">
          {site.trust.signals.map((s, i) => (
            <li key={s} className="flex items-center gap-3 sm:gap-6">
              {i > 0 ? <span aria-hidden className="size-1 rounded-full bg-ink/25" /> : null}
              <span className="text-sm font-semibold tracking-tight text-ink/70">{s}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
