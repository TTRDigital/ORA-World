"use client";

import { useEffect, useRef } from "react";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Picture } from "@/components/ui/Picture";

/**
 * Three renders that arrive as a tucked-in stack and fan out into a triptych as the band scrolls
 * into view (scrubbed to scroll, no pinning): the outer frames slide out from behind the centre one
 * and straighten, the centre frame grows to full size. Static triptych with reduced motion.
 */
export function FanGallery({
  images,
}: {
  images: [Localized<ImageRef>, Localized<ImageRef>, Localized<ImageRef>];
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || document.documentElement.classList.contains("reduced-motion")) return;
    let kill: (() => void) | undefined;
    import("@/lib/gsap").then(({ gsap }) => {
      const [l, c, r] = Array.from(el.querySelectorAll<HTMLElement>("[data-fan]"));
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top 95%", end: "center 55%", scrub: 0.8, invalidateOnRefresh: true },
      });
      tl.fromTo(l, { xPercent: 72, yPercent: 10, rotate: -7, scale: 0.78 }, { xPercent: 0, yPercent: 0, rotate: 0, scale: 1 }, 0)
        .fromTo(r, { xPercent: -72, yPercent: 10, rotate: 7, scale: 0.78 }, { xPercent: 0, yPercent: 0, rotate: 0, scale: 1 }, 0)
        .fromTo(c, { scale: 0.74, yPercent: 6 }, { scale: 1, yPercent: 0 }, 0);
      kill = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => kill?.();
  }, []);

  const [a, b, d] = images;
  return (
    <div ref={root} className="grid grid-cols-[1fr_1.35fr_1fr] items-center gap-2.5 md:gap-6">
      <div data-fan className="relative z-0 will-change-transform">
        <Picture image={a} sizes="(min-width: 768px) 28vw, 30vw" aspect="3/4" reveal={false} showCaption={false} />
      </div>
      <div data-fan className="relative z-[1] will-change-transform">
        <Picture image={b} sizes="(min-width: 768px) 38vw, 40vw" aspect="4/5" reveal={false} showCaption={false} />
      </div>
      <div data-fan className="relative z-0 will-change-transform">
        <Picture image={d} sizes="(min-width: 768px) 28vw, 30vw" aspect="3/4" reveal={false} showCaption={false} />
      </div>
    </div>
  );
}
