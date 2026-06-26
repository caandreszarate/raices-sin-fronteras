import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { CoverArt } from "@/components/ui/CoverArt";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ArrowRightIcon } from "@/components/icons";
import { projects as projectsData } from "@/lib/data/projects";
import { getProgram } from "@/lib/data/programs";
import { formatDate } from "@/lib/format";
import { programImage } from "@/lib/images";
import { getProject, getProjects } from "@/lib/content";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projectsData.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(locale, slug);
  if (!project) return { title: "404" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProyectoDetallePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const tc = await getTranslations("common");
  const tprog = await getTranslations("programTitles");
  const treg = await getTranslations("common.region");

  const project = await getProject(locale, slug);
  if (!project) notFound();

  const program = getProgram(project.program);
  const programLabel = tprog(project.program);
  const all = await getProjects(locale);
  const related = all.filter((p) => p.program === project.program && p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={programLabel}
        title={project.title}
        description={project.summary}
        breadcrumbs={[{ label: t("breadcrumb"), href: "/proyectos" }, { label: project.title }]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <article>
              <CoverArt
                tone={project.cover}
                icon={program?.icon}
                src={programImage[project.program]}
                label={t("imageAlt", { title: project.title })}
                className="rounded-3xl"
                ratio="aspect-[16/9]"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="mt-6 flex flex-wrap gap-2">
                <StatusBadge status={project.status} label={t(`status.${project.status}`)} />
                <Badge tone="verde">{programLabel}</Badge>
                <Badge tone="neutral">{treg(project.region)}</Badge>
              </div>
              <div className="prose-rsf mt-6 space-y-4 text-pretty leading-relaxed text-verde-900/80">
                {project.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)]">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-verde-700">{t("card")}</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-verde-900/60">{t("country")}</dt>
                    <dd className="text-right font-medium text-verde-profundo">{project.country}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-verde-900/60">{t("regionLabel")}</dt>
                    <dd className="text-right font-medium text-verde-profundo">
                      {treg(project.region)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-verde-900/60">{t("start")}</dt>
                    <dd className="text-right font-medium text-verde-profundo">
                      <time dateTime={project.startDate}>{formatDate(project.startDate, locale)}</time>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-verde-900/60">{t("statusLabel")}</dt>
                    <dd className="text-right font-medium text-verde-profundo">{t(`status.${project.status}`)}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)]">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-verde-700">{t("impact")}</h2>
                <dl className="mt-4 grid grid-cols-3 gap-3">
                  {project.impact.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="block font-serif text-xl font-semibold text-verde-profundo">{m.value}</span>
                        <span className="mt-1 block text-xs text-verde-900/60">{m.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)]">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-verde-700">{t("partners")}</h2>
                <ul className="mt-3 space-y-2 text-sm text-verde-900/80">
                  {project.partners.map((partner) => (
                    <li key={partner} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-dorado" aria-hidden />
                      {partner}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section bg="soft" labelledby="rel-title">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 id="rel-title" className="text-2xl sm:text-3xl">
                {t("moreIn", { program: programLabel })}
              </h2>
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-naranja hover:gap-2.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
              >
                {tc("viewAll")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTASection />
    </>
  );
}
