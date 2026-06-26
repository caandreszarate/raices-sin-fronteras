import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { NewsCard } from "@/components/cards/NewsCard";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { news, featuredNews } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Historias, convocatorias y avances de Raíces sin Fronteras. Filtra por categoría o busca temas de cultura, educación, juventud, medio ambiente y cooperación.",
};

export default function NoticiasPage() {
  const featured = featuredNews[0] ?? news[0];
  const rest = news.filter((n) => n.slug !== featured.slug);

  return (
    <>
      <PageHeader
        eyebrow="Sala de prensa"
        title="Noticias y voces de la red"
        description="Lo que ocurre en nuestras comunidades: convocatorias, encuentros, aprendizajes y resultados."
        breadcrumbs={[{ label: "Noticias" }]}
      />

      {/* Destacada */}
      <Section>
        <Container>
          <NewsCard article={featured} featured />
        </Container>
      </Section>

      {/* Listado con búsqueda + filtros */}
      <Section bg="soft" className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <NewsExplorer articles={rest} />
        </Container>
      </Section>

      <CTASection
        title="Recibe las novedades en tu correo"
        description="Suscríbete al boletín de raíces y entérate primero de convocatorias, eventos y resultados."
        primary={{ href: "/contacto", label: "Escríbenos" }}
        secondary={{ href: "/donar", label: "Apóyanos" }}
      />
    </>
  );
}
