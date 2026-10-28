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
      // 1) wrap every word in a span; inline wrappers (em, strong, span) are cloned around each word
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
      const wrappersToUnwrap = new Set<HTMLElement>();
      textNodes.forEach((node) => {
        const parent = node.parentElement;
        const frag = document.createDocumentFragment();
        node.textContent?.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const w = document.createElement("span");
          w.className = "inline-block";
          w.dataset.word = "";
          w.textContent = part;
          if (parent && parent !== el) {
            const clone = parent.cloneNode(false) as HTMLElement;
            clone.appendChild(w);
            frag.appendChild(clone);
            wrappersToUnwrap.add(parent);
          } else frag.appendChild(w);
        });
        node.parentNode?.replaceChild(frag, node);
      });
      wrappersToUnwrap.forEach((p) => p.replaceWith(...Array.from(p.childNodes)));
      // 2) group words by rendered line
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
          const inner = line.map((w) => (w.parentElement && w.parentElement !== el ? w.parentElement.outerHTML : w.outerHTML)).join(" ");
          return `<span data-reveal-line><span>${inner}</span></span>`;
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
