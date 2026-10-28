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

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const id = window.requestAnimationFrame(() => {
      initReveals().then((c) => (cleanup = c));
    });
    return () => {
      window.cancelAnimationFrame(id);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
