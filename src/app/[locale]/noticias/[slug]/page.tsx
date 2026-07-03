import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { CoverArt } from "@/components/ui/CoverArt";
import { Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/cards/NewsCard";
import { ClockIcon, ArrowRightIcon } from "@/components/icons";
import { news as newsData } from "@/lib/data/news";
import { formatDate } from "@/lib/format";
import { categoryImage } from "@/lib/images";
import { getArticle, getNews } from "@/lib/content";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => newsData.map((n) => ({ locale, slug: n.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle(locale, slug);
  if (!article) return { title: "404" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export default async function NoticiaDetallePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");

  const article = await getArticle(locale, slug);
  if (!article) notFound();

  const all = await getNews(locale);
  const related = all.filter((n) => n.slug !== article.slug && n.category === article.category).slice(0, 3);
  const fallback = all.filter((n) => n.slug !== article.slug).slice(0, 3);
  const suggestions = related.length > 0 ? related : fallback;

  return (
    <>
      <PageHeader
        eyebrow={t(`categories.${article.category}`)}
        title={article.title}
        breadcrumbs={[{ label: t("breadcrumb"), href: "/noticias" }, { label: article.title }]}
      />

      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-verde-900/70">
            <Badge tone="verde">{t(`categories.${article.category}`)}</Badge>
            <span>{article.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {t("readingTime", { min: article.readingMinutes })}
            </span>
          </div>

          <CoverArt
            tone={article.cover}
            src={categoryImage[article.category]}
            icon="ceiba"
            label={t("imageAlt", { title: article.title })}
            className="mt-6 rounded-3xl"
            ratio="aspect-[16/9]"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />

          <div className="mt-8 space-y-5 text-pretty text-lg leading-relaxed text-verde-900/85">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2 border-t border-verde-profundo/10 pt-6">
            {article.tags.map((tag) => (
              <li key={tag}>
                <Badge tone="neutral">#{tag}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section bg="soft" labelledby="sugerencias-title">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 id="sugerencias-title" className="text-2xl sm:text-3xl">
              {t("keepReading")}
            </h2>
            <Link
              href="/noticias"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-naranja hover:gap-2.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
            >
              {t("allNews")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
