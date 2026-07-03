import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { NewsCard } from "@/components/cards/NewsCard";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { getNews } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("breadcrumb"), description: t("headerText") };
}

export default async function NoticiasPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const news = await getNews(locale);
  const featured = news.find((n) => n.featured) ?? news[0];
  const rest = news.filter((n) => n.slug !== featured.slug);

  return (
    <>
      <PageHeader
        eyebrow={t("headerEyebrow")}
        title={t("headerTitle")}
        description={t("headerText")}
        breadcrumbs={[{ label: t("breadcrumb") }]}
        image="/pages/noticias.jpg"
        imagePosition="12% 45%"
      />

      <Section>
        <Container>
          <NewsCard article={featured} featured />
        </Container>
      </Section>

      <Section bg="soft" className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <NewsExplorer articles={rest} />
        </Container>
      </Section>

      <CTASection
        title={t("ctaTitle")}
        description={t("ctaText")}
        primary={{ href: "/contacto", label: t("ctaPrimary") }}
        secondary={{ href: "/programas", label: t("ctaSecondary") }}
      />
    </>
  );
}
