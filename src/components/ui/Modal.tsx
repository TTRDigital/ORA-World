"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { lockScroll } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
};

/** Accessible modal: focus trap, Escape, scroll lock, returns focus to the opener. */
export function Modal({ open, onClose, label, children, className, dark = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const t = useTranslations("common");

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = Array.from(
          ref.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, select, textarea, iframe, video, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null || el.tagName === "IFRAME");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    const unlock = lockScroll(true);
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(
      () => ref.current?.querySelector<HTMLElement>("button, [href], video, iframe")?.focus(),
      50,
    );
    return () => {
      unlock();
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
      opener.current?.focus();
    };
  }, [open, onKey]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8",
        dark ? "bg-basalt/95 text-white" : "bg-bone/97 text-fg",
        className,
      )}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex cursor-pointer items-center gap-3 py-2 eyebrow md:top-8 md:right-8"
      >
        <span>{t("closeDialog")}</span>
        <span aria-hidden className="relative block h-4 w-4">
          <span className="absolute inset-x-0 top-1/2 h-px rotate-45 bg-current" />
          <span className="absolute inset-x-0 top-1/2 h-px -rotate-45 bg-current" />
        </span>
      </button>
      {children}
    </div>
  );
}
