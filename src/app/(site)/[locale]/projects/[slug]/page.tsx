import { notFound, redirect } from "next/navigation";
import { localeOf, plain } from "@/lib/page";
import { getProject } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { ProjectPage } from "@/components/projects/ProjectPage";
import { projects as seed } from "@/content/seed/projects";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => seed.filter((p) => p.slug !== "tesoro-del-mar").map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const p = await getProject(locale as "en" | "es", slug);
  if (!p) return {};
  return pageMetadata({ locale: locale as "en" | "es", title: plain(p.name), description: p.summary[0], path: `/projects/${slug}`, image: p.hero.src, eyebrow: p.location });
}

export default async function ProjectRoute({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const locale = await localeOf(params);
  const { slug } = await params;
  if (slug === "tesoro-del-mar") redirect(`/${locale}/tesoro-del-mar`);
  const p = await getProject(locale, slug);
  if (!p) notFound();
  return <ProjectPage project={p} locale={locale} path={`/projects/${slug}`} />;
}
