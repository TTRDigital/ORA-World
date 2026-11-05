// Source: vengeance-ui "stats-counter" (https://www.vengeanceui.com/r/stats-counter.json)
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function StatsCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true }) /* ORA: count as soon as any part is on screen */;
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  // ORA: the real value is rendered on the server (no-JS and crawlers see it); the digits are reset
  // to 0 before first paint and then written straight to the DOM on every frame (no re-renders),
  // with thousands separators.
  const fmt = (v: number) =>
    v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useLayoutEffect(() => {
    if (num.current && !document.documentElement.classList.contains("reduced-motion")) num.current.textContent = fmt(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInView && !document.documentElement.classList.contains("reduced-motion")) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (num.current) num.current.textContent = fmt(latest);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [springValue]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <span ref={num}>{fmt(value)}</span>
      {suffix}
    </span>
  );
}
