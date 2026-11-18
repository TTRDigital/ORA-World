import { getTranslations } from "next-intl/server";
import type { FloorPlan } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TowerExplorer } from "./TowerExplorer";

/** Homepage floor-plan structure: Tower 1, floor by floor (Phase One plan set). */
export async function FloorPlanSection({ plans }: { plans: Localized<FloorPlan>[] }) {
  const t = await getTranslations("home.tower");
  return (
    <section id="residences" className="bg-bg-alt py-section" aria-labelledby="tower-title">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 id="tower-title" className="mt-6 display-l" data-reveal>
              <Accent text={t("title")} />
            </h2>
          </div>
          <p className="col-span-12 mt-6 max-w-[44ch] lead text-fg-muted md:col-span-5 md:mt-16" data-reveal>
            {t("intro")}
          </p>
        </div>
        <div className="mt-10 md:mt-14">
          <TowerExplorer
            plans={plans}
            l={{
              bedrooms: t("bedrooms"),
              any: t("any"),
              level: t("level"),
              residences: t("residences"),
              penthouse: t("penthouse"),
              beds: t("beds"),
              baths: t("baths"),
              interior: t("interior"),
              exterior: t("exterior"),
              viewPlan: t("viewPlan"),
              allPlans: t("allPlans"),
              note: t("note"),
            }}
          />
        </div>
      </div>
    </section>
  );
}
