import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { programs } from "@/lib/data/programs";
import { getProjects } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("breadcrumb"), description: t("headerText") };
}

export default async function ProyectosPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ programa?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { programa } = await searchParams;
  const t = await getTranslations("projects");
  const projects = await getProjects(locale);
  const initialProgram = programs.some((p) => p.slug === programa) ? programa! : "todos";

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
          <ProjectsExplorer projects={projects} initialProgram={initialProgram} />
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
