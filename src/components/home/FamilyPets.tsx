"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type Block = Localized<HomeContent["family"]>;
/** Amenity names per tab, resolved on the server so the client bundle carries names, not whole records. */
type Props = { family: Block; pets: Block; related: { family: string[]; pets: string[] } };

/**
 * Family and pets as one switchable story: a segmented control swaps the image, the copy and the
 * amenities that belong to each (taken from the amenity list, so nothing is restated by hand).
 */
export function FamilyPets({ family, pets, related: names }: Props) {
  const t = useTranslations("common");
  const base = useId();
  const tabs = [
    { b: family, names: names.family },
    { b: pets, names: names.pets },
  ];
  const [active, setActive] = useState(0);
  const { b } = tabs[active];
  const related = tabs[active].names.slice(0, 4);

  return (
    <section className="bg-bg-alt py-section" aria-labelledby={`${base}-title`}>
      <div className="container-x grid grid-cols-12 items-center gap-x-6 gap-y-12">
        <div className="relative col-span-12 lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden">
            {tabs.map(({ b: tb }, i) => (
              <Image
                key={i}
                src={tb.image.src}
                alt={i === active ? tb.image.alt : ""}
                aria-hidden={i !== active}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                placeholder={tb.image.blurDataURL ? "blur" : "empty"}
                blurDataURL={tb.image.blurDataURL}
                className={cn(
                  "object-cover transition-[opacity,transform] duration-[1000ms] ease-[var(--ease-out-expo)]",
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                )}
                style={{ objectPosition: tb.image.position }}
              />
            ))}
          </div>
          <div
            role="tablist"
            aria-label={`${family.eyebrow} · ${pets.eyebrow}`}
            className="absolute top-4 left-4 flex rounded-full bg-bone/95 p-1 text-basalt shadow-sm"
          >
            {tabs.map(({ b: tb }, i) => (
              <button
                key={i}
                id={`${base}-t${i}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls={`${base}-p`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  e.preventDefault();
                  const next = active === 0 ? 1 : 0;
                  setActive(next);
                  document.getElementById(`${base}-t${next}`)?.focus();
                }}
                className={cn(
                  "min-h-10 cursor-pointer rounded-full px-5 text-[11px] tracking-[0.12em] uppercase transition-colors",
                  i === active ? "bg-basalt text-white" : "hover:bg-travertine",
                )}
              >
                {tb.eyebrow}
              </button>
            ))}
          </div>
        </div>

        <div
          id={`${base}-p`}
          role="tabpanel"
          aria-labelledby={`${base}-t${active}`}
          className="col-span-12 lg:col-span-5"
        >
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <h2 id={`${base}-title`} className="mt-5 display-l">
            <Accent text={b.title} />
          </h2>
          {b.body.map((p, j) => (
            <p key={`${active}-${j}`} className="mt-5 max-w-[48ch] text-fg-muted">
              {p}
            </p>
          ))}
          {related.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {related.map((name) => (
                <li key={name} className="flex items-center gap-3 border border-rule bg-bg px-4 py-3 small">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          )}
          <Button as={Link} href="/lifestyle" variant="text" className="mt-8">
            {t("learnMore")}
            <span className="sr-only"> · {b.eyebrow}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
