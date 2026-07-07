"use client";

import { useState } from "react";
import { site } from "@/content/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-line/70 bg-background/85 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="bg-navy grid h-7 w-7 place-items-center rounded-md text-sm font-bold text-white">
            C
          </span>
          <span className="text-navy">{site.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate hover:text-navy text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-navy hover:bg-navy-deep rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="border-line text-navy grid h-9 w-9 place-items-center rounded-md border md:hidden"
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-line bg-background border-t px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-slate hover:text-navy text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
