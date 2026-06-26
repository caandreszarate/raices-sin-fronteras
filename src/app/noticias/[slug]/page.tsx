import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { CoverArt } from "@/components/ui/CoverArt";
import { Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/cards/NewsCard";
import { ClockIcon, ArrowRightIcon } from "@/components/icons";
import { news, getArticle } from "@/lib/data/news";
import { formatDate } from "@/lib/format";
import { categoryImage } from "@/lib/images";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Noticia no encontrada" };
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = news.filter((n) => n.slug !== article.slug && n.category === article.category).slice(0, 3);
  const fallback = news.filter((n) => n.slug !== article.slug).slice(0, 3);
  const suggestions = related.length > 0 ? related : fallback;

  return (
    <>
      <PageHeader
        eyebrow={article.category}
        title={article.title}
        breadcrumbs={[{ label: "Noticias", href: "/noticias" }, { label: article.title }]}
      />

      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-verde-900/60">
            <Badge tone="verde">{article.category}</Badge>
            <span>{article.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {article.readingMinutes} min de lectura
            </span>
          </div>

          <CoverArt
            tone={article.cover}
            src={categoryImage[article.category]}
            icon="ceiba"
            label={`Imagen de la noticia ${article.title}`}
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

          {/* Etiquetas */}
          <ul className="mt-8 flex flex-wrap gap-2 border-t border-verde-profundo/10 pt-6">
            {article.tags.map((tag) => (
              <li key={tag}>
                <Badge tone="neutral">#{tag}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Sugerencias */}
      <Section bg="soft" labelledby="sugerencias-title">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 id="sugerencias-title" className="text-2xl sm:text-3xl">
              Sigue leyendo
            </h2>
            <Link
              href="/noticias"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-naranja hover:gap-2.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
            >
              Todas las noticias
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
