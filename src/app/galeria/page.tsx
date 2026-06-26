import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { CTASection } from "@/components/ui/CTASection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { gallery, galleryCountries, galleryYears } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Memoria visual de Raíces sin Fronteras: encuentros, siembras, talleres y celebraciones. Filtra por programa, país o año.",
};

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Memoria viva"
        title="Galería de encuentros y raíces"
        description="Imágenes que cuentan el trabajo cotidiano de nuestras comunidades a ambos lados del Atlántico."
        breadcrumbs={[{ label: "Galería" }]}
      />
      <Section>
        <Container>
          <GalleryGrid items={gallery} countries={galleryCountries} years={galleryYears} />
        </Container>
      </Section>
      <CTASection
        title="¿Quieres aparecer en esta historia?"
        description="Súmate como voluntario, aliado o donante y sé parte de los próximos encuentros."
        primary={{ href: "/donar", label: "Dona ahora" }}
        secondary={{ href: "/contacto?asunto=voluntariado", label: "Ser voluntario" }}
      />
    </>
  );
}
