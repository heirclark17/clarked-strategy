import { type ReactNode } from "react";

/** Neutral surface card. `interactive` adds a subtle hover lift. */
export function Card({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const hover = interactive
    ? "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
    : "";
  return (
    <div
      className={`rounded-3xl border border-line bg-card p-6 shadow-sm md:p-8 ${hover} ${className}`}
    >
      {children}
    </div>
  );
}
