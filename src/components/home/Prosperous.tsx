import { getTranslations } from "next-intl/server";
import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Link } from "@/i18n/navigation";
import { Accent } from "@/components/ui/Accent";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SplitLines } from "@/components/ui/SplitLines";

/** Calm, typographic. No numbers unless the CMS supplies them. */
export async function Prosperous({ block }: { block: Localized<HomeContent["prosperous"]> }) {
  const t = await getTranslations("common");
  return (
    <section className="bg-surface py-section">
      <div className="container-x grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-4">
          <Eyebrow>{block.eyebrow}</Eyebrow>
        </div>
        <div className="col-span-12 mt-6 md:col-span-7 md:col-start-6 md:mt-0">
          <SplitLines as="h2" className="display-l">
            <Accent text={block.title} />
          </SplitLines>
          <div className="mt-10 max-w-[56ch] space-y-5 text-fg-muted">
            {block.body.map((p, i) => (
              <p key={i} className="lead" data-reveal>
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6" data-reveal>
            <Button as={Link} href="/incentives">
              {t("learnMore")}
              <span className="sr-only"> · {block.eyebrow}</span>
            </Button>
          </div>
          <p className="mt-10 max-w-[64ch] border-t border-rule pt-5 small text-fg-muted" data-reveal>
            {block.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
