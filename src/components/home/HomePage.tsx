import { getTranslations } from "next-intl/server";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import images from "@/content/images.json";

/** Phase 2 placeholder: hero poster + shell. Replaced by the full section stack in Phase 3. */
export async function HomePage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const poster = images["client/tdm-exterior-from-pull-scaled"];
  return (
    <main id="main">
      <section data-hero className="relative flex min-h-dvh items-end overflow-hidden bg-basalt text-white">
        <img src={poster.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="scrim-bottom absolute inset-0" />
        <div className="container-x relative pb-24">
          <p className="eyebrow mb-6 text-brass-light">Dorado · Puerto Rico</p>
          <h1 className="display-xl max-w-[10ch]">
            <em className="text-brass-light">Beyond</em> expectations
          </h1>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button as={Link} href="/contact" variant="light">
              {t("requestPresentation")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
