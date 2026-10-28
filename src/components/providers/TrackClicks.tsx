"use client";

import { useEffect } from "react";
import { track, type EventName } from "@/lib/analytics";

/** Delegated analytics for elements marked data-track="event_name" (links in server components). */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as EventName, {
        href: (el as HTMLAnchorElement).href,
        text: el.textContent?.trim().slice(0, 60),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
