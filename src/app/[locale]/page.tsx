import Image from "next/image";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  HandshakeIcon,
  PeopleIcon,
  CompassIcon,
} from "@/components/icons";
import { RouteLine } from "@/components/decor";
import { cut } from "@/lib/images";
import { getPrograms, getNews } from "@/lib/content";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const [programs, news] = await Promise.all([getPrograms(locale), getNews(locale)]);
  const recentNews = news.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Misión resumida */}
      <Section bg="tierra" labelledby="mision-title">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                as="h2"
                eyebrow={t("missionEyebrow")}
                title={<span id="mision-title">{t("missionTitle")}</span>}
                withRoute
                description={t("missionText")}
              />
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/nosotros" variant="secondary">
                  {t("ourHistory")}
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/programas" variant="outline">
                  {tc("ourPrograms")}
                </ButtonLink>
              </div>
            </div>

            {/* Las dos orillas (ilustración real del branding) */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <ShoreCard src={cut.latam} label={tc("region.America Latina")} note={t("shoreLatamNote")} />
                <ShoreCard
                  src={cut.guinea}
                  label={tc("region.Guinea Ecuatorial")}
                  note={t("shoreGuineaNote")}
                  className="mt-8"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
                <RouteLine className="mx-auto h-8 w-2/3" />
              </div>
              <p className="mt-6 text-center text-sm font-medium text-verde-700">{t("shoresCaption")}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Programas */}
      <Section labelledby="programas-title">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              as="h2"
              eyebrow={t("programsEyebrow")}
              title={<span id="programas-title">{t("programsTitle")}</span>}
              description={t("programsText")}
            />
            <ButtonLink href="/programas" variant="ghost" className="shrink-0">
              {tc("viewAll")}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Colabora: la plataforma está tejiendo su red */}
      <Section bg="soft" labelledby="colabora-title">
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={t("collabEyebrow")}
            title={<span id="colabora-title">{t("collabTitle")}</span>}
            description={t("collabText")}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CollabCard
              icon={<HandshakeIcon className="h-6 w-6" />}
              title={t("collabOrgs")}
              text={t("collabOrgsText")}
            />
            <CollabCard
              icon={<PeopleIcon className="h-6 w-6" />}
              title={t("collabVolunteers")}
              text={t("collabVolunteersText")}
            />
            <CollabCard
              icon={<CompassIcon className="h-6 w-6" />}
              title={t("collabInstitutions")}
              text={t("collabInstitutionsText")}
            />
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contacto?asunto=alianzas" variant="primary">
              {t("collabCta")}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/programas" variant="outline">
              {tc("ourPrograms")}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Noticias recientes */}
      <Section labelledby="noticias-title">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              as="h2"
              eyebrow={t("newsEyebrow")}
              title={<span id="noticias-title">{t("newsTitle")}</span>}
              description={t("newsText")}
            />
            <ButtonLink href="/noticias" variant="ghost" className="shrink-0">
              {t("allNews")}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentNews.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}

/** Tarjeta de vía de colaboración (organizaciones, voluntariado, instituciones). */
function CollabCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-verde-profundo/10 bg-white/80 p-6 shadow-[var(--shadow-soft)]">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-verde-claro text-verde-700" aria-hidden>
        {icon}
      </span>
      <h3 className="mt-4 text-xl font-semibold text-verde-profundo">{title}</h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-verde-900/75">{text}</p>
    </div>
  );
}

/** Tarjeta de "orilla" con recorte ilustrado del branding. */
function ShoreCard({
  src,
  label,
  note,
  className = "",
}: {
  src: string;
  label: string;
  note: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-verde-profundo/10 bg-white shadow-[var(--shadow-soft)] ${className}`}
    >
      <div className="relative aspect-[4/5]">
        <Image src={src} alt={`${label}: ${note}`} fill sizes="(max-width: 768px) 45vw, 22vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-verde-900/80 to-transparent" aria-hidden />
        <figcaption className="absolute inset-x-0 bottom-0 p-3">
          <span className="block font-serif text-base font-semibold text-marfil">{label}</span>
          <span className="block text-[0.7rem] text-verde-claro/80">{note}</span>
        </figcaption>
      </div>
    </figure>
  );
}
