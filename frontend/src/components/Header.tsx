"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/15 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-6 py-4 md:px-10 lg:px-16 md:py-5">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="text-lg font-semibold uppercase tracking-[0.18em] text-white"
        >
          Clarked<span className="text-gold">.</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.78rem] font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={site.cta.href}
          className="hidden rounded-sm bg-gold px-6 py-2.5 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-gold-light md:inline-block"
        >
          {site.cta.label}
        </a>

        <button
          type="button"
          className="grid size-11 place-items-center text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-gold/15 bg-ink md:hidden">
          <nav className="mx-auto flex max-w-[1360px] flex-col gap-1 px-6 py-4" aria-label="Mobile">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium uppercase tracking-[0.1em] text-white/80 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.cta.href}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-sm bg-gold px-6 py-3 text-center text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink"
            >
              {site.cta.label}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
