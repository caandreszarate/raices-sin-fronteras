import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/ui/CTASection";
import { ProgramIcon } from "@/components/icons";
import { values, team, milestones } from "@/lib/data/org";
import { regionLabels } from "@/lib/data/projects";
import { cut } from "@/lib/images";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Historia, misión, visión y valores de Raíces sin Fronteras: una plataforma de cooperación afro-hispana entre América Latina y Guinea Ecuatorial.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quiénes somos"
        title="Una organización con raíces a ambos lados del Atlántico"
        description="Trabajamos para que la historia compartida entre América Latina y Guinea Ecuatorial se convierta en cooperación viva, oportunidades y futuro común."
        breadcrumbs={[{ label: "Nosotros" }]}
      />

      {/* Misión / Visión */}
      <Section bg="tierra">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-naranja">Misión</p>
              <h2 className="mt-3 text-2xl">Conectar para fortalecer raíces</h2>
              <p className="mt-3 text-pretty leading-relaxed text-verde-900/75">
                Promovemos la cooperación cultural, educativa y social entre comunidades de América
                Latina y Guinea Ecuatorial, fortaleciendo la identidad afro-hispana y generando
                oportunidades dignas a través de programas sostenibles y liderados por las propias
                comunidades.
              </p>
            </article>
            <article className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-naranja">Visión</p>
              <h2 className="mt-3 text-2xl">Un futuro compartido y justo</h2>
              <p className="mt-3 text-pretty leading-relaxed text-verde-900/75">
                Aspiramos a una red transatlántica donde la cultura, la educación y la naturaleza
                sean puentes de dignidad: comunidades que se reconocen en su origen común y construyen
                juntas, con equidad y esperanza, las próximas generaciones.
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
            eyebrow="Nuestra historia"
            title={<span id="historia-title">De una idea con raíces a una red transatlántica</span>}
            description="Un recorrido construido paso a paso, junto a comunidades y organizaciones aliadas."
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
                eyebrow="El significado de la ceiba"
                title={<span id="ceiba-title">El árbol que nos da raíz y nos da sombra</span>}
              />
              <div className="mt-5 space-y-4 text-pretty leading-relaxed text-verde-900/75">
                <p>
                  En numerosas culturas de África y América, la ceiba es un árbol sagrado: lugar de
                  encuentro, símbolo de protección y memoria comunitaria. Por eso ocupa el corazón de
                  nuestra identidad y de nuestro emblema.
                </p>
                <p>
                  Sus raíces, visibles sobre la tierra, representan los lazos que unen a quienes
                  comparten un mismo origen aunque los separe un océano. Su copa amplia recuerda que
                  el futuro debe dar sombra y refugio a todas las personas.
                </p>
                <p>
                  Reivindicar la ceiba es reconocer que nuestras historias están entrelazadas y que
                  cuidar la raíz es también sembrar futuro.
                </p>
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
            eyebrow="Lo que nos guía"
            title={<span id="valores-title">Nuestros valores</span>}
            description="Principios que orientan cada decisión, programa y alianza."
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
            eyebrow="Personas con propósito"
            title={<span id="equipo-title">Nuestro equipo</span>}
            description="Profesionales de ambas regiones que sostienen el trabajo cotidiano de la plataforma."
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
                  <p className="text-sm font-medium text-naranja">{member.role}</p>
                  <p className="mt-0.5 text-xs text-verde-900/55">{regionLabels[member.region]}</p>
                  <p className="mt-2 text-sm leading-relaxed text-verde-900/70">{member.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        title="Construyamos juntos el siguiente capítulo"
        description="Súmate como aliado, voluntario o donante. Cada vínculo fortalece la red que une a nuestras comunidades."
        primary={{ href: "/contacto", label: "Quiero colaborar" }}
        secondary={{ href: "/programas", label: "Ver programas" }}
      />
    </>
  );
}
