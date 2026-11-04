"use client";

import { useEffect, useRef } from "react";

/**
 * Hero scroll-out. The hero scrolls away like any section (nothing slides over it, so the stats
 * band is always seen); as it leaves, the film eases in and dims and the headline drifts up.
 */
export function HeroFx() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = probe.current?.closest<HTMLElement>("[data-hero]");
    if (!hero) return;
    const media = hero.querySelector<HTMLElement>("[data-hero-media]");
    const content = hero.querySelector<HTMLElement>("[data-hero-content]");
    const shade = hero.querySelector<HTMLElement>("[data-hero-shade]");

    let kill: (() => void) | undefined;
    if (!document.documentElement.classList.contains("reduced-motion")) {
      import("@/lib/gsap").then(({ gsap }) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        if (media) tl.fromTo(media, { scale: 1 }, { scale: 1.08 }, 0);
        if (shade) tl.fromTo(shade, { opacity: 0 }, { opacity: 0.5 }, 0);
        if (content) tl.fromTo(content, { y: 0, opacity: 1 }, { y: -60, opacity: 0.2 }, 0);
        kill = () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }
    return () => {
      kill?.();
    };
  }, []);

  return <span ref={probe} hidden />;
}
