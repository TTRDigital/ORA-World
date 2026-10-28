"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

const KEY = "ora_exit_offer";

/** Soft exit-intent brochure offer: desktop only, never in the first 20 s, once per session, dismissible. */
export function ExitIntent() {
  const t = useTranslations("exit");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;
    let shown = false;
    try {
      shown = !!sessionStorage.getItem(KEY);
    } catch {}
    if (shown) return;
    let armed = false;
    const arm = window.setTimeout(() => (armed = true), 20_000);
    const onLeave = (e: MouseEvent) => {
      if (!armed || e.clientY > 8 || e.relatedTarget) return;
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setOpen(true);
      track("brochure_download", { source: "exit_intent_offer" });
      document.removeEventListener("mouseout", onLeave);
    };
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(arm);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <Modal open={open} onClose={() => setOpen(false)} label={t("title")} dark={false}>
      <div className="max-w-xl border border-rule bg-bg p-10 text-fg">
        <p className="eyebrow text-accent-ink">{t("title")}</p>
        <h2 className="display-m mt-4">{t("text")}</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button as={Link} href="/residences#brochure" onClick={() => setOpen(false)}>{t("cta")}</Button>
          <Button variant="text" onClick={() => setOpen(false)}>{t("dismiss")}</Button>
        </div>
      </div>
    </Modal>
  );
}
