/**
 * Scroll reveals. Elements opt in with data attributes:
 *  data-reveal            fade + 24px rise
 *  data-reveal="image"    clip-path wipe + scale 1.06 → 1
 *  data-reveal-line       (set by SplitLines) masked line rise
 *  data-counter="1200"    count up once (with data-prefix / data-suffix / data-decimals)
 *  data-parallax="0.06"   vertical parallax ratio
 */
export async function initReveals(): Promise<() => void> {
  const html = document.documentElement;
  const reduced = html.classList.contains("reduced-motion");
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-line], [data-counter], [data-parallax]"));

  if (reduced) {
    nodes.forEach((n) => {
      n.classList.add("is-revealed");
      if (n.dataset.counter) n.textContent = formatCounter(n, Number(n.dataset.counter));
    });
    return () => {};
  }

  const { gsap, ScrollTrigger } = await import("./gsap");
  const triggers: InstanceType<typeof ScrollTrigger>[] = [];

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (el.classList.contains("is-revealed")) return;
    const image = el.dataset.reveal === "image";
    const inner = image ? el.querySelector<HTMLElement>("img, video, picture, [data-reveal-inner]") : null;
    const tween = gsap.fromTo(
      el,
      image ? { clipPath: "inset(0 0 100% 0)", opacity: 1 } : { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: image ? 1.2 : 0.9,
        ease: "expo.out",
        delay: Number(el.dataset.delay || 0),
        paused: true,
        onStart: () => el.classList.add("is-revealed"),
        onComplete: () => gsap.set(el, { clearProps: "clipPath,transform" }),
      },
    );
    if (inner) gsap.fromTo(inner, { scale: 1.06 }, { scale: 1, duration: 1.6, ease: "expo.out", paused: true, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    triggers.push(ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => tween.play() }));
  });

  document.querySelectorAll<HTMLElement>("[data-reveal-lines]").forEach((block) => {
    const lines = block.querySelectorAll<HTMLElement>("[data-reveal-line] > span");
    if (!lines.length || block.classList.contains("is-revealed")) return;
    const tween = gsap.fromTo(
      lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        paused: true,
        onStart: () => block.querySelectorAll("[data-reveal-line]").forEach((l) => l.classList.add("is-revealed")),
        onComplete: () => block.classList.add("is-revealed"),
      },
    );
    triggers.push(ScrollTrigger.create({ trigger: block, start: "top 85%", once: true, onEnter: () => tween.play() }));
  });

  document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
    if (el.dataset.counted) return;
    const target = Number(el.dataset.counter);
    const obj = { v: 0 };
    el.textContent = formatCounter(el, 0);
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: "expo.out",
      paused: true,
      onUpdate: () => (el.textContent = formatCounter(el, obj.v)),
      onComplete: () => (el.dataset.counted = "1"),
    });
    triggers.push(ScrollTrigger.create({ trigger: el, start: "top 80%", once: true, onEnter: () => tween.play() }));
  });

  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const ratio = Number(el.dataset.parallax || 0.06);
    const tween = gsap.fromTo(
      el,
      { yPercent: -ratio * 100 },
      { yPercent: ratio * 100, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.8 } },
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  ScrollTrigger.refresh();
  return () => triggers.forEach((t) => t.kill());
}

function formatCounter(el: HTMLElement, value: number) {
  const decimals = Number(el.dataset.decimals || 0);
  const n = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString(document.documentElement.lang || "en");
  return `${el.dataset.prefix || ""}${n}${el.dataset.suffix || ""}`;
}
