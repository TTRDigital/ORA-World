"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

/** Zoomable plan: wheel / pinch to zoom, drag to pan, buttons and keyboard for accessibility. */
export function ZoomImage({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const t = useTranslations("common");
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const pinch = useRef<number | null>(null);
  const clamp = (s: number) => Math.min(4, Math.max(1, s));

  return (
    <div className="relative">
      <div
        className="relative aspect-[4/3] touch-none overflow-hidden border border-rule bg-bone select-none"
        onWheel={(e) => {
          e.preventDefault();
          setScale((s) => clamp(s - e.deltaY * 0.0025));
        }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
        }}
        onPointerMove={(e) => {
          if (!drag.current || scale === 1) return;
          setPos({ x: drag.current.px + (e.clientX - drag.current.x), y: drag.current.py + (e.clientY - drag.current.y) });
        }}
        onPointerUp={() => (drag.current = null)}
        onTouchMove={(e) => {
          if (e.touches.length === 2) {
            const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            if (pinch.current) setScale((s) => clamp(s * (d / pinch.current!)));
            pinch.current = d;
          }
        }}
        onTouchEnd={() => (pinch.current = null)}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 transition-transform duration-200 ease-out" style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, transformOrigin: "center" }}>
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 60vw, 100vw" className="h-full w-full object-contain" priority />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2" role="group" aria-label="Zoom">
        <button type="button" onClick={() => setScale((s) => clamp(s - 0.5))} className="eyebrow cursor-pointer border border-rule px-3 py-2 hover:border-accent" aria-label="Zoom out">−</button>
        <button type="button" onClick={() => setScale((s) => clamp(s + 0.5))} className="eyebrow cursor-pointer border border-rule px-3 py-2 hover:border-accent" aria-label="Zoom in">+</button>
        <button type="button" onClick={() => { setScale(1); setPos({ x: 0, y: 0 }); }} className="eyebrow cursor-pointer px-3 py-2 text-fg-muted hover:text-fg">
          {t("clear")} · {Math.round(scale * 100)}%
        </button>
      </div>
    </div>
  );
}
