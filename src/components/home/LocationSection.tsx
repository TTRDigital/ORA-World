import { getTranslations } from "next-intl/server";
import type { HomeContent, PointOfInterest, SiteSettings } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LocationMap } from "@/components/map/LocationMap";

type Props = { block: Localized<HomeContent["location"]>; pois: Localized<PointOfInterest>[]; site: Localized<SiteSettings> };

export async function LocationSection({ block, pois, site }: Props) {
  const t = await getTranslations("common");
  const h = await getTranslations("home");
  return (
    <section id="location" className="py-section" aria-labelledby="location-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 id="location-title" className="display-l mt-6" data-reveal>
              <Accent text={block.title} />
            </h2>
          </div>
          <p className="lead col-span-12 mt-6 max-w-[44ch] text-fg-muted md:col-span-5 md:col-start-8 md:mt-16" data-reveal>
            {block.intro}
          </p>
        </div>
        <LocationMap pois={pois} site={{ lat: site.siteLat, lng: site.siteLng, label: h("theSite") }} className="mt-14" compact />
        <div className="mt-10" data-reveal>
          <Button as={Link} href="/location" variant="text">
            {t("learnMore")}
          </Button>
        </div>
      </div>
    </section>
  );
}
