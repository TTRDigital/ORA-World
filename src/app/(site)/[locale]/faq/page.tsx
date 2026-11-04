import { getTranslations } from "next-intl/server";
import { localeOf, pageMetaFromMessages } from "@/lib/page";
import { getFaqs } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqList } from "@/components/faq/FaqList";
import { tdm } from "@/content/seed/images";
import { localize } from "@/lib/localize";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { HomeFaq } from "@/components/home/HomeFaq";
import { getHome as getHomeContent, getTeam } from "@/lib/content";

export const generateMetadata = ({ params }: PageProps<"/[locale]/faq">) => pageMetaFromMessages(params, "faq", "/faq");

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const locale = await localeOf(params);
  const [t, n, faqs] = await Promise.all([getTranslations("pages.faq"), getTranslations("nav"), getFaqs(locale)]);
  const [homeContent, team] = await Promise.all([getHomeContent(locale), getTeam(locale)]);
  const reza = team.find((m) => m.slug === "reza-sabaii");
  const advisor = reza ? { name: reza.name, role: reza.role, portrait: reza.portrait } : null;
  const allFaqs = faqs;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
    })),
  };
  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbLd(locale, [
            { name: n("home"), path: "" },
            { name: n("faq"), path: "/faq" },
          ]),
          faqLd,
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        image={localize(tdm.foyerLounge, locale)}
      />
      <HomeFaq block={homeContent.faq} faqs={allFaqs} advisor={advisor} />
      <Section className="container-x">
        <FaqList faqs={faqs} />
      </Section>
    </main>
  );
}
