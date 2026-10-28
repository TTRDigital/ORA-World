"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";

/** Smooth-scrolls to an in-page target through Lenis (falls back to native scrollIntoView). */
export function ScrollToButton({
  target,
  children,
  variant = "primary",
  className,
}: {
  target: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "dark" | "text";
  className?: string;
}) {
  return (
    <Button
      as="a"
      href={target}
      variant={variant}
      className={className}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = document.querySelector<HTMLElement>(target);
        if (!el) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("ora:scrollto", { detail: { target: el, offset: -80 } }));
        if (
          window.matchMedia("(pointer: coarse)").matches ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.setTimeout(() => el.querySelector<HTMLElement>("input, h2")?.focus({ preventScroll: true }), 900);
      }}
    >
      {children}
    </Button>
  );
}
