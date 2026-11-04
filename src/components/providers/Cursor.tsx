"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Desktop-only cursor companion: a brass ring that trails the pointer, grows over links and shows a
 * word ("View", "Drag", "Explore") over elements marked data-cursor. The native cursor stays visible,
 * so nothing about pointing changes; touch devices and reduced motion never mount it.
 */
export function Cursor() {
  const t = useTranslations("cursor");
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine) and (hover: hover)").matches &&
      !document.documentElement.classList.contains("reduced-motion");
    if (!ok) return;
    const id = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ring.current;
    if (!el) return;
    let x = innerWidth / 2,
      y = innerHeight / 2,
      cx = x,
      cy = y,
      raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      const target = (e.target as Element | null)?.closest?.("[data-cursor], a, button, [role=tab]");
      const key = target?.getAttribute("data-cursor");
      setLabel(key ? key : null);
      setHover(!!target);
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  const size = label ? 84 : hover ? 40 : 8;
  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[200] opacity-0 transition-opacity duration-300"
    >
      <div
        className="grid place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-out-expo)]"
        style={{
          width: size,
          height: size,
          borderColor: label || !hover ? "transparent" : "var(--color-brass)",
          backgroundColor: label
            ? "color-mix(in srgb, var(--color-basalt) 82%, transparent)"
            : hover
              ? "transparent"
              : "var(--color-brass)",
          backdropFilter: label ? "blur(6px)" : undefined,
        }}
      >
        {label && (
          <span className="text-[11px] font-medium tracking-[0.14em] text-white uppercase">
            {t(label as "view" | "drag" | "explore" | "play")}
          </span>
        )}
      </div>
    </div>
  );
}
