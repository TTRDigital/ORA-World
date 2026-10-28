"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Wraps each rendered line of a headline in a masked span so it can rise into view.
 * Lines are measured after fonts load and re-measured on resize. Reduced motion shows text immediately.
 */
export function SplitLines({ as: Tag = "h2", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const original = el.innerHTML;
    let raf = 0;

    const split = () => {
      el.innerHTML = original;
      // wrap words
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
      textNodes.forEach((node) => {
        const frag = document.createDocumentFragment();
        node.textContent?.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else {
            const w = document.createElement("span");
            w.className = "inline-block";
            w.dataset.word = "";
            w.textContent = part;
            frag.appendChild(w);
          }
        });
        node.parentNode?.replaceChild(frag, node);
      });
      // group by line
      const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
      const lines: HTMLElement[][] = [];
      let top: number | null = null;
      words.forEach((w) => {
        const t = w.offsetTop;
        if (top === null || Math.abs(t - top) > 4) {
          lines.push([w]);
          top = t;
        } else lines[lines.length - 1].push(w);
      });
      const html = lines
        .map((line) => {
          const parent = line[0].parentElement;
          const inner = line.map((w) => (w.parentElement !== el && parent === w.parentElement ? w.outerHTML : w.outerHTML)).join(" ");
          const wrapTag = parent && parent !== el ? parent.tagName.toLowerCase() : null;
          const wrapClass = parent && parent !== el ? parent.className : "";
          const content = wrapTag ? `<${wrapTag} class="${wrapClass}">${inner}</${wrapTag}>` : inner;
          return `<span data-reveal-line><span>${content}</span></span>`;
        })
        .join("");
      el.innerHTML = html;
      el.dataset.revealLines = "";
    };

    const reduced = document.documentElement.classList.contains("reduced-motion");
    if (reduced) return;

    document.fonts?.ready.then(() => {
      split();
      window.dispatchEvent(new Event("ora:reveal-refresh"));
    });
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!el.classList.contains("is-revealed")) return;
        el.innerHTML = original;
      });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      el.innerHTML = original;
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
