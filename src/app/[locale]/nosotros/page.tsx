import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { ProgramIcon } from "@/components/icons";
import { getValues, getTeam, getMilestones } from "@/lib/content";
import { cut } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("headerTitle"),
    description: t("headerText"),
  };
}

export default async function NosotrosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tc = await getTranslations("common");
  const values = await getValues(locale);
  const team = await getTeam(locale);
  const milestones = await getMilestones(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("headerEyebrow")}
        title={t("headerTitle")}
        description={t("headerText")}
        breadcrumbs={[{ label: t("breadcrumb") }]}
        image="/pages/nosotros.jpg"
        imagePosition="50% 38%"
      />

      {/* Misión / Visión */}
      <Section bg="tierra">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rojo-tierra">{t("mission")}</p>
              <h2 className="mt-3 text-2xl">{t("missionTitle")}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-verde-900/75">
                {t("missionText")}
              </p>
            </article>
            <article className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rojo-tierra">{t("vision")}</p>
              <h2 className="mt-3 text-2xl">{t("visionTitle")}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-verde-900/75">
                {t("visionText")}
              </p>
            </article>
          </div>
        </Container>
      </Section>

      {/* Historia / línea de tiempo */}
      <Section labelledby="historia-title">
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={t("historyEyebrow")}
            title={<span id="historia-title">{t("historyTitle")}</span>}
            description={t("historyText")}
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-verde-profundo font-serif text-sm font-semibold text-marfil">
                    {m.year}
                  </span>
                  {i < milestones.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-dorado to-transparent lg:block" aria-hidden />
                  )}
                </div>
                <h3 className="mt-4 text-lg">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-verde-900/70">{m.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* La ceiba */}
      <Section bg="soft" id="ceiba" labelledby="ceiba-title">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-br from-dorado/30 to-verde-600/20 blur-2xl" aria-hidden />
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-marfil shadow-[var(--shadow-lift)]">
                <Image
                  src={cut.ceiba}
                  alt="Ceiba ilustrada del emblema de Raíces sin Fronteras, con copa de hojas verdes, rojas y doradas y raíces que descienden."
                  fill
                  sizes="(max-width: 1024px) 80vw, 380px"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <SectionHeading
                as="h2"
                eyebrow={t("ceibaEyebrow")}
                title={<span id="ceiba-title">{t("ceibaTitle")}</span>}
              />
              <div className="mt-5 space-y-4 text-pretty leading-relaxed text-verde-900/75">
                <p>{t("ceibaP1")}</p>
                <p>{t("ceibaP2")}</p>
                <p>{t("ceibaP3")}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Valores */}
      <Section labelledby="valores-title">
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={t("valuesEyebrow")}
            title={<span id="valores-title">{t("valuesTitle")}</span>}
            description={t("valuesText")}
            align="center"
          />
          <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <li
                key={v.title}
                className="rounded-2xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-verde-claro text-verde-700">
                  <ProgramIcon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-verde-900/70">{v.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Equipo */}
      <Section bg="soft" labelledby="equipo-title">
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={t("teamEyebrow")}
            title={<span id="equipo-title">{t("teamTitle")}</span>}
            description={t("teamText")}
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li
                key={member.name}
                className="flex gap-4 rounded-2xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)]"
              >
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-verde-profundo font-serif text-lg font-semibold text-marfil"
                  aria-hidden
                >
                  {member.initials}
                </span>
                <div>
                  <h3 className="text-lg leading-tight">{member.name}</h3>
                  <p className="text-sm font-medium text-rojo-tierra">{member.role}</p>
                  <p className="mt-0.5 text-xs text-verde-900/70">{tc(`region.${member.region}`)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-verde-900/70">{member.bio}</p>
                </div>
              </li>
            ))}
          </ul>
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
