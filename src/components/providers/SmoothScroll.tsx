"use client";

import { useEffect } from "react";

/** Lenis smooth scrolling, synced to the GSAP ticker. Off for touch and reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), import("@/lib/gsap")]);
      if (destroyed) return;
      const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.9, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const onCtl = (e: Event) => {
        const stop = (e as CustomEvent<{ stop: boolean }>).detail?.stop;
        if (stop) lenis.stop();
        else lenis.start();
      };
      const onAnchor = (e: Event) => {
        const target = (e as CustomEvent<{ target: string | HTMLElement; offset?: number }>).detail;
        lenis.scrollTo(target.target, { offset: target.offset ?? 0, duration: 1.4 });
      };
      window.addEventListener("ora:lenis", onCtl);
      window.addEventListener("ora:scrollto", onAnchor);
      cleanup = () => {
        window.removeEventListener("ora:lenis", onCtl);
        window.removeEventListener("ora:scrollto", onAnchor);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
