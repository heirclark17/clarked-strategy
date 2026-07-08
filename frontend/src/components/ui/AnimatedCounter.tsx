"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts up from 0 to `value` when scrolled into view (once).
 * Under prefers-reduced-motion it renders the final value immediately.
 */
export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 1500,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion → duration 0 so it jumps to the value on the first frame.
    const duration = reduce ? 0 : durationMs;
    let raf = 0;
    let startTs: number | null = null;
    const step = (ts: number) => {
      if (startTs === null) startTs = ts;
      const t = duration <= 0 ? 1 : Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(value * eased);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, durationMs]);

  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
