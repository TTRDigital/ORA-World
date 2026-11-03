"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

/** Progress line + counter for a horizontal snap rail. Mobile only by default. */
export function RailProgress({
  target,
  count,
  className,
  tone = "light",
}: {
  target: RefObject<HTMLElement | null>;
  count: number;
  className?: string;
  tone?: "light" | "dark";
}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      setP(max > 0 ? el.scrollLeft / max : 0);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    raf = requestAnimationFrame(measure);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [target]);
  const current = Math.min(count, Math.round(p * (count - 1)) + 1);
  return (
    <div aria-hidden className={cn("mt-5 flex items-center gap-4 md:hidden", className)}>
      <span className={cn("relative h-[2px] flex-1", tone === "dark" ? "bg-dark-rule" : "bg-rule")}>
        <span
          className={cn("absolute inset-y-0 left-0", tone === "dark" ? "bg-dark-accent" : "bg-accent")}
          style={{ width: `${Math.max(1 / count, p) * 100}%` }}
        />
      </span>
      <span className={cn("eyebrow tnum", tone === "dark" ? "text-dark-fg/80" : "text-fg-muted")}>
        {String(current).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}

/**
 * A list that is a swipeable snap rail with a progress line on mobile and whatever grid
 * `className` describes from md up. Children should be <li> elements.
 */
export function SwipeRail({
  children,
  count,
  className,
  label,
}: {
  children: ReactNode;
  count: number;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        className={cn(
          "max-md:-mx-[var(--gutter)] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:scroll-px-[var(--gutter)] max-md:[scrollbar-width:none] max-md:gap-3 max-md:overflow-x-auto max-md:px-[var(--gutter)] max-md:pb-1 max-md:[&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {children}
      </ul>
      <RailProgress target={ref} count={count} />
    </div>
  );
}
