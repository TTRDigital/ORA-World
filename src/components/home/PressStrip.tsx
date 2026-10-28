import { getTranslations } from "next-intl/server";
import type { PressArticle } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";

/** Slow marquee of headlines from the Press Center. Pauses on hover and under reduced motion. */
export async function PressStrip({ eyebrow, press }: { eyebrow: string; press: Localized<PressArticle>[] }) {
  const h = await getTranslations("home");
  const items = [...press, ...press];
  return (
    <section aria-label={eyebrow} className="border-y border-rule bg-bg-alt py-8">
      <div className="container-x flex items-center justify-between">
        <p className="eyebrow text-accent-ink">{eyebrow}</p>
        <Link href="/press" className="link-underline eyebrow">
          {h("pressCenter")}
        </Link>
      </div>
      <div className="group mt-6 overflow-hidden" dir="ltr">
        <ul
          className="flex w-max gap-16 whitespace-nowrap group-hover:[animation-play-state:paused] motion-safe:animate-[marquee_48s_linear_infinite]"
          aria-hidden={false}
        >
          {items.map((p, i) => (
            <li key={`${p.slug}-${i}`} className="flex items-baseline gap-4" aria-hidden={i >= press.length}>
              <span className="eyebrow text-fg-muted">{p.outlet}</span>
              <Link
                href={`/press/${p.slug}`}
                className="font-display text-2xl italic hover:text-accent-ink"
                tabIndex={i >= press.length ? -1 : 0}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
