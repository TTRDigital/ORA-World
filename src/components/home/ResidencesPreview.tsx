import { getTranslations } from "next-intl/server";
import type { Collection, HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CollectionCard } from "@/components/residences/CollectionCard";

type Props = { block: Localized<HomeContent["residences"]>; collections: Localized<Collection>[] };

/** Asymmetric editorial layout: 3–4 collections at alternating widths and offsets, hover reveals a second image. */
export async function ResidencesPreview({ block, collections }: Props) {
  const h = await getTranslations("home");
  const items = collections.slice(0, 4);
  const spans = ["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5 md:col-start-2", "md:col-span-6 md:mt-16"];
  const aspects = ["aspect-[4/3]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/10]"];
  return (
    <Section id="residences" className="container-x">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-6">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="display-l mt-6" data-reveal>
            <Accent text={block.title} />
          </h2>
        </div>
        <p className="lead col-span-12 mt-6 max-w-[46ch] text-fg-muted md:col-span-5 md:col-start-8 md:mt-16" data-reveal>
          {block.intro}
        </p>
      </div>
      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-24">
        {items.map((c, i) => (
          <div key={c.slug} className={`col-span-12 ${spans[i]}`}>
            <CollectionCard collection={c} aspect={aspects[i]} priority={i === 0} />
          </div>
        ))}
      </div>
      <div className="mt-16 flex flex-wrap gap-4" data-reveal>
        <Button as={Link} href="/residences">
          {h("exploreResidences")}
        </Button>
        <Button as={Link} href="/floor-plans" variant="text">
          {h("allPlans")}
        </Button>
      </div>
    </Section>
  );
}
