import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main id="main" className="container-x flex min-h-[70vh] flex-col items-start justify-center py-section">
      <p className="eyebrow text-accent-ink">404</p>
      <h1 className="display-l mt-6 max-w-[14ch]">{t("title")}</h1>
      <p className="lead mt-6 max-w-[48ch] text-fg-muted">{t("text")}</p>
      <Button as={Link} href="/" className="mt-10">
        {t("cta")}
      </Button>
    </main>
  );
}
