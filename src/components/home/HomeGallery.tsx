import { getImageProps } from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/content/types";
import { tdm } from "@/content/seed/images";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { GalleryCarousel } from "./GalleryCarousel";

const ROOMS = [
  tdm.foyerSignage,
  tdm.aptLiving,
  tdm.penthouseDining,
  tdm.aptBedroom2,
  tdm.aptBath2,
  tdm.penthouseLiving,
  tdm.hotelSuite,
  tdm.foyerReception,
  tdm.aptStudy,
];

/** Room-by-room renders in the Vengeance UI 3D perspective carousel. */
export async function HomeGallery({ locale }: { locale: Locale }) {
  const h = await getTranslations("home");
  const n = await getTranslations("nav");
  // Optimised, sharp sources: 2× the 340px slide on desktop.
  const items = ROOMS.map((im) => {
    const { props } = getImageProps({ src: im.src, alt: im.alt[locale], width: 750, height: 1000, quality: 75 });
    return { src: props.src, title: im.alt[locale], alt: im.alt[locale] };
  });
  return (
    <section className="overflow-hidden py-section" aria-labelledby="gallery-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>{n("gallery")}</Eyebrow>
            <h2 id="gallery-title" className="mt-6 display-l" data-reveal>
              <Accent text={h("galleryTitle")} />
            </h2>
          </div>
          <div className="col-span-12 mt-6 md:col-span-4 md:col-start-9 md:mt-16" data-reveal>
            <p className="lead text-fg-muted">{h("galleryIntro")}</p>
            <div className="mt-6">
              <Button as={Link} href="/gallery" variant="text">
                {h("galleryCta")}
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-14" data-reveal>
          <GalleryCarousel items={items} label={h("galleryTitle").replace(/\*/g, "")} />
        </div>
      </div>
    </section>
  );
}
