import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <span
          className="h-10 w-10 animate-spin rounded-full border-3 border-verde-claro border-t-verde-600"
          aria-hidden
        />
        <p className="text-sm text-verde-900/70">{t("loading")}</p>
      </div>
    </div>
  );
}
