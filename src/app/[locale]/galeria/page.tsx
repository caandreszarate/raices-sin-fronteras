import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { galleryCountries, galleryYears } from "@/lib/data/gallery";
import { getGallery } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return {
    title: t("headerTitle"),
    description: t("headerText"),
  };
}

export default async function GaleriaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  const galleryItems = await getGallery(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("headerEyebrow")}
        title={t("headerTitle")}
        description={t("headerText")}
        breadcrumbs={[{ label: t("breadcrumb") }]}
      />
      <Section>
        <Container>
          <GalleryGrid items={galleryItems} countries={galleryCountries} years={galleryYears} />
        </Container>
      </Section>
      <CTASection
        title={t("ctaTitle")}
        description={t("ctaText")}
        primary={{ href: "/donar", label: t("ctaPrimary") }}
        secondary={{ href: "/contacto?asunto=voluntariado", label: t("ctaSecondary") }}
      />
    </>
  );
}
