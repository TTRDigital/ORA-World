"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A render's short clip, laid over its still image ("make our images live"). Muted, inline, looping,
 * no controls. It only loads once near the screen, pauses when scrolled away, and fades in once frames
 * are actually playing, so the sharp still shows while it loads, if it can't play, or for visitors who
 * prefer reduced motion or save data.
 */
export function LiveVideo({ src, position, className }: { src: string; position?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (document.documentElement.classList.contains("reduced-motion") || nav.connection?.saveData) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      muted
      loop
      playsInline
      autoPlay={load}
      preload="none"
      aria-hidden
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
        playing ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ objectPosition: position }}
    />
  );
}
