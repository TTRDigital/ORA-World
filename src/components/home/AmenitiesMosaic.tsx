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

const CATS: AmenityCategory[] = ["wellness", "family", "pets", "resort", "eco"];
const SHAPES = ["md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto", "md:col-span-5 aspect-[4/3]", "md:col-span-5 aspect-[4/3]", "md:col-span-4 aspect-[4/5]", "md:col-span-4 aspect-[4/5]", "md:col-span-4 aspect-[4/5]"];

/** Staggered mosaic with category tabs; re-flows with a FLIP animation (GSAP Flip). */
export function AmenitiesMosaic({ block, amenities }: { block: Localized<HomeContent["amenities"]>; amenities: Localized<Amenity>[] }) {
  const t = useTranslations("amenityCat");
  const c = useTranslations("common");
  const h = useTranslations("home");
  const [active, setActive] = useState<AmenityCategory | "all">("all");
  const grid = useRef<HTMLUListElement>(null);
  const pending = useRef<unknown>(null);

  const items = (active === "all" ? amenities.filter((a) => a.featured).concat(amenities.filter((a) => !a.featured)) : amenities.filter((a) => a.category === active)).slice(0, 6);

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
        onEnter: (els) => el && (window as unknown as { gsap?: typeof import("gsap").gsap }).gsap?.fromTo(els, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.8 }),
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
            <h2 id="amenities-title" className="display-l mt-6" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p className="lead col-span-12 mt-6 max-w-[44ch] text-fg-muted md:col-span-5 md:col-start-8 md:mt-16" data-reveal>
            {block.intro}
          </p>
        </div>

        <div role="tablist" aria-label={block.eyebrow} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-rule">
          {(["all", ...CATS] as const).map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => select(cat)}
              className={cn("eyebrow relative cursor-pointer py-4 transition-colors", active === cat ? "text-accent-ink" : "text-fg-muted hover:text-fg")}
            >
              {cat === "all" ? h("filterAll") : t(cat)}
              <span aria-hidden className={cn("absolute inset-x-0 -bottom-px h-px bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)]", active === cat ? "scale-x-100" : "scale-x-0")} />
            </button>
          ))}
        </div>

        <ul ref={grid} className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12" role="tabpanel">
          {items.map((a, i) => (
            <li key={a.slug} data-flip-id={a.slug} className={cn("group relative overflow-hidden bg-surface", SHAPES[i])}>
              <Link href={{ pathname: "/amenities", hash: a.slug }} className="block h-full w-full">
                <div className="absolute inset-0">
                  <Image src={a.image.src} alt={a.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" placeholder={a.image.blurDataURL ? "blur" : "empty"} blurDataURL={a.image.blurDataURL} />
                  <div className="scrim-bottom absolute inset-0" />
                </div>
                <div className="relative flex h-full min-h-[14rem] flex-col justify-end p-5 text-white md:p-6">
                  <span className="eyebrow text-brass-light">{t(a.category)}</span>
                  <h3 className="display-s mt-2">{a.name}</h3>
                  <p className="small mt-2 max-w-[36ch] text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">{a.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12" data-reveal>
          <Button as={Link} href="/amenities">
            {c("viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
}
