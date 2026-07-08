import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/25 bg-ink text-white">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-6 px-6 py-10 md:px-10 lg:px-16">
        <a
          href="#home"
          className="text-base font-semibold uppercase tracking-[0.18em] text-white"
          aria-label={`${site.name} home`}
        >
          Clarked<span className="text-gold">.</span> Strategy
        </a>

        <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer">
          {site.footer.links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.78rem] font-medium uppercase tracking-[0.1em] text-white/60 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="w-full text-[0.75rem] text-white/40 md:w-auto">{site.footer.copyright}</p>
      </div>
    </footer>
  );
}
