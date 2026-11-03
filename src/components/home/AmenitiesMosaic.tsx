"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Amenity, AmenityCategory, HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { RailProgress } from "@/components/ui/Rail";
import { coverSizes } from "@/lib/sizes";

const CATS: AmenityCategory[] = ["wellness", "family", "pets", "resort", "eco"];
const SHAPES = [
  "md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-4 aspect-[4/5]",
  "md:col-span-4 aspect-[4/5]",
  "md:col-span-4 aspect-[4/5]",
];

/** Staggered mosaic with category tabs; re-flows with a FLIP animation (GSAP Flip). */
export function AmenitiesMosaic({
  block,
  amenities,
}: {
  block: Localized<HomeContent["amenities"]>;
  amenities: Localized<Amenity>[];
}) {
  const t = useTranslations("amenityCat");
  const c = useTranslations("common");
  const h = useTranslations("home");
  const [active, setActive] = useState<AmenityCategory | "all">("all");
  const grid = useRef<HTMLUListElement>(null);
  const pending = useRef<unknown>(null);

  const items = (
    active === "all"
      ? amenities.filter((a) => a.featured).concat(amenities.filter((a) => !a.featured))
      : amenities.filter((a) => a.category === active)
  ).slice(0, 6);

  async function select(cat: AmenityCategory | "all") {
    if (cat === active) return;
    const el = grid.current;
    const reduced = document.documentElement.classList.contains("reduced-motion");
    if (el && !reduced) {
      const { Flip } = await import("gsap/Flip");
      const { gsap } = await import("@/lib/gsap");
      gsap.registerPlugin(Flip);
      pending.current = Flip.getState(el.querySelectorAll("li"));
    }
    setActive(cat);
  }

  useLayoutEffect(() => {
    const state = pending.current;
    const el = grid.current;
    if (!state || !el) return;
    pending.current = null;
    import("gsap/Flip").then(({ Flip }) => {
      Flip.from(state as Parameters<typeof Flip.from>[0], {
        duration: 0.9,
        ease: "expo.out",
        absolute: true,
        stagger: 0.03,
        onEnter: (els) =>
          el &&
          (window as unknown as { gsap?: typeof import("gsap").gsap }).gsap?.fromTo(
            els,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.8 },
          ),
        onLeave: (els) => els.forEach((e) => ((e as HTMLElement).style.opacity = "0")),
      });
    });
  }, [active]);

  return (
    <section id="amenities" className="py-section" aria-labelledby="amenities-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="amenities-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p
            className="col-span-12 mt-6 max-w-[44ch] lead text-fg-muted md:col-span-5 md:col-start-8 md:mt-16"
            data-reveal
          >
            {block.intro}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={block.eyebrow}
          className="-mx-[var(--gutter)] mt-12 flex [scrollbar-width:none] gap-x-8 gap-y-3 overflow-x-auto border-b border-rule px-[var(--gutter)] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {(["all", ...CATS] as const).map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => select(cat)}
              className={cn(
                "relative shrink-0 cursor-pointer py-4 eyebrow transition-colors",
                active === cat ? "text-accent-ink" : "text-fg-muted hover:text-fg",
              )}
            >
              {cat === "all" ? h("filterAll") : t(cat)}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-px h-px bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  active === cat ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>

        <div role="tabpanel" aria-label={active === "all" ? h("filterAll") : t(active)}>
          <ul
            ref={grid}
            className="mt-8 grid grid-cols-1 gap-5 max-md:-mx-[var(--gutter)] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:scroll-px-[var(--gutter)] max-md:[scrollbar-width:none] max-md:gap-3 max-md:overflow-x-auto max-md:px-[var(--gutter)] md:mt-10 md:grid-cols-12 max-md:[&::-webkit-scrollbar]:hidden"
          >
            {items.map((a, i) => (
              <li
                key={a.slug}
                data-flip-id={a.slug}
                className={cn(
                  "group relative overflow-hidden bg-surface max-md:h-[27rem] max-md:w-[78vw] max-md:shrink-0 max-md:snap-start",
                  SHAPES[i],
                )}
              >
                <Link
                  href={{ pathname: "/amenities", hash: a.slug }}
                  className="block h-full w-full"
                  data-cursor="view"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={a.image.src}
                      alt={a.image.alt}
                      fill
                      sizes={coverSizes(a.image, [
                        [768, 50, 1],
                        [0, 78, 0.7],
                      ])}
                      className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      style={{ objectPosition: a.image.position }}
                      placeholder={a.image.blurDataURL ? "blur" : "empty"}
                      blurDataURL={a.image.blurDataURL}
                    />
                    <div className="absolute inset-0 scrim-bottom" />
                  </div>
                  <div className="relative flex h-full min-h-[14rem] flex-col justify-end p-5 text-white md:p-6">
                    <span className="eyebrow text-brass-light">{t(a.category)}</span>
                    <h3 className="mt-2 display-s">{a.name}</h3>
                    <p className="mt-2 max-w-[36ch] small text-white/80 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 md:opacity-0">
                      {a.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <RailProgress target={grid} count={items.length} />
        </div>
        <div className="mt-12" data-reveal>
          <Button as={Link} href="/amenities">
            {c("viewAll")}
            <span className="sr-only"> · {block.eyebrow}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
