"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";

type Props = { poster: Localized<ImageRef>; mp4: string | null; webm: string | null; mobileMp4: string | null };

/**
 * Poster first, video after first paint. Muted, inline, looping.
 * Poster only on slow connections, data saver, or reduced motion.
 */
export function HeroVideo({ poster, mp4, webm, mobileMp4 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!mp4 && !webm) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /2g/.test(nav.connection?.effectiveType || "");
    if (reduced || slow) return;
    const id = window.requestIdleCallback ? window.requestIdleCallback(() => setUseVideo(true)) : window.setTimeout(() => setUseVideo(true), 300);
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(id as number) : window.clearTimeout(id as number));
  }, [mp4, webm]);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const src = isMobile && mobileMp4 ? mobileMp4 : mp4;

  return (
    <div className="absolute inset-0 overflow-hidden bg-basalt">
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        placeholder={poster.blurDataURL ? "blur" : "empty"}
        blurDataURL={poster.blurDataURL}
        className={`object-cover transition-opacity duration-[1200ms] ${playing ? "opacity-0" : "opacity-100"}`}
      />
      {useVideo && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
        >
          {webm && !isMobile && <source src={webm} type="video/webm" />}
          {src && <source src={src} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
