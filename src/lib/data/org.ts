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

/** Equipo mock. En producción: tabla `team` o CMS. */
export const team: TeamMember[] = [
  {
    name: "Adaeze Nkili",
    role: "Dirección General",
    region: "Guinea Ecuatorial",
    bio: "Gestora cultural con 15 años de trayectoria en cooperación internacional y patrimonio.",
    initials: "AN",
  },
  {
    name: "Mateo Quiñones",
    role: "Coordinación de Programas",
    region: "America Latina",
    bio: "Especialista en desarrollo comunitario y educación intercultural en el Pacífico colombiano.",
    initials: "MQ",
  },
  {
    name: "Sara Obono",
    role: "Cultura y Patrimonio",
    region: "Guinea Ecuatorial",
    bio: "Etnomusicóloga dedicada a la documentación de tradiciones orales y musicales.",
    initials: "SO",
  },
  {
    name: "Daniela Arboleda",
    role: "Juventud y Liderazgo",
    region: "America Latina",
    bio: "Educadora popular y mentora de redes juveniles transatlánticas.",
    initials: "DA",
  },
  {
    name: "Ismael Eyenga",
    role: "Medio Ambiente",
    region: "Guinea Ecuatorial",
    bio: "Ingeniero forestal enfocado en restauración con especies nativas y agroforestería.",
    initials: "IE",
  },
  {
    name: "Carolina Mosquera",
    role: "Cooperación y Alianzas",
    region: "America Latina",
    bio: "Profesional en relaciones institucionales y cooperación Sur-Sur.",
    initials: "CM",
  },
];

/** Hitos de la historia institucional (línea de tiempo en Nosotros). */
export const milestones: { year: string; title: string; description: string }[] = [
  {
    year: "2019",
    title: "Una idea con raíces",
    description:
      "Un grupo de gestoras culturales y educadoras de ambas orillas imagina una plataforma de encuentro afro-hispano.",
  },
  {
    year: "2021",
    title: "Primeros proyectos",
    description:
      "Arrancan las iniciativas piloto de cultura y educación en Guinea Ecuatorial, Colombia y Ecuador.",
  },
  {
    year: "2023",
    title: "Red transatlántica",
    description:
      "Se consolida la red de organizaciones aliadas y nace el programa de Jóvenes Embajadores.",
  },
  {
    year: "2025",
    title: "Seis programas activos",
    description:
      "La plataforma opera sus seis líneas en nueve países, con miles de personas beneficiadas.",
  },
];
