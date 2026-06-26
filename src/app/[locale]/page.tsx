import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { CoverArt } from "@/components/ui/CoverArt";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";
import { RouteLine } from "@/components/decor";
import { cut, programImage } from "@/lib/images";
import { getPrograms, getFeaturedProjects, getNews, getGallery } from "@/lib/content";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const [programs, featuredProjects, news, gallery] = await Promise.all([
    getPrograms(locale),
    getFeaturedProjects(locale),
    getNews(locale),
    getGallery(locale),
  ]);
  const recentNews = news.slice(0, 3);
  const galleryPreview = gallery.slice(0, 6);

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

      {/* Proyectos destacados */}
      <Section bg="soft" labelledby="proyectos-title">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              as="h2"
              eyebrow={t("projectsEyebrow")}
              title={<span id="proyectos-title">{t("projectsTitle")}</span>}
              description={t("projectsText")}
            />
            <ButtonLink href="/proyectos" variant="ghost" className="shrink-0">
              {t("allProjects")}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
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

      {/* Galería breve */}
      <Section bg="soft" labelledby="galeria-title">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              as="h2"
              eyebrow={t("galleryEyebrow")}
              title={<span id="galeria-title">{t("galleryTitle")}</span>}
              description={t("galleryText")}
            />
            <ButtonLink href="/galeria" variant="ghost" className="shrink-0">
              {t("allGallery")}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {galleryPreview.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-2xl border border-verde-profundo/10 shadow-[var(--shadow-soft)]"
              >
                <CoverArt
                  tone={item.tone}
                  src={programImage[item.program]}
                  icon={item.program}
                  label={item.alt}
                  ratio="aspect-square"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection />
    </>
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
