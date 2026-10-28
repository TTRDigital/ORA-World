"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { id: string; title: ReactNode; content: ReactNode; meta?: ReactNode };

/** Accessible accordion: buttons with aria-expanded, regions, keyboard-native. One open at a time by default. */
export function Accordion({
  items,
  single = true,
  className,
  defaultOpen,
}: {
  items: AccordionItem[];
  single?: boolean;
  className?: string;
  defaultOpen?: string;
}) {
  const base = useId();
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen ? [defaultOpen] : []));
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(single ? [] : prev);
      if (!prev.has(id)) next.add(id);
      else next.delete(id);
      return next;
    });
  return (
    <div className={cn("divide-y divide-rule border-y border-rule", className)}>
      {items.map((it) => {
        const isOpen = open.has(it.id);
        return (
          <div key={it.id} id={it.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${base}-${it.id}`}
                onClick={() => toggle(it.id)}
                className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left transition-colors hover:text-accent-ink"
              >
                <span className="display-s">{it.title}</span>
                <span className="mt-2 flex shrink-0 items-center gap-4">
                  {it.meta}
                  <span aria-hidden className="relative block h-4 w-4">
                    <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                    <span
                      className={cn(
                        "absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        isOpen && "scale-y-0",
                      )}
                    />
                  </span>
                </span>
              </button>
            </h3>
            <div id={`${base}-${it.id}`} role="region" hidden={!isOpen} className="pb-6">
              <div className="max-w-[64ch] space-y-4 text-fg-muted">{it.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
