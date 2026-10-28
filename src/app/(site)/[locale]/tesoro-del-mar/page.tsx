import { notFound } from "next/navigation";
import { localeOf, plain } from "@/lib/page";
import { getProject } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ProjectPage } from "@/components/projects/ProjectPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/tesoro-del-mar">) {
  const { locale } = await params;
  const p = await getProject(locale as "en" | "es", "tesoro-del-mar");
  if (!p) return {};
  return pageMetadata({
    locale: locale as "en" | "es",
    title: plain(p.name),
    description: p.summary[0],
    path: "/tesoro-del-mar",
    image: p.hero.src,
    eyebrow: p.location,
  });
}

export default async function TesoroPage({ params }: PageProps<"/[locale]/tesoro-del-mar">) {
  const locale = await localeOf(params);
  const p = await getProject(locale, "tesoro-del-mar");
  if (!p) notFound();
  return <ProjectPage project={p} locale={locale} path="/tesoro-del-mar" />;
}
