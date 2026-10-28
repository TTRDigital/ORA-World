import type { HomeContent } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { Accent } from "@/components/ui/Accent";
import { SplitLines } from "@/components/ui/SplitLines";
import { Section } from "@/components/ui/Section";

export function Manifesto({ manifesto }: { manifesto: Localized<HomeContent["manifesto"]> }) {
  return (
    <Section className="container-x">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <SplitLines as="h2" className="display-m lg:display-l">
            <Accent text={manifesto.text} />
          </SplitLines>
          <p className="eyebrow mt-10 flex items-center gap-4 text-accent-ink" data-reveal>
            <span aria-hidden className="h-px w-10 bg-current" />
            {manifesto.signature}
          </p>
        </div>
      </div>
    </Section>
  );
}
