import Image from "next/image";
import type { Collection } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { ArrowIcon } from "@/components/ui/Icons";
import { scaleSizes } from "@/lib/sizes";

/**
 * Residences opener lane: one rounded frame per collection. Desktop: a row where the hovered (or
 * focused) frame widens and tells its story, the first frame open by default. Mobile: a swipe rail.
 * Pure CSS: no scroll effects, images sit inside their frames.
 */
export function CollectionLane({
  collections,
  planCounts,
  plansLabel,
}: {
  collections: Localized<Collection>[];
  planCounts: Record<string, number>;
  plansLabel: string;
}) {
  return (
    <ul className="group/lane -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] md:mx-0 md:h-[clamp(360px,48vh,540px)] md:snap-none md:overflow-visible md:px-0 md:pb-0">
      {collections.map((c, i) => {
        const img = c.hoverImage ?? c.image;
        return (
          <li
            key={c.slug}
            data-reveal
            data-delay={0.15 + i * 0.08}
            className="relative aspect-[4/5] w-[78vw] shrink-0 snap-start md:aspect-auto md:w-auto md:min-w-0 md:flex-1 md:transition-[flex-grow] md:duration-[900ms] md:ease-[cubic-bezier(0.65,0.05,0.36,1)] md:first:flex-[2.6] md:group-hover/lane:first:flex-1 md:group-focus-within/lane:first:flex-1 md:hover:!flex-[2.6] md:focus-within:!flex-[2.6]"
          >
            <Link
              href={`/residences/${c.slug}`}
              className="group/frame relative block h-full overflow-hidden rounded-[1.25rem] bg-basalt text-white"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={scaleSizes("(min-width: 768px) 46vw, 78vw", img, 4 / 5)}
                quality={65}
                priority={i === 0}
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover/frame:scale-[1.05]"
                style={{ objectPosition: img.position }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-basalt/85 via-basalt/25 to-transparent" />
              <span className="absolute top-5 left-5 grid h-10 w-10 place-items-center rounded-full border border-white/60 font-display text-sm tnum backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Container queries: the story shows once a frame is wide enough (the open one) */}
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 @container md:p-7">
                <span className="min-w-0">
                  <span className="block font-display text-[1.6rem] leading-tight md:text-[1.35rem] md:@min-[20rem]:text-[2rem]">
                    {c.name}
                  </span>
                  <span className="mt-2 block max-w-[38ch] text-sm text-white/85 transition-opacity duration-500 md:@max-[20rem]:invisible md:@max-[20rem]:opacity-0 md:@min-[20rem]:delay-300">
                    {c.tagline}
                    <span className="mt-2 block eyebrow text-brass-light">
                      {planCounts[c.slug] ?? 0} · {plansLabel}
                    </span>
                  </span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-colors duration-300 group-hover/frame:bg-brass-light group-hover/frame:text-basalt md:@max-[20rem]:hidden">
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
