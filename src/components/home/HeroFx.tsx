"use client";

import { useEffect, useRef } from "react";

/**
 * Hero curtain. The hero stays pinned (sticky) while the rest of the page slides over it like a
 * sheet; as it is covered the film eases in, dims and the headline drifts up and fades.
 * When the hero is taller than the screen it sticks by its bottom edge, so nothing is ever hidden.
 */
export function HeroFx() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = probe.current?.closest<HTMLElement>("[data-hero]");
    if (!hero) return;
    const media = hero.querySelector<HTMLElement>("[data-hero-media]");
    const content = hero.querySelector<HTMLElement>("[data-hero-content]");
    const shade = hero.querySelector<HTMLElement>("[data-hero-shade]");

    const fit = () => {
      hero.style.top = `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(hero);
    window.addEventListener("resize", fit);

    let kill: (() => void) | undefined;
    if (!document.documentElement.classList.contains("reduced-motion")) {
      import("@/lib/gsap").then(({ gsap }) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: hero,
            start: () => `top+=${Math.max(0, hero.offsetHeight - window.innerHeight)} top`,
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        if (media) tl.fromTo(media, { scale: 1 }, { scale: 1.12 }, 0);
        if (shade) tl.fromTo(shade, { opacity: 0 }, { opacity: 0.75 }, 0);
        if (content) tl.fromTo(content, { y: 0, opacity: 1 }, { y: -80, opacity: 0 }, 0);
        kill = () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      kill?.();
    };
  }, []);

  return <span ref={probe} hidden />;
}
