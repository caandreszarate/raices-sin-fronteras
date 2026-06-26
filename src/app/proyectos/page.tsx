import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { projects } from "@/lib/data/projects";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explora los proyectos de Raíces sin Fronteras filtrando por programa, región y estado: cultura, educación, medio ambiente, juventud, cooperación y turismo de raíces.",
};

export default async function ProyectosPage({
  searchParams,
}: {
  searchParams: Promise<{ programa?: string }>;
}) {
  const { programa } = await searchParams;
  const initialProgram = programs.some((p) => p.slug === programa) ? programa! : "todos";

  return (
    <>
      <PageHeader
        eyebrow="En el territorio"
        title="Proyectos que echan raíces"
        description="Iniciativas reales, lideradas por comunidades de ambas regiones. Filtra por programa, región o estado para encontrar lo que te interesa."
        breadcrumbs={[{ label: "Proyectos" }]}
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
