import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

type Block = Localized<HomeContent["family"]>;

/** Two warm editorial blocks side by side: people, then pets. */
export async function FamilyPets({ family, pets }: { family: Block; pets: Block }) {
  const t = await getTranslations("common");
  const blocks: { b: Block; href: "/lifestyle"; offset: string }[] = [
    { b: family, href: "/lifestyle", offset: "" },
    { b: pets, href: "/lifestyle", offset: "lg:mt-32" },
  ];
  return (
    <section className="bg-bg-alt py-section">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-20">
        {blocks.map(({ b, href, offset }, i) => (
          <article key={i} className={`col-span-12 lg:col-span-6 ${offset}`}>
            <Picture
              image={b.image}
              sizes="(min-width: 1024px) 50vw, 100vw"
              aspect={i === 0 ? "4/3" : "4/5"}
              className={i === 1 ? "lg:mr-16" : "lg:ml-8"}
              showCaption={false}
            />
            <div className={`mt-8 ${i === 0 ? "lg:ml-24" : "lg:mr-16"}`}>
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <h2 className="mt-5 display-m" data-reveal>
                <Accent text={b.title} />
              </h2>
              {b.body.map((p, j) => (
                <p key={j} className="mt-5 max-w-[48ch] text-fg-muted" data-reveal>
                  {p}
                </p>
              ))}
              <Button as={Link} href={href} variant="text" className="mt-6">
                {t("learnMore")}
                <span className="sr-only"> · {b.eyebrow}</span>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
