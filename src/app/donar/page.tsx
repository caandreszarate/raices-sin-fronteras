import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { DonationWidget } from "@/components/donate/DonationWidget";
import { ProgramIcon, CheckIcon, HeartIcon } from "@/components/icons";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Dona ahora",
  description:
    "Apoya la cooperación afro-hispana entre América Latina y Guinea Ecuatorial. Tu donación sostiene cultura, educación, juventud y medio ambiente.",
};

const transparencia = [
  "Cada donación se destina a programas con resultados verificables.",
  "Publicamos informes periódicos de uso de fondos.",
  "Priorizamos compras y contrataciones locales en las comunidades.",
  "Puedes elegir un aporte único o mensual y cancelarlo cuando quieras.",
];

export default function DonarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tu apoyo cuenta"
        title="Sembremos futuro, juntos"
        description="Donar a Raíces sin Fronteras es invertir en comunidades que crecen con identidad, educación y esperanza a ambos lados del Atlántico."
        breadcrumbs={[{ label: "Donar" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* Explicación */}
            <div>
              <h2 className="text-2xl sm:text-3xl">Por qué tu donación importa</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-verde-900/80">
                Trabajamos con recursos que se multiplican en el territorio: una pequeña aportación
                se convierte en libros, árboles, talleres y oportunidades para jóvenes. Tu apoyo
                sostiene programas que, de otra forma, no llegarían a quienes más los necesitan.
              </p>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-verde-700">
                Tu aporte impulsa
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
                  Transparencia y confianza
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {transparencia.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-verde-900/80">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-verde-600" />
                      <span>{t}</span>
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
                <h3 className="text-lg">Otras formas de apoyar</h3>
                <ul className="mt-3 space-y-2 text-sm text-verde-900/75">
                  <li>· Donaciones de empresas y patrocinios.</li>
                  <li>· Voluntariado profesional y mentorías.</li>
                  <li>· Alianzas institucionales y cooperación.</li>
                </ul>
                <a
                  href="/contacto?asunto=donaciones"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-naranja hover:gap-2.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                >
                  Habla con nuestro equipo →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
