import Image from "next/image";
import type { Locale } from "@/content/types";
import { portfolio } from "@/content/seed/portfolio";
import { Link } from "@/i18n/navigation";

/** The twelve ORA World locations as listed on oraworld.com, with the client's gold-ringed thumbnails. */
export function Portfolio({ locale }: { locale: Locale }) {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {portfolio.map((p) => {
        const inner = (
          <>
            <span className="relative mx-auto block aspect-square w-full max-w-[180px]">
              {p.thumb ? (
                <Image
                  src={p.thumb}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              ) : (
                <span aria-hidden className="absolute inset-0 rounded-full border border-accent" />
              )}
            </span>
            <span className="mt-5 block text-center">
              <span className="block display-s transition-colors group-hover:text-accent-ink">{p.name}</span>
              <span className="mt-1 block small text-fg-muted">{p.tagline[locale]}</span>
            </span>
          </>
        );
        return (
          <li key={p.slug}>
            {p.href ? (
              <Link href={p.href} className="group block">
                {inner}
              </Link>
            ) : (
              <div className="group">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
