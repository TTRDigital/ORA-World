"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { ImageRef } from "@/content/types";
import { Link, usePathname } from "@/i18n/navigation";
import { ArrowIcon } from "@/components/ui/Icons";

export type NextItem = { path: string; label: string; image: ImageRef & { altText: string } };

/**
 * End-of-page "Next" teaser: a framed rendering that opens to full width as it scrolls into view, with
 * the next page's name set large over it. The whole block is the link. Hidden on the homepage and legal pages.
 */
export function NextPage({ items }: { items: NextItem[] }) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const root = useRef<HTMLAnchorElement>(null);
  const idx = items.findIndex((it) => pathname === it.path || pathname.startsWith(it.path + "/"));
  const next = idx >= 0 ? items[(idx + 1) % items.length] : null;

  useEffect(() => {
    const el = root.current;
    if (!el || document.documentElement.classList.contains("reduced-motion")) return;
    let kill: (() => void) | undefined;
    import("@/lib/gsap").then(({ gsap }) => {
      const frame = el.querySelector<HTMLElement>("[data-frame]");
      const pic = el.querySelector<HTMLElement>("[data-pic]");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.5 },
      });
      tl.fromTo(
        frame,
        { clipPath: "inset(10% 8% 10% 8% round 28px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)" },
        0,
      ).fromTo(pic, { scale: 1.15 }, { scale: 1 }, 0);
      kill = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => kill?.();
  }, [next?.path]);

  if (!next) return null;
  return (
    <Link
      ref={root}
      href={next.path}
      className="group relative block h-[80vh] min-h-[460px] overflow-hidden bg-bg"
      data-cursor="explore"
    >
      <div data-frame className="absolute inset-0 overflow-hidden">
        <div data-pic className="absolute inset-0 will-change-transform">
          <Image
            src={next.image.src}
            alt={next.image.altText}
            fill
            sizes="(max-aspect-ratio: 16/9) 180vh, 100vw"
            className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            style={{ objectPosition: next.image.position }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-basalt/80 via-basalt/30 to-basalt/10" />
        <div className="absolute inset-x-0 bottom-0 container-x pb-12 text-white md:pb-16">
          <p className="eyebrow text-brass-light">{t("nextPage")}</p>
          <p className="mt-4 flex items-end justify-between gap-6">
            <span className="display-xl text-white">{next.label}</span>
            <span className="mb-3 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-basalt transition-transform duration-500 group-hover:translate-x-2 md:h-20 md:w-20">
              <ArrowIcon className="h-6 w-6" />
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
