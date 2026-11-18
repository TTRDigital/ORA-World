import { getTranslations } from "next-intl/server";
import type { Locale } from "@/content/types";
import { book } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { ArrowIcon } from "@/components/ui/Icons";

/** "Why ORA World": four reasons in one band (copy from ORA World v2), each leading to its page. */
export async function WhyOra({ locale }: { locale: Locale }) {
  const t = await getTranslations("home.why");
  const cards = [
    { k: "travel", image: book.jet, href: "/amenities#private-travel" },
    { k: "longevity", image: book.gym, href: "/longevity" },
    { k: "finishes", image: book.kitchenFinish, href: "/finishes" },
    { k: "act60", image: book.aerialCoast, href: "/incentives" },
  ] as const;
  return (
    <section className="py-section" aria-labelledby="why-title">
      <div className="container-x">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 id="why-title" className="mt-6 max-w-[22ch] display-l" data-reveal>
          <Accent text={t("title")} />
        </h2>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <li key={c.k} data-reveal data-delay={i * 0.08}>
              <Link href={c.href} className="group block">
                <Picture
                  image={localize(c.image, locale)}
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                  aspect="4/5"
                  showCaption={false}
                />
                <h3 className="mt-5 display-s transition-colors group-hover:text-accent-ink">{t(`${c.k}.title`)}</h3>
                <p className="mt-2 text-fg-muted">{t(`${c.k}.text`)}</p>
                <span className="mt-4 inline-flex items-center gap-2 eyebrow text-accent-ink">
                  {t(`${c.k}.cta`)}
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
