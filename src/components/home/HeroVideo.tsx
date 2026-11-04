"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { fullBleedSizes } from "@/lib/sizes";

type Props = {
  poster: Localized<ImageRef>;
  mp4: string | null;
  webm: string | null;
  mobileMp4: string | null;
  /** YouTube video id used as the background film when no self-hosted MP4 exists. */
  youtubeId?: string | null;
};

/**
 * Poster first, film after first paint. Self-hosted MP4/WebM when the pipeline has run,
 * otherwise the client's YouTube film as a muted, looping, chromeless background.
 * Poster only on slow connections, data saver, or reduced motion.
 */
export function HeroVideo({ poster, mp4, webm, mobileMp4, youtubeId }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const hasSource = !!(mp4 || webm || youtubeId);

  useEffect(() => {
    if (!hasSource) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /2g/.test(nav.connection?.effectiveType || "");
    if (reduced || slow) return;
    // Mount the film once the page has loaded and the main thread is idle, so the player's
    // script never competes with hydration; the poster carries the first paint meanwhile.
    let timer = 0;
    let idle = 0;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const start = () => {
      timer = window.setTimeout(() => {
        if (w.requestIdleCallback) idle = w.requestIdleCallback(() => setUseVideo(true), { timeout: 1500 });
        else setUseVideo(true);
      }, 600);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
      if (idle) w.cancelIdleCallback?.(idle);
    };
  }, [hasSource]);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const src = isMobile && mobileMp4 ? mobileMp4 : mp4;
  const selfHosted = !!(mp4 || webm);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const yt = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&cc_load_policy=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`
    : null;
  const frame = useRef<HTMLIFrameElement>(null);

  // Hide the poster only once YouTube reports the film is actually playing (state 1);
  // if the embed is blocked or unavailable the poster simply stays. Captions are switched off
  // through the player API because the viewer's own YouTube preference would otherwise turn them on.
  useEffect(() => {
    if (!useVideo || selfHosted || !yt) return;
    const send = (func: string, args: unknown[] = []) =>
      frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
    const silence = () => {
      send("unloadModule", ["captions"]);
      send("unloadModule", ["cc"]);
      send("setOption", ["captions", "track", {}]);
      send("setOption", ["cc", "track", {}]);
      send("mute");
    };
    let last = -1;
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string" || !/youtube/.test(e.origin)) return;
      try {
        const data = JSON.parse(e.data) as { event?: string; info?: { playerState?: number } | number };
        const state = typeof data.info === "object" && data.info ? data.info.playerState : data.info;
        if (data.event === "onReady") {
          silence();
          send("playVideo");
        }
        // The player reloads its caption module whenever the film loops or rebuffers, so switch
        // captions off again on every state change, not only at start-up.
        if (typeof state === "number" && state !== last) {
          last = state;
          silence();
          if (state === 1) setPlaying(true);
        }
      } catch {}
    };
    window.addEventListener("message", onMessage);
    // Keep listening and keep captions off for as long as the film plays (a cheap postMessage);
    // skipped while the tab is hidden.
    const id = window.setInterval(() => {
      if (document.hidden) return;
      frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: "ora-hero" }), "*");
      silence();
    }, 1500);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearInterval(id);
    };
  }, [useVideo, selfHosted, yt]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-basalt">
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        priority
        fetchPriority="high"
        sizes={fullBleedSizes(poster, 1.12)}
        placeholder={poster.blurDataURL ? "blur" : "empty"}
        blurDataURL={poster.blurDataURL}
        className={`object-cover transition-opacity duration-[1600ms] ease-[var(--ease-out-expo)] ${playing ? "opacity-0" : "opacity-100"}`}
        style={{ objectPosition: poster.position }}
      />
      {useVideo && selfHosted && (
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
      {useVideo && !selfHosted && yt && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* 16:9 frame scaled 30% beyond the viewport so the player's title bar and logo are cropped away */}
          <iframe
            ref={frame}
            src={yt}
            title=""
            tabIndex={-1}
            allow="autoplay; encrypted-media; picture-in-picture"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-[1600ms] ${playing ? "opacity-100" : "opacity-0"}`}
            style={{ width: "calc(max(100vw, 177.78vh) * 1.3)", height: "calc(max(100vh, 56.25vw) * 1.3)" }}
          />
        </div>
      )}
      {/* soft vignette keeps type legible whatever frame the film is on */}
      <div className="pointer-events-none absolute inset-0 bg-basalt/15" />
    </div>
  );
}
