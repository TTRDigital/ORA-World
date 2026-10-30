"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DIRECTIONS, DIRECTION_NAMES, type Direction } from "@/lib/direction";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

function applyDirection(d: Direction) {
  document.cookie = `ora_direction=${d}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
  document.documentElement.dataset.direction = d;
}

/** Staging-only: switch between the three homepage directions. */
export function DirectionSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Direction>("a");

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const m = document.cookie.match(/(?:^|; )ora_direction=([abc])/);
      if (m) setCurrent(m[1] as Direction);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  function pick(d: Direction) {
    applyDirection(d);
    track("direction_switch", { direction: d });
    setCurrent(d);
    setOpen(false);
    const locale = location.pathname.split("/")[1] || "en";
    const onHome = /^\/(en|es)\/?$/.test(location.pathname);
    if (onHome) router.push(`/${locale}?direction=${d}`);
    router.refresh();
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-30 hidden -translate-x-1/2 opacity-80 hover:opacity-100 md:block print:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cursor-pointer border border-rule bg-bg/90 px-4 py-2 eyebrow text-fg backdrop-blur-sm"
      >
        Direction {current.toUpperCase()}
      </button>
      {open && (
        <ul className="absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 border border-rule bg-bg text-fg">
          {DIRECTIONS.map((d) => (
            <li key={d}>
              <button
                type="button"
                onClick={() => pick(d)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left small hover:bg-bg-alt",
                  d === current && "text-accent-ink",
                )}
              >
                <span>{DIRECTION_NAMES[d]}</span>
                <span className="eyebrow">{d.toUpperCase()}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
