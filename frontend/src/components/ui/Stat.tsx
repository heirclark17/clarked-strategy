import { AnimatedCounter } from "./AnimatedCounter";

/** A single animated proof-stat: big counted number + label. */
export function Stat({
  value,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
  onDark = false,
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  onDark?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span
        className={`font-display text-display font-semibold tabular-nums tracking-tight ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        <AnimatedCounter value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
      </span>
      <span className={`mt-2 text-sm ${onDark ? "text-white/60" : "text-muted"}`}>{label}</span>
    </div>
  );
}
