"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent, Incentive } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { coverSizes } from "@/lib/sizes";

type Props = { block: Localized<HomeContent["prosperous"]>; incentives: Localized<Incentive>[] };

/** Incentives as a tabbed reader: a topic list on the left, the published summary and detail on the right. */
export function Prosperous({ block, incentives }: Props) {
  const t = useTranslations("common");
  const base = useId();
  const [active, setActive] = useState(0);
  const item = incentives[active];
  return (
    <section className="bg-surface py-section" aria-labelledby="prosper-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="prosper-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p
            className="col-span-12 mt-6 max-w-[46ch] lead text-fg-muted md:col-span-4 md:col-start-9 md:mt-16"
            data-reveal
          >
            {block.body[0]}
          </p>
        </div>

        <figure className="relative mt-12 aspect-[4/3] overflow-hidden sm:aspect-[21/9] md:mt-16" data-reveal="image">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes={coverSizes(block.image, [
              [640, 100, 21 / 9],
              [0, 100, 4 / 3],
            ])}
            className="object-cover"
            style={{ objectPosition: block.image.position }}
            data-reveal-inner
          />
        </figure>
        {item && (
          <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-20">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={block.eyebrow}
              className="col-span-12 flex flex-col md:col-span-5"
            >
              {incentives.map((inc, i) => (
                <button
                  key={inc.slug}
                  id={`${base}-t${i}`}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls={`${base}-p`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    const d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const next = (active + d + incentives.length) % incentives.length;
                    setActive(next);
                    document.getElementById(`${base}-t${next}`)?.focus();
                  }}
                  className={cn(
                    "group flex cursor-pointer items-center gap-5 border-t border-rule py-5 text-left transition-colors last:border-b",
                    i === active ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  <span className={cn("eyebrow tnum", i === active ? "text-accent-ink" : "")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 display-s">{inc.title}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "h-px bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)]",
                      i === active ? "w-10" : "w-0",
                    )}
                  />
                </button>
              ))}
            </div>
            <div
              id={`${base}-p`}
              role="tabpanel"
              aria-labelledby={`${base}-t${active}`}
              className="col-span-12 border border-rule bg-bg p-6 md:col-span-6 md:col-start-7 md:p-10"
            >
              <p className="eyebrow text-accent-ink tnum">
                {String(active + 1).padStart(2, "0")} / {String(incentives.length).padStart(2, "0")}
              </p>
              <h3 className="mt-4 display-m">{item.title}</h3>
              <p className="mt-5 lead">{item.summary}</p>
              <div className="mt-5 space-y-4 text-fg-muted">
                {item.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8">
                <Button as={Link} href="/incentives">
                  {t("learnMore")}
                  <span className="sr-only"> · {block.eyebrow}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
        <p className="mt-10 max-w-[70ch] border-t border-rule pt-5 small text-fg-muted">{block.disclaimer}</p>
      </div>
    </section>
  );
}
