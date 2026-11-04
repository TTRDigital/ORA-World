"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";

/**
 * Brand line: the brand words set large and centred, with a rounded render "pill" after each word.
 * As the line scrolls into view the pills open from nothing to full width (scrubbed, no pinning),
 * pushing the words apart; hovering a pill widens it a little more.
 */
export function Marquee({ words, images }: { words: string[]; images: Localized<ImageRef>[] }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || document.documentElement.classList.contains("reduced-motion")) return;
    let kill: (() => void) | undefined;
    import("@/lib/gsap").then(({ gsap }) => {
      const pills = Array.from(el.querySelectorAll<HTMLElement>("[data-pill]"));
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top 90%", end: "center 50%", scrub: 0.6 },
      });
      pills.forEach((p, i) => {
        tl.fromTo(p, { "--open": 0, opacity: 0 }, { "--open": 1, opacity: 1, duration: 1 }, i * 0.15);
      });
      kill = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => kill?.();
  }, []);
  return (
    <section ref={root} aria-label={words.join(" · ")} className="border-y border-rule bg-bg py-section">
      <p className="container-x mx-auto max-w-[1300px] text-center font-display text-[clamp(2rem,1.1rem+4vw,5.5rem)] leading-[1.15] tracking-[-0.02em] text-fg">
        {words.map((w, i) => {
          const img = images[i % images.length];
          return (
            <span key={i}>
              <span className={i % 2 ? "font-serif text-accent italic" : ""}>{w}</span>{" "}
              {img && (
                <span
                  data-pill
                  aria-hidden
                  className="group relative mx-[0.12em] inline-block h-[0.82em] w-[calc(var(--pill-w)*var(--open,1))] overflow-hidden rounded-full align-[-0.06em] transition-[width] duration-500 [--pill-w:1.9em] hover:[--pill-w:2.5em]"
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 200px, 120px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: img.position }}
                  />
                </span>
              )}{" "}
            </span>
          );
        })}
      </p>
    </section>
  );
}
