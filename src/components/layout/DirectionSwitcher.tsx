"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DIRECTIONS, DIRECTION_NAMES, type Direction } from "@/lib/direction";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

/** Staging-only: switch between the three homepage directions. */
export function DirectionSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Direction>("a");

  useEffect(() => {
    const m = document.cookie.match(/(?:^|; )ora_direction=([abc])/);
    if (m) setCurrent(m[1] as Direction);
  }, []);

  function pick(d: Direction) {
    document.cookie = `ora_direction=${d}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
    document.documentElement.dataset.direction = d;
    track("direction_switch", { direction: d });
    setCurrent(d);
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="fixed bottom-6 left-6 z-30 hidden md:block print:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="eyebrow cursor-pointer border border-rule bg-bg/90 px-4 py-2 text-fg backdrop-blur-sm"
      >
        Direction {current.toUpperCase()}
      </button>
      {open && (
        <ul className="absolute bottom-full left-0 mb-2 w-56 border border-rule bg-bg text-fg">
          {DIRECTIONS.map((d) => (
            <li key={d}>
              <button
                type="button"
                onClick={() => pick(d)}
                className={cn("small flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left hover:bg-bg-alt", d === current && "text-accent-ink")}
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
