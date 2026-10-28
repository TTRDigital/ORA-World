"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Wordmark } from "@/components/layout/Wordmark";

const KEY = "ora_intro_seen";

/**
 * First visit only, under 1.5 s: the wordmark draws in brass, then the curtain wipes up.
 * Skipped on return visits and under reduced motion. Never blocks interaction: it is purely visual.
 */
export function Preloader() {
  const t = useTranslations("home");
  const [state, setState] = useState<"hidden" | "drawing" | "leaving">("hidden");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = !!window.sessionStorage.getItem(KEY);
    } catch {}
    if (reduced || seen) return;
    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {}
    setState("drawing");
    const t1 = window.setTimeout(() => setState("leaving"), 950);
    const t2 = window.setTimeout(() => setState("hidden"), 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-basalt transition-[clip-path] duration-[550ms] ease-[var(--ease-in-out-quart)]"
      style={{ clipPath: state === "leaving" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)" }}
    >
      <div className="relative w-[56vw] max-w-[420px] text-brass-light">
        <Wordmark className="w-full opacity-20" />
        <div className="absolute inset-0 overflow-hidden motion-safe:animate-[wmdraw_900ms_var(--ease-out-expo)_forwards]" style={{ clipPath: "inset(0 100% 0 0)" }}>
          <Wordmark className="w-full" />
        </div>
        <style>{`@keyframes wmdraw{to{clip-path:inset(0 0% 0 0)}}`}</style>
      </div>
      <button
        type="button"
        onClick={() => setState("hidden")}
        className="pointer-events-auto absolute right-6 bottom-6 text-[11px] tracking-[0.18em] text-dark-fg/60 uppercase"
      >
        {t("skipPreloader")}
      </button>
    </div>
  );
}
