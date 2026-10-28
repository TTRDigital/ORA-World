"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Route transitions: a bone curtain wipes up on internal navigation, content fades in on arrival.
 * Skipped for modified clicks, external links, hashes, downloads and under reduced motion.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [cover, setCover] = useState(false);
  const pending = useRef<string | null>(null);

  useEffect(() => {
    const reduced = () => document.documentElement.classList.contains("reduced-motion");
    const onClick = (e: MouseEvent) => {
      if (reduced() || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname.startsWith("/studio") || url.pathname.startsWith("/api"))
        return;
      if (url.pathname === location.pathname && url.hash) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      pending.current = url.pathname + url.search + url.hash;
      setCover(true);
      window.setTimeout(() => router.push(pending.current!), 480);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  useEffect(() => {
    if (!cover) return;
    const id = window.setTimeout(() => setCover(false), 350);
    window.scrollTo(0, 0);
    pending.current = null;
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] bg-bg transition-[clip-path] duration-[600ms] ease-[var(--ease-in-out-quart)]"
      style={{ clipPath: cover ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
    />
  );
}
