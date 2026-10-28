import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { HomeContent, TeamMember } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export async function Collaboratory({
  block,
  team,
}: {
  block: Localized<HomeContent["team"]>;
  team: Localized<TeamMember>[];
}) {
  const h = await getTranslations("home");
  const c = await getTranslations("common");
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
        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {team.slice(0, 4).map((m, i) => (
            <li key={m.slug} className={i % 2 === 1 ? "md:mt-16" : ""} data-reveal data-delay={i * 0.08}>
              <figure className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={m.portrait.src}
                  alt={m.portrait.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </figure>
              <p className="mt-5 eyebrow text-accent-ink">{m.discipline}</p>
              <h3 className="mt-2 display-s">{m.name}</h3>
              <p className="mt-1 small text-fg-muted">{m.role}</p>
              {m.quote && <blockquote className="mt-4 font-display text-lg text-fg/80 italic">“{m.quote}”</blockquote>}
              {m.placeholder && <p className="mt-3 eyebrow text-fg-muted">{c("placeholder")}</p>}
            </li>
          ))}
        </ul>
        <div className="mt-14" data-reveal>
          <Button as={Link} href="/the-team" variant="text">
            {h("meetTeam")}
          </Button>
        </div>
      </div>
    </section>
  );
}
