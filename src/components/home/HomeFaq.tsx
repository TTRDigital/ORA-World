"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Faq, HomeContent, ImageRef } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ScrollToButton } from "@/components/ui/ScrollToButton";
import { cn } from "@/lib/utils";

type Advisor = { name: string; role: string; portrait: Localized<ImageRef> } | null;
type Props = { block: Localized<HomeContent["faq"]>; faqs: Localized<Faq>[]; advisor: Advisor };
type Msg = { from: "you" | "ora"; text: string; typing?: boolean };

/**
 * Questions as a conversation. Tapping a question adds it as a message, a typing indicator follows, and
 * the published FAQ answer arrives. The first exchange plays on its own when the section comes into view.
 * Every answer is the FAQ text, word for word; the full list lives on /faq.
 */
export function HomeFaq({ block, faqs, advisor }: Props) {
  const t = useTranslations("home");
  const c = useTranslations("common");
  const picked = block.slugs.map((s) => faqs.find((f) => f.slug === s)).filter(Boolean) as Localized<Faq>[];
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [asked, setAsked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const root = useRef<HTMLElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const ask = (f: Localized<Faq>) => {
    if (busy || asked.includes(f.slug)) return;
    setBusy(true);
    setAsked((a) => [...a, f.slug]);
    setMsgs((m) => [...m, { from: "you", text: f.question }, { from: "ora", text: "", typing: true }]);
    timers.current.push(
      window.setTimeout(() => {
        setMsgs((m) => [...m.slice(0, -1), { from: "ora", text: f.answer[0] }]);
        setBusy(false);
      }, 1100),
    );
  };

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);

  // Play the first question once, when the section is first seen.
  useEffect(() => {
    const el = root.current;
    if (!el || !picked[0]) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          ask(picked[0]);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  return (
    <section ref={root} className="bg-bg-alt py-section" aria-labelledby="faq-title">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="mt-6 display-l" data-reveal>
            <Accent text={block.title} />
          </h2>

          {advisor && (
            <div className="mt-10 rounded-[1.5rem] bg-basalt p-6 text-white shadow-[0_30px_60px_-36px_rgba(0,0,0,.8)] md:p-7">
              <div className="flex items-center gap-4">
                <Image
                  src={advisor.portrait.src}
                  alt={advisor.portrait.alt}
                  width={56}
                  height={56}
                  sizes="56px"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-brass-light"
                />
                <div>
                  <p className="font-display text-lg font-semibold">{advisor.name}</p>
                  <p className="text-[13px] text-white/70">{advisor.role}</p>
                </div>
              </div>
              <ol className="mt-6 flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] text-white/80 uppercase">
                {[t("stepInquiry"), t("stepPresentation"), t("stepVisit")].map((s, k) => (
                  <li key={k} className="flex flex-1 items-center gap-2">
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                        k === 0 ? "border-brass-light bg-brass-light text-basalt" : "border-white/30",
                      )}
                    >
                      {k + 1}
                    </span>
                    <span className="truncate">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <ScrollToButton target="#inquire" variant="light">
                  {c("requestPresentation")}
                </ScrollToButton>
                <Button as={Link} href="/faq" variant="text" className="text-white">
                  {t("allQuestions")}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Chat */}
        <div className="col-span-12 lg:col-span-7">
          <div className="flex h-[34rem] flex-col overflow-hidden rounded-[1.75rem] border border-rule bg-bg shadow-[0_40px_80px_-50px_rgba(28,27,25,.6)] md:h-[38rem]">
            <div className="flex items-center justify-between border-b border-rule px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-basalt font-display text-[11px] font-semibold text-brass-light">
                  ORA
                  <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-bg bg-palm-light" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold">ORA World</p>
                  <p className="text-[12px] text-fg-muted">{t("answersFromFaq")}</p>
                </div>
              </div>
            </div>
            <div ref={log} className="flex-1 space-y-3 overflow-y-auto px-5 py-5" aria-live="polite">
              {msgs.map((m, k) => (
                <div key={k} className={cn("flex", m.from === "you" ? "justify-end" : "justify-start")}>
                  <p
                    className={cn(
                      "max-w-[85%] animate-[bubblein_.45s_var(--ease-out-expo)_both] rounded-[1.25rem] px-4 py-3 text-[15px] leading-relaxed",
                      m.from === "you" ? "rounded-br-md bg-basalt text-white" : "rounded-bl-md bg-surface text-fg",
                    )}
                  >
                    {m.typing ? (
                      <span className="flex gap-1 py-1" aria-label={t("typing")}>
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-2 w-2 animate-[typing_1s_infinite] rounded-full bg-fg-muted"
                            style={{ animationDelay: `${d * 0.15}s` }}
                          />
                        ))}
                      </span>
                    ) : (
                      m.text
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-rule px-4 py-4">
              <p className="mb-3 px-1 text-[12px] font-semibold text-fg-muted">{t("tapQuestion")}</p>
              <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 md:flex-wrap [&::-webkit-scrollbar]:hidden">
                {picked.map((f) => (
                  <button
                    key={f.slug}
                    type="button"
                    onClick={() => ask(f)}
                    disabled={asked.includes(f.slug)}
                    className="min-h-11 shrink-0 cursor-pointer rounded-full border border-rule bg-bg px-4 py-2 text-[13px] font-medium transition-colors hover:border-fg disabled:cursor-default disabled:opacity-40"
                  >
                    {f.question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes bubblein{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}@keyframes typing{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}`}</style>
    </section>
  );
}
