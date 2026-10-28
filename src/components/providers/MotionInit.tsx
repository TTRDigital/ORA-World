"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initReveals } from "@/lib/reveal";

/**
 * Marks the document as JS-enabled, mirrors prefers-reduced-motion onto <html>,
 * and (re)initialises scroll reveals after every navigation.
 */
export function MotionInit() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => html.classList.toggle("reduced-motion", mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Magnetic pull on primary CTAs (desktop pointer only, max 8px).
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const onMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
      document.querySelectorAll<HTMLElement>("[data-magnetic][data-mag-active]").forEach((m) => {
        if (m !== el) {
          m.style.transform = "";
          delete m.dataset.magActive;
        }
      });
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 16;
      const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * 16;
      el.dataset.magActive = "1";
      el.style.transition = "transform 600ms var(--ease-out-expo)";
      el.style.transform = `translate(${Math.max(-8, Math.min(8, dx))}px, ${Math.max(-8, Math.min(8, dy))}px)`;
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const start = () => initReveals().then((c) => cleanups.push(c));
        if ("requestIdleCallback" in window) window.requestIdleCallback(() => start(), { timeout: 800 });
        else start();
      });
    };
    run();
    // SplitLines and lazy sections ask for a re-scan once they have produced new reveal nodes.
    window.addEventListener("ora:reveal-refresh", run);
    return () => {
      window.removeEventListener("ora:reveal-refresh", run);
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
      document.querySelectorAll<HTMLElement>("[data-reveal-bound]").forEach((n) => delete n.dataset.revealBound);
    };
  }, [pathname]);

  return null;
}
