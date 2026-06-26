import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { ProgramIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { getPrograms, getProjects } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programs" });
  return {
    title: t("headerTitle"),
    description: t("headerText"),
  };
}

const accentText: Record<string, string> = {
  "rojo-tierra": "text-rojo-tierra",
  naranja: "text-naranja",
  dorado: "text-dorado-600",
  verde: "text-verde-600",
  "verde-600": "text-verde-600",
  "azul-profundo": "text-azul-profundo",
};

export default async function ProgramasPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programs");
  const programs = await getPrograms(locale);
  const projects = await getProjects(locale);

  return (
    <>
      <PageHeader
        eyebrow={t("headerEyebrow")}
        title={t("headerTitle")}
        description={t("headerText")}
        breadcrumbs={[{ label: t("breadcrumb") }]}
      />

      {/* Índice de programas */}
      <Section>
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <li key={p.slug}>
                <a
                  href={`#${p.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-verde-profundo/10 bg-white/70 p-4 text-sm font-semibold text-verde-profundo transition-colors hover:border-verde/30 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-verde-claro ${accentText[p.accent] ?? "text-verde-600"}`}>
                    <ProgramIcon name={p.icon} className="h-5 w-5" />
                  </span>
                  {p.title}
                  <ArrowRightIcon className="ml-auto h-4 w-4 text-verde-900/40" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Detalle de cada programa */}
      {programs.map((program, idx) => {
        const related = projects.filter((p) => p.program === program.slug).slice(0, 2);
        return (
          <Section
            key={program.slug}
            id={program.slug}
            bg={idx % 2 === 0 ? "soft" : "default"}
            labelledby={`${program.slug}-title`}
            className="scroll-mt-24"
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
                <div>
                  <span
                    className={`inline-grid h-16 w-16 place-items-center rounded-2xl bg-verde-claro ${
                      accentText[program.accent] ?? "text-verde-600"
                    }`}
                  >
                    <ProgramIcon name={program.icon} className="h-8 w-8" />
                  </span>
                  <h2 id={`${program.slug}-title`} className="mt-5 text-3xl sm:text-4xl">
                    {program.title}
                  </h2>
                  <p className="mt-4 text-pretty text-lg leading-relaxed text-verde-900/80">
                    {program.description}
                  </p>

                  <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-verde-700">
                    {t("goals")}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {program.goals.map((goal) => (
                      <li key={goal} className="flex items-start gap-3 text-sm text-verde-900/80">
                        <CheckIcon className={`mt-0.5 h-5 w-5 shrink-0 ${accentText[program.accent] ?? "text-verde-600"}`} />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  {/* Indicadores */}
                  <dl className="grid grid-cols-3 gap-3 rounded-3xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)]">
                    {program.highlights.map((h) => (
                      <div key={h.label}>
                        <dt className="sr-only">{h.label}</dt>
                        <dd>
                          <span className="block font-serif text-2xl font-semibold text-verde-profundo">
                            {h.value}
                          </span>
                          <span className="mt-1 block text-xs text-verde-900/60">{h.label}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Proyectos relacionados */}
                  {related.length > 0 && (
                    <div className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)]">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-verde-700">
                        {t("relatedProjects")}
                      </h3>
                      <ul className="mt-3 divide-y divide-verde-profundo/10">
                        {related.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/proyectos/${p.slug}`}
                              className="flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:text-verde-600 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                            >
                              <span className="font-medium text-verde-profundo">{p.title}</span>
                              <ArrowRightIcon className="h-4 w-4 shrink-0 text-verde-900/40" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <ButtonLink
                        href={`/proyectos?programa=${program.slug}`}
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                      >
                        {t("moreProjects")}
                        <ArrowRightIcon className="h-4 w-4" />
                      </ButtonLink>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      <CTASection
        title={t("ctaTitle")}
        description={t("ctaText")}
        primary={{ href: "/contacto?asunto=alianzas", label: t("ctaPrimary") }}
        secondary={{ href: "/proyectos", label: t("ctaSecondary") }}
      />
    </>
  );
}
