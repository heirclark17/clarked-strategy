import { type ReactNode } from "react";

/** Consistent eyebrow + title + optional subtitle block used by every section. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  onDark = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span className={`eyebrow mb-4 ${onDark ? "text-accent" : "text-primary"}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`font-display text-display-sm font-semibold text-balance ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-lg ${onDark ? "text-white/70" : "text-muted"}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
