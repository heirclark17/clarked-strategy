import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="gradient-mesh relative overflow-hidden text-white">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
      <Container className="relative py-24 text-center md:py-32">
        <h2 className="mx-auto max-w-3xl font-display text-display font-semibold tracking-tight text-balance">
          {site.finalCta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">{site.finalCta.subtitle}</p>
        <div className="mt-10 flex justify-center">
          <Button href={site.finalCta.primaryCta.href} size="lg">
            {site.finalCta.primaryCta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}
