"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { fullBleedSizes } from "@/lib/sizes";

/**
 * Full-screen interlude between chapters. A rendering held in a framed window opens out to full
 * bleed as you scroll, the camera settles (scale 1.18 → 1), and three short facts arrive one by one.
 * Server HTML shows the finished state, so nothing depends on JavaScript or motion.
 */
export function Interlude({ image, lines }: { image: Localized<ImageRef>; lines: string[] }) {
  const t = useTranslations("common");
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || document.documentElement.classList.contains("reduced-motion")) return;
    let kill: (() => void) | undefined;
    import("@/lib/gsap").then(({ gsap }) => {
      const frame = el.querySelector<HTMLElement>("[data-frame]");
      const pic = el.querySelector<HTMLElement>("[data-pic]");
      const items = el.querySelectorAll<HTMLElement>("[data-line]");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.fromTo(
        frame,
        { clipPath: "inset(14% 10% 14% 10% round 28px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
        0,
      ).fromTo(pic, { scale: 1.18 }, { scale: 1, duration: 1.4 }, 0);
      items.forEach((it, i) => {
        tl.fromTo(it, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.3 + i * 0.22);
      });
      tl.to({}, { duration: 0.3 });
      kill = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => kill?.();
  }, []);

  return (
    <section ref={root} data-interlude className="relative h-[200vh] bg-bg" aria-label={lines.join(". ")}>
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div data-frame className="absolute inset-0 overflow-hidden">
          <div data-pic className="absolute inset-0 will-change-transform">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={fullBleedSizes(image, 1.18)}
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-basalt/25 via-basalt/35 to-basalt/70" />
          <div className="relative grid h-full place-items-center px-[var(--gutter)] text-center text-white">
            <div className="space-y-2 md:space-y-3">
              {lines.map((l, i) => (
                <p
                  key={i}
                  data-line
                  className={
                    i === lines.length - 1
                      ? "font-display text-[clamp(1.4rem,1rem+2vw,2.6rem)] text-white/95 italic [text-shadow:0_2px_24px_rgba(0,0,0,.55)]"
                      : "display-l [text-shadow:0_2px_30px_rgba(0,0,0,.35)]"
                  }
                >
                  {l}
                </p>
              ))}
            </div>
          </div>
          {image.rendering && (
            <p className="absolute right-4 bottom-4 text-[10px] tracking-[0.14em] text-white/80 uppercase">
              {t("rendering")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
