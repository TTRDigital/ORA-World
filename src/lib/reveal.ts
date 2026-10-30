/**
 * Scroll reveals. Elements opt in with data attributes:
 *  data-reveal            fade + 24px rise
 *  data-reveal="image"    clip-path wipe + scale 1.06 → 1
 *  data-reveal-lines      (set by SplitLines) masked line rise
 *  data-counter="1200"    count up once (with data-prefix / data-suffix / data-decimals)
 *  data-parallax="0.06"   vertical parallax ratio
 *
 * Reveals use IntersectionObserver so an element is shown whenever it enters the viewport,
 * however the visitor got there (fast scroll, back navigation, anchor jump). Parallax uses ScrollTrigger.
 */
const SAFETY_MS = 2500;

export async function initReveals(): Promise<() => void> {
  const html = document.documentElement;
  const reduced = html.classList.contains("reduced-motion");
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-lines], [data-counter], [data-parallax]"),
  );

  if (reduced) {
    nodes.forEach((n) => {
      n.classList.add("is-revealed");
      n.querySelectorAll("[data-reveal-line]").forEach((l) => l.classList.add("is-revealed"));
      if (n.dataset.counter) n.textContent = formatCounter(n, Number(n.dataset.counter));
    });
    return () => {};
  }

  const { gsap, ScrollTrigger } = await import("./gsap");
  const triggers: InstanceType<typeof ScrollTrigger>[] = [];
  const timers: number[] = [];

  const bind = (el: HTMLElement) => {
    if (el.dataset.revealBound) return false;
    el.dataset.revealBound = "1";
    return true;
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        const run = pending.get(el);
        pending.delete(el);
        run?.();
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  const pending = new Map<HTMLElement, () => void>();
  const watch = (el: HTMLElement, run: () => void) => {
    pending.set(el, run);
    io.observe(el);
    // Safety net: never leave content hidden if the observer is starved (background tab, heavy page).
    timers.push(
      window.setTimeout(() => {
        if (pending.has(el)) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            pending.delete(el);
            io.unobserve(el);
            run();
          }
        }
      }, SAFETY_MS),
    );
  };

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (el.classList.contains("is-revealed") || !bind(el)) return;
    const image = el.dataset.reveal === "image";
    const inner = image ? el.querySelector<HTMLElement>("img, video, picture, [data-reveal-inner]") : null;
    watch(el, () => {
      // Set the start state before the class flips opacity back on, so there is no flash.
      if (image) gsap.set(el, { clipPath: "inset(0 0 100% 0)", opacity: 1 });
      else gsap.set(el, { opacity: 0, y: 24, yPercent: 0 });
      el.classList.add("is-revealed");
      gsap.to(el, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: image ? 1.2 : 0.9,
        ease: "expo.out",
        delay: Number(el.dataset.delay || 0),
        onComplete: () => gsap.set(el, { clearProps: "clipPath,transform,opacity" }),
      });
      if (inner)
        gsap.fromTo(inner, { scale: 1.06 }, { scale: 1, duration: 1.6, ease: "expo.out", clearProps: "transform" });
    });
  });

  document.querySelectorAll<HTMLElement>("[data-reveal-lines]").forEach((block) => {
    const lines = block.querySelectorAll<HTMLElement>("[data-reveal-line] > span");
    if (!lines.length || block.classList.contains("is-revealed") || !bind(block)) return;
    watch(block, () => {
      block.querySelectorAll("[data-reveal-line]").forEach((l) => l.classList.add("is-revealed"));
      // The CSS pre-hide uses translateY(110%); pin y to 0 so GSAP does not carry that offset over.
      gsap.fromTo(
        lines,
        { yPercent: 110, y: 0 },
        {
          yPercent: 0,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          onComplete: () => {
            block.classList.add("is-revealed");
            gsap.set(lines, { clearProps: "transform,translate,rotate,scale" });
          },
        },
      );
    });
  });

  document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
    if (el.dataset.counted || !bind(el)) return;
    const target = Number(el.dataset.counter);
    const obj = { v: 0 };
    el.textContent = formatCounter(el, 0);
    watch(el, () => {
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: "expo.out",
        onUpdate: () => (el.textContent = formatCounter(el, obj.v)),
        onComplete: () => (el.dataset.counted = "1"),
      });
    });
  });

  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    if (!bind(el)) return;
    const ratio = Number(el.dataset.parallax || 0.06);
    const tween = gsap.fromTo(
      el,
      { yPercent: -ratio * 100 },
      {
        yPercent: ratio * 100,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.8 },
      },
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  ScrollTrigger.refresh();
  return () => {
    io.disconnect();
    timers.forEach((t) => window.clearTimeout(t));
    triggers.forEach((t) => t.kill());
  };
}

function formatCounter(el: HTMLElement, value: number) {
  const decimals = Number(el.dataset.decimals || 0);
  const n = decimals
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString(document.documentElement.lang || "en");
  return `${el.dataset.prefix || ""}${n}${el.dataset.suffix || ""}`;
}
