"use client";

import { useEffect, useRef } from "react";

/**
 * Brand band: two rows of the brand words travelling in opposite directions, driven by the scroll
 * position (not a timer), so the band moves only when the visitor does. Decorative.
 */
export function Marquee({ words }: { words: string[] }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || document.documentElement.classList.contains("reduced-motion")) return;
    let kill: (() => void) | undefined;
    import("@/lib/gsap").then(({ gsap }) => {
      const [a, b] = Array.from(el.querySelectorAll<HTMLElement>("[data-row]"));
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
      tl.fromTo(a, { xPercent: 0 }, { xPercent: -30 }, 0).fromTo(b, { xPercent: -30 }, { xPercent: 0 }, 0);
      kill = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => kill?.();
  }, []);
  const row = [...words, ...words, ...words];
  return (
    <section ref={root} aria-hidden className="overflow-hidden border-y border-rule bg-bg py-8 md:py-12">
      <div data-row className="flex w-max items-center gap-8 whitespace-nowrap md:gap-14">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-14">
            <span className="font-display text-[clamp(2.6rem,1.5rem+5vw,6.5rem)] leading-none text-fg">{w}</span>
            <span className="h-2 w-2 rotate-45 bg-accent md:h-3 md:w-3" />
          </span>
        ))}
      </div>
      <div data-row className="mt-3 flex w-max items-center gap-8 whitespace-nowrap md:mt-5 md:gap-14">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-14">
            <span className="text-outline font-display text-[clamp(2.6rem,1.5rem+5vw,6.5rem)] leading-none italic">
              {w}
            </span>
            <span className="h-2 w-2 rotate-45 border border-accent md:h-3 md:w-3" />
          </span>
        ))}
      </div>
    </section>
  );
}
