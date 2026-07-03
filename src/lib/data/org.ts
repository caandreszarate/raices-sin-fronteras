import type { TeamMember, Value } from "@/lib/types";

/** Valores institucionales mostrados en Nosotros. */
export const values: Value[] = [
  {
    title: "Identidad",
    description:
      "Reconocemos y celebramos las raíces afro-hispanas como fuente de dignidad, memoria y pertenencia.",
    icon: "drum",
  },
  {
    title: "Cooperación",
    description:
      "Construimos en alianza: ninguna comunidad avanza sola y cada vínculo multiplica el impacto.",
    icon: "handshake",
  },
  {
    title: "Equidad",
    description:
      "Priorizamos a quienes históricamente han tenido menos acceso a oportunidades y a la palabra.",
    icon: "people",
  },
  {
    title: "Sostenibilidad",
    description:
      "Cuidamos la tierra y los saberes que la protegen, pensando en las próximas generaciones.",
    icon: "leaf",
  },
  {
    title: "Transparencia",
    description:
      "Rendimos cuentas con claridad: cada aporte se traduce en resultados verificables.",
    icon: "book",
  },
  {
    title: "Esperanza",
    description:
      "Trabajamos desde la convicción de que un futuro compartido y justo es posible y se construye hoy.",
    icon: "compass",
  },
];

/** Equipo fundador de la plataforma. */
export const team: TeamMember[] = [
  {
    name: "Nzo Edu Nfono",
    role: "Dirección General",
    region: "Guinea Ecuatorial",
    bio: "Gestor general del proyecto Raíces sin Fronteras.",
    initials: "NE",
  },
  {
    name: "Carlos Andrés Martínez",
    role: "Coordinación de Programa · Colombia",
    region: "America Latina",
    bio: "Especialista en coordinación de proyectos y educación intercultural.",
    initials: "CM",
  },
  {
    name: "Gabriel Peñaranda",
    role: "Coordinación de Programa · Venezuela",
    region: "America Latina",
    bio: "Especialista en coordinación de proyectos y educación intercultural.",
    initials: "GP",
  },
];

/**
 * Hoja de ruta de la plataforma (línea de tiempo en Nosotros).
 * Fases numeradas, sin fechas: reflejan honestamente el momento del proyecto.
 */
export const milestones: { year: string; title: string; description: string }[] = [
  {
    year: "01",
    title: "Una historia compartida",
    description:
      "La herencia que une a América Latina y Guinea Ecuatorial inspira la idea de una plataforma de encuentro afro-hispano.",
  },
  {
    year: "02",
    title: "Seis líneas de trabajo",
    description:
      "Cultura, educación, juventud, medio ambiente, cooperación y turismo de raíces: los caminos para traducir la historia común en futuro.",
  },
  {
    year: "03",
    title: "Hoy: tejiendo la red",
    description:
      "Fase de conexión. Presentamos la plataforma y construimos la red de personas y organizaciones fundadoras en ambas orillas.",
  },
  {
    year: "04",
    title: "Primeros proyectos",
    description:
      "Diseñar y poner en marcha las iniciativas piloto junto a los aliados que se sumen a la red.",
  },
];
