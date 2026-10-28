import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("nav");
  return (
    <a
      href="#main"
      className="sr-only-focusable top-4 left-4 bg-basalt px-4 py-3 text-sm text-white outline-brass-light"
    >
      {t("skipToContent")}
    </a>
  );
}
