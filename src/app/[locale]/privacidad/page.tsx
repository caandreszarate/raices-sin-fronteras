import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("headerTitle"),
    description: t("headerText"),
  };
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as { h: string; p: string }[];

  return (
    <>
      <PageHeader
        eyebrow={t("headerEyebrow")}
        title={t("headerTitle")}
        description={t("headerText")}
        breadcrumbs={[{ label: t("breadcrumb") }]}
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-xl">{s.h}</h2>
                <p className="mt-2 text-pretty leading-relaxed text-verde-900/80">{s.p}</p>
              </section>
            ))}
            <p className="border-t border-verde-profundo/10 pt-6 text-sm text-verde-900/70">
              {t("disclaimer")}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
