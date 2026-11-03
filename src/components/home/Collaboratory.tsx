import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { HomeContent, TeamMember } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { coverSizes } from "@/lib/sizes";

export async function Collaboratory({
  block,
  team,
}: {
  block: Localized<HomeContent["team"]>;
  team: Localized<TeamMember>[];
}) {
  const h = await getTranslations("home");
  return (
    <section className="py-section" aria-labelledby="team-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="team-title" className="mt-6 display-l" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p
            className="col-span-12 mt-6 max-w-[40ch] lead text-fg-muted md:col-span-5 md:col-start-8 md:mt-16"
            data-reveal
          >
            {block.intro}
          </p>
        </div>
        {/* Confirmed members get a portrait card; disciplines still being appointed read as a numbered roster
            instead of empty silhouettes. */}
        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10">
          {team
            .filter((m) => !m.placeholder)
            .slice(0, 1)
            .map((m) => (
              <article key={m.slug} className="col-span-12 grid gap-6 sm:grid-cols-2 lg:col-span-7" data-reveal>
                <figure className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image
                    src={m.portrait.src}
                    alt={m.portrait.alt}
                    fill
                    sizes={coverSizes(m.portrait, [
                      [1024, 30, 4 / 5],
                      [640, 50, 4 / 5],
                      [0, 100, 4 / 5],
                    ])}
                    className="object-cover"
                    style={{ objectPosition: m.portrait.position }}
                  />
                </figure>
                <div className="flex flex-col justify-end">
                  <p className="eyebrow text-accent-ink">{m.discipline}</p>
                  <h3 className="mt-3 display-m">{m.name}</h3>
                  <p className="mt-2 small text-fg-muted">{m.role}</p>
                  {m.quote && (
                    <blockquote className="mt-6 border-l border-accent pl-5 font-display text-xl text-fg/85 italic">
                      “{m.quote}”
                    </blockquote>
                  )}
                </div>
              </article>
            ))}
          <ol className="col-span-12 self-end border-t border-rule lg:col-span-4 lg:col-start-9">
            {team
              .filter((m) => m.placeholder)
              .map((m, i) => (
                <li
                  key={m.slug}
                  className="flex items-baseline gap-5 border-b border-rule py-5"
                  data-reveal
                  data-delay={i * 0.06}
                >
                  <span className="eyebrow text-accent-ink tnum">{String(i + 2).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className="block display-s">{m.discipline}</span>
                    <span className="mt-1 block small text-fg-muted">{m.role}</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-rule px-3 py-1 text-[11px] tracking-[0.12em] text-fg-muted uppercase">
                    {h("toBeAnnounced")}
                  </span>
                </li>
              ))}
          </ol>
        </div>
        <div className="mt-14" data-reveal>
          <Button as={Link} href="/the-team" variant="text">
            {h("meetTeam")}
          </Button>
        </div>
      </div>
    </section>
  );
}
