import { useLocale, useTranslations } from "next-intl";
import type { NewsArticle } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { CoverArt } from "@/components/ui/CoverArt";
import { Badge } from "@/components/ui/Badge";
import { ClockIcon } from "@/components/icons";
import { formatDate } from "@/lib/format";
import { categoryImage } from "@/lib/images";

export function NewsCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
  const t = useTranslations("news");
  const locale = useLocale();
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-verde-profundo/10 bg-white/70 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <Link
        href={`/noticias/${article.slug}`}
        className={`block focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado ${
          featured ? "sm:w-1/2" : ""
        }`}
        aria-label={t("readNews", { title: article.title })}
      >
        <CoverArt
          tone={article.cover}
          src={categoryImage[article.category]}
          label={t("imageAlt", { title: article.title })}
          icon="ceiba"
          ratio={featured ? "aspect-[16/10] sm:h-full sm:aspect-auto" : "aspect-[16/10]"}
        />
      </Link>
      <div className={`flex flex-1 flex-col p-5 ${featured ? "sm:justify-center sm:p-7" : ""}`}>
        <div className="mb-3 flex items-center gap-3 text-xs text-verde-900/70">
          <Badge tone="verde">{t(`categories.${article.category}`)}</Badge>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" />
            {t("minutes", { min: article.readingMinutes })}
          </span>
        </div>
        <h3 className={`font-semibold text-verde-profundo ${featured ? "text-2xl" : "text-lg"}`}>
          <Link
            href={`/noticias/${article.slug}`}
            className="transition-colors hover:text-verde-600 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-verde-900/70">{article.excerpt}</p>
        <p className="mt-4 text-xs text-verde-900/70">
          {article.author} · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
        </p>
      </div>
    </article>
  );
}
