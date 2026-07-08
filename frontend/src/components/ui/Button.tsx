import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "secondary";
type Size = "md" | "lg";

const COMMON =
  "inline-flex items-center justify-center gap-2 font-semibold uppercase text-[0.82rem] " +
  "transition-[transform,background-color,border-color,color] duration-200 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-60";

/** Solid/ghost CTA. `onDark` adapts the ghost underline for dark sections. */
function classesFor(variant: Variant, size: Size, onDark: boolean): string {
  if (variant === "ghost") {
    return (
      "tracking-[0.1em] border-b pb-1 " +
      (onDark
        ? "text-white/70 hover:text-white border-white/25 hover:border-white"
        : "text-ink/70 hover:text-ink border-ink/25 hover:border-ink")
    );
  }
  const pad = size === "lg" ? "px-9 py-4 min-h-[52px]" : "px-6 py-3 min-h-[44px]";
  const shell = `rounded-sm tracking-[0.12em] hover:-translate-y-0.5 active:translate-y-0 ${pad}`;
  if (variant === "secondary") {
    return `${shell} border ${
      onDark
        ? "border-white/30 text-white hover:border-white hover:bg-white/10"
        : "border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.04]"
    }`;
  }
  const skin =
    variant === "primary"
      ? "bg-gold text-ink hover:bg-gold-light"
      : "bg-ink text-white hover:bg-ink-mid";
  return `${shell} ${skin}`;
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & { href: string };
type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

export function Button({
  variant = "primary",
  size = "md",
  onDark = false,
  className = "",
  children,
  ...rest
}: AsLink | AsButton) {
  const cls = `${COMMON} ${classesFor(variant, size, onDark)} ${className}`;
  const href = "href" in rest ? rest.href : undefined;

  if (href) {
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
