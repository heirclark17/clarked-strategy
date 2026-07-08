import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-150 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] " +
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-5 text-[0.95rem]",
  lg: "min-h-[52px] px-7 text-base",
};

/** Variant classes. `onDark` flips secondary/ghost styles for dark sections. */
function variantClasses(variant: Variant, onDark: boolean): string {
  if (variant === "primary") {
    return "bg-primary text-white shadow-glow hover:bg-primary-strong";
  }
  if (variant === "secondary") {
    return onDark
      ? "border border-white/30 text-white hover:border-white hover:bg-white/10"
      : "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.04]";
  }
  return onDark
    ? "text-white/90 hover:text-white hover:bg-white/10"
    : "text-ink hover:bg-ink/[0.05]";
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
  const cls = `${base} ${sizes[size]} ${variantClasses(variant, onDark)} ${className}`;
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
