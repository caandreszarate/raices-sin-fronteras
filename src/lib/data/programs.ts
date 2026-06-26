import type { Program } from "@/lib/types";

/**
 * Los seis programas del branding (íconos: tambor, personas, libro, planta,
 * manos, brújula). En producción provendrían de un CMS o tabla `programs`.
 */
export const programs: Program[] = [
  {
    slug: "cultura",
    title: "Cultura",
    icon: "drum",
    accent: "rojo-tierra",
    summary:
      "Preservamos y compartimos las tradiciones, lenguas, músicas y memorias que unen ambas orillas del Atlántico.",
    description:
      "Documentamos patrimonio inmaterial, impulsamos residencias de artistas y producimos encuentros donde la herencia africana y latinoamericana dialoga: percusión, oralidad, danza, gastronomía y textil. La cultura es la raíz visible que nos identifica como una sola comunidad extendida en dos continentes.",
    goals: [
      "Registrar y digitalizar tradiciones orales y musicales en riesgo.",
      "Crear residencias de intercambio entre artistas de Guinea Ecuatorial y América Latina.",
      "Producir festivales y exposiciones itinerantes de patrimonio compartido.",
    ],
    highlights: [
      { label: "Tradiciones documentadas", value: "120+" },
      { label: "Artistas vinculados", value: "85" },
      { label: "Países", value: "9" },
    ],
  },
  {
    slug: "juventud",
    title: "Juventud",
    icon: "people",
    accent: "naranja",
    summary:
      "Acompañamos a jóvenes líderes para que transformen sus comunidades con identidad, voz y oportunidades reales.",
    description:
      "Formamos liderazgos juveniles con perspectiva intercultural a través de mentorías, becas, laboratorios de innovación social y redes de intercambio. Creemos que la juventud afro-hispana es el puente que sostendrá el futuro compartido entre ambas regiones.",
    goals: [
      "Mentorías y becas para liderazgos juveniles emergentes.",
      "Laboratorios de innovación social y emprendimiento cultural.",
      "Red transatlántica de jóvenes embajadores de las raíces.",
    ],
    highlights: [
      { label: "Jóvenes formados", value: "1.400" },
      { label: "Becas activas", value: "60" },
      { label: "Mentoras y mentores", value: "45" },
    ],
  },
  {
    slug: "educacion",
    title: "Educación",
    icon: "book",
    accent: "dorado",
    summary:
      "Llevamos educación de calidad, bilingüe e intercultural, a comunidades con raíces compartidas.",
    description:
      "Apoyamos escuelas, bibliotecas comunitarias y programas de alfabetización digital. Diseñamos materiales que reconocen la historia afrodescendiente y guineoecuatoriana, fortaleciendo la autoestima cultural y el acceso al conocimiento como derecho.",
    goals: [
      "Dotar bibliotecas y aulas comunitarias con material intercultural.",
      "Formar docentes en pedagogías culturalmente pertinentes.",
      "Ampliar la alfabetización digital en zonas rurales.",
    ],
    highlights: [
      { label: "Estudiantes beneficiados", value: "6.200" },
      { label: "Bibliotecas apoyadas", value: "18" },
      { label: "Docentes formados", value: "230" },
    ],
  },
  {
    slug: "medio-ambiente",
    title: "Medio Ambiente",
    icon: "leaf",
    accent: "verde",
    summary:
      "Protegemos la naturaleza tropical y los saberes ancestrales que cuidan la tierra y el agua.",
    description:
      "Promovemos reforestación con especies nativas —como la ceiba, árbol símbolo de nuestra identidad—, agricultura regenerativa y gestión comunitaria del agua. Unimos ciencia y conocimiento ancestral para sostener ecosistemas y medios de vida.",
    goals: [
      "Reforestar con especies nativas y proteger la ceiba como símbolo vivo.",
      "Impulsar agricultura regenerativa liderada por comunidades.",
      "Fortalecer la gestión comunitaria del agua y los bosques.",
    ],
    highlights: [
      { label: "Árboles sembrados", value: "34.000" },
      { label: "Hectáreas en manejo", value: "910" },
      { label: "Comunidades", value: "27" },
    ],
  },
  {
    slug: "cooperacion",
    title: "Cooperación",
    icon: "handshake",
    accent: "verde-600",
    summary:
      "Tejemos alianzas entre instituciones, gobiernos locales y organizaciones para multiplicar el impacto.",
    description:
      "Articulamos cooperación Sur-Sur entre actores de América Latina y Guinea Ecuatorial: transferencia de conocimiento, proyectos conjuntos y fortalecimiento institucional. La cooperación convierte raíces compartidas en resultados concretos y sostenibles.",
    goals: [
      "Facilitar cooperación Sur-Sur y transferencia de conocimiento.",
      "Fortalecer capacidades de organizaciones locales.",
      "Movilizar recursos hacia proyectos de alto impacto comunitario.",
    ],
    highlights: [
      { label: "Alianzas activas", value: "52" },
      { label: "Organizaciones aliadas", value: "73" },
      { label: "Proyectos conjuntos", value: "40" },
    ],
  },
  {
    slug: "turismo-de-raices",
    title: "Turismo de Raíces",
    icon: "compass",
    accent: "azul-profundo",
    summary:
      "Diseñamos rutas de reencuentro que permiten a las personas reconectar con su origen y su historia.",
    description:
      "Creamos experiencias de turismo comunitario y memorial que honran la ruta transatlántica: encuentros con comunidades, patrimonio histórico y naturaleza. Un turismo que genera ingresos locales, dignifica la historia y reconstruye lazos familiares y culturales.",
    goals: [
      "Diseñar rutas de turismo comunitario y de memoria.",
      "Capacitar a comunidades anfitrionas en hospitalidad sostenible.",
      "Conectar a la diáspora con sus territorios de origen.",
    ],
    highlights: [
      { label: "Rutas diseñadas", value: "12" },
      { label: "Viajeros recibidos", value: "2.100" },
      { label: "Familias anfitrionas", value: "140" },
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function programTitle(slug: string): string {
  return getProgram(slug)?.title ?? slug;
}
