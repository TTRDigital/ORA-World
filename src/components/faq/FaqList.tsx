"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Faq } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

/** Searchable accordion grouped by topic. */
export function FaqList({ faqs }: { faqs: Localized<Faq>[] }) {
  const t = useTranslations("pages.faq");
  const c = useTranslations("common");
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("all");
  const topics = useMemo(() => Array.from(new Set(faqs.map((f) => f.topic))), [faqs]);
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  const shown = faqs.filter((f) => (topic === "all" || f.topic === topic) && (!q || norm(f.question + " " + f.answer.join(" ")).includes(norm(q))));
  const groups = topics.map((tp) => ({ topic: tp, items: shown.filter((f) => f.topic === tp) })).filter((g) => g.items.length);
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <aside className="col-span-12 md:col-span-4">
        <label htmlFor="faq-search" className="sr-only">{c("search")}</label>
        <input id="faq-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPlaceholder")} className="w-full border-0 border-b border-rule-strong bg-transparent py-3 text-[16px] focus:border-accent focus:outline-none" />
        <p className="eyebrow mt-8 text-fg-muted">{t("topics")}</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 md:flex-col">
          {["all", ...topics].map((tp) => (
            <li key={tp}><button type="button" onClick={() => setTopic(tp)} aria-pressed={topic === tp} className={cn("cursor-pointer py-1 text-left transition-colors", topic === tp ? "text-accent-ink" : "text-fg-muted hover:text-fg")}>{tp === "all" ? c("all") : tp}</button></li>
          ))}
        </ul>
      </aside>
      <div className="col-span-12 md:col-span-7 md:col-start-6">
        {groups.length === 0 ? (
          <p className="text-fg-muted">{c("noResults")}</p>
        ) : (
          groups.map((g) => (
            <div key={g.topic} className="mb-14">
              <h2 className="eyebrow mb-4 text-accent-ink">{g.topic}</h2>
              <Accordion items={g.items.map((f) => ({ id: f.slug, title: f.question, content: f.answer.map((p, i) => <p key={i}>{p}</p>) }))} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
