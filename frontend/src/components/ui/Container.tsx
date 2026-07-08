import { type ReactNode } from "react";

/** Centered max-width wrapper with consistent horizontal padding. */
export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const max =
    size === "wide" ? "max-w-7xl" : size === "narrow" ? "max-w-3xl" : "max-w-6xl";
  return <div className={`mx-auto w-full ${max} px-6 md:px-8 ${className}`}>{children}</div>;
}
