"use client";

import { useSyncExternalStore } from "react";

/** Up to three floor plans, persisted in localStorage, for side-by-side comparison. */
const KEY = "ora_shortlist";
export const SHORTLIST_MAX = 3;
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    cache = [];
  }
  return cache!;
}
function write(next: string[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => e.key === KEY && ((cache = null), l());
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
};
const empty: string[] = [];

export function useShortlist() {
  const items = useSyncExternalStore(subscribe, read, () => empty);
  return {
    items,
    has: (slug: string) => items.includes(slug),
    full: items.length >= SHORTLIST_MAX,
    toggle: (slug: string) => {
      const cur = read();
      if (cur.includes(slug)) write(cur.filter((s) => s !== slug));
      else if (cur.length < SHORTLIST_MAX) write([...cur, slug]);
    },
    remove: (slug: string) => write(read().filter((s) => s !== slug)),
    clear: () => write([]),
  };
}
