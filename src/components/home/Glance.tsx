import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { HomeContent, Stat } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

type Props = { block: Localized<HomeContent["glance"]>; stats: Localized<Stat>[] };

/**
 * Tesoro Del Mar at a glance: the published facts as a ticking checklist beside a layered
 * aerial rendering, with the headline figures floating over the image.
 */
export async function Glance({ block, stats }: Props) {
  const t = await getTranslations("common");
  const h = await getTranslations("home");
  const chips = stats.filter((s) => s.value !== null).slice(0, 3);
  return (
    <section className="overflow-hidden bg-bg-alt py-section" aria-labelledby="glance-title">
      <div className="container-x grid grid-cols-12 items-center gap-x-6 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 id="glance-title" className="mt-6 display-l" data-reveal>
            <Accent text={block.title} />
          </h2>
          <p className="mt-6 max-w-[46ch] lead text-fg-muted" data-reveal>
            {block.body}
          </p>
          <ul className="mt-10 divide-y divide-rule border-y border-rule">
            {block.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-4 py-4" data-reveal data-delay={0.05 * i}>
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4" data-reveal>
            <Button as={Link} href="/tesoro-del-mar" variant="dark">
              {h("discoverTesoro")}
            </Button>
            <Button as={Link} href="/floor-plans" variant="text">
              {h("allPlans")}
            </Button>
          </div>
        </div>

        <div className="relative col-span-12 lg:col-span-7">
          <figure className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:ml-10" data-reveal="image">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              placeholder={block.image.blurDataURL ? "blur" : "empty"}
              blurDataURL={block.image.blurDataURL}
              className="object-cover"
              style={{ objectPosition: block.image.position }}
              data-reveal-inner
            />
            <figcaption className="absolute right-3 bottom-3 text-[10px] tracking-[0.14em] text-white/85 uppercase">
              {t("rendering")}
            </figcaption>
          </figure>

          <div
            className="relative -mt-24 ml-4 w-[62%] max-w-[360px] border-[6px] border-bg-alt shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)] sm:-mt-32 lg:absolute lg:bottom-[-3rem] lg:left-[-1rem] lg:mt-0 lg:ml-0"
            data-reveal
            data-delay="0.2"
          >
            <span className="relative block aspect-[4/3]">
              <Image
                src={block.inset.src}
                alt={block.inset.alt}
                fill
                sizes="360px"
                className="object-cover"
                style={{ objectPosition: block.inset.position }}
              />
            </span>
          </div>

          <ul className="absolute top-5 right-5 flex flex-col items-end gap-2 lg:top-8 lg:right-8">
            {chips.map((s, i) => (
              <li
                key={i}
                className="flex items-baseline gap-2 rounded-full bg-bone/95 px-4 py-2 text-basalt shadow-sm backdrop-blur"
                data-reveal
                data-delay={0.3 + i * 0.1}
              >
                <span
                  className="font-display text-xl tnum"
                  data-counter={s.value ?? 0}
                  data-prefix={s.prefix || ""}
                  data-suffix={s.suffix || ""}
                >
                  {s.prefix}
                  {(s.value ?? 0).toLocaleString("en-US")}
                  {s.suffix}
                </span>
                <span className="text-[11px] tracking-[0.12em] uppercase">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
