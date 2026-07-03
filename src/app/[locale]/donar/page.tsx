import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { DonationWidget } from "@/components/donate/DonationWidget";
import { ProgramIcon, CheckIcon, HeartIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { getPrograms } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });
  return {
    title: t("headerTitle"),
    description: t("headerText"),
  };
}

export default async function DonarPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("donate");
  const programs = await getPrograms(locale);
  const transparencia = t.raw("transparency") as string[];
  const otherWays = t.raw("otherWays") as string[];

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
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* Explicación */}
            <div>
              <h2 className="text-2xl sm:text-3xl">{t("whyTitle")}</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-verde-900/80">
                {t("whyText")}
              </p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-verde-700">
                {t("drives")}
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {programs.map((p) => (
                  <li
                    key={p.slug}
                    className="flex items-center gap-3 rounded-xl border border-verde-profundo/10 bg-white/70 p-3"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-verde-claro text-verde-700">
                      <ProgramIcon name={p.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-verde-profundo">{p.title}</span>
                  </li>
                ))}
              </ul>

              {/* Transparencia */}
              <div className="mt-8 rounded-3xl border border-verde-profundo/10 bg-verde-claro/40 p-6">
                <h3 className="flex items-center gap-2 text-lg">
                  <HeartIcon className="h-5 w-5 text-naranja" />
                  {t("transparencyTitle")}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {transparencia.map((tx) => (
                    <li key={tx} className="flex items-start gap-3 text-sm text-verde-900/80">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-verde-600" />
                      <span>{tx}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Widget de donación */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <DonationWidget />

              {/* Otras formas de apoyar */}
              <div className="mt-6 rounded-3xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)]">
                <h3 className="text-lg">{t("otherWaysTitle")}</h3>
                <ul className="mt-3 space-y-2 text-sm text-verde-900/75">
                  {otherWays.map((w) => (
                    <li key={w}>· {w}</li>
                  ))}
                </ul>
                <Link
                  href="/contacto?asunto=general"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-naranja hover:gap-2.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                >
                  {t("talkToTeam")}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
