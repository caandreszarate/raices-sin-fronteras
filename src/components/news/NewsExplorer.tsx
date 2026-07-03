"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { NewsArticle } from "@/lib/types";
import { newsCategories } from "@/lib/data/news";
import { NewsCard } from "@/components/cards/NewsCard";
import { SearchIcon } from "@/components/icons";

export function NewsExplorer({ articles }: { articles: NewsArticle[] }) {
  const t = useTranslations("news");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("todas");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = category === "todas" || a.category === category;
      const matchesQuery =
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [articles, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="news-search" className="sr-only">
            {t("search")}
          </label>
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-verde-900/40" />
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-full border border-verde-profundo/15 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-verde-900 placeholder:text-verde-900/40 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label={t("filterByCategory")}>
          <CategoryChip active={category === "todas"} onClick={() => setCategory("todas")}>
            {t("allCategories")}
          </CategoryChip>
          {newsCategories.map((c) => (
            <CategoryChip key={c} active={category === c} onClick={() => setCategory(c)}>
              {t(`categories.${c}`)}
            </CategoryChip>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-verde-900/70" aria-live="polite">
        {filtered.length === 1 ? t("countOne", { count: 1 }) : t("countOther", { count: filtered.length })}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-verde-profundo/20 bg-white/50 p-10 text-center">
          <p className="font-medium text-verde-profundo">{t("emptyTitle")}</p>
          <p className="mt-1 text-sm text-verde-900/70">{t("emptyText", { query })}</p>
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado ${
        active
          ? "border-verde-profundo bg-verde-profundo text-marfil"
          : "border-verde-profundo/15 bg-white/70 text-verde-900/70 hover:border-verde/40 hover:text-verde-profundo"
      }`}
    >
      {children}
    </button>
  );
}
