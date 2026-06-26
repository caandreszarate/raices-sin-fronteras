import type { Project } from "@/lib/types";

/** Datos mock de proyectos. En producción: tabla `projects` o CMS. */
export const projects: Project[] = [
  {
    slug: "ceibas-de-la-memoria",
    title: "Ceibas de la Memoria",
    program: "medio-ambiente",
    region: "Guinea Ecuatorial",
    country: "Guinea Ecuatorial",
    status: "activo",
    year: 2025,
    startDate: "2025-02-10",
    summary:
      "Reforestación de ceibas y especies nativas junto a comunidades de Bioko, uniendo restauración ecológica y memoria cultural.",
    body: [
      "Ceibas de la Memoria nace para restaurar corredores ecológicos en la isla de Bioko mientras se rescata el valor simbólico de la ceiba, el árbol que en nuestra identidad representa el encuentro entre raíces africanas y americanas.",
      "Cada árbol se siembra con una familia anfitriona que documenta una historia comunitaria asociada al territorio, creando un archivo vivo de memoria ambiental y cultural.",
      "El proyecto combina viveros comunitarios, formación en agroforestería y jornadas escolares de educación ambiental, generando empleo local y arraigo.",
    ],
    cover: "verde",
    impact: [
      { label: "Ceibas sembradas", value: "4.500" },
      { label: "Familias participantes", value: "120" },
      { label: "Escuelas vinculadas", value: "9" },
    ],
    partners: ["Universidad Nacional de Guinea Ecuatorial", "Red de Viveros de Bioko"],
    featured: true,
  },
  {
    slug: "tambores-que-cruzan-el-atlantico",
    title: "Tambores que Cruzan el Atlántico",
    program: "cultura",
    region: "Transatlantico",
    country: "Colombia · Guinea Ecuatorial",
    status: "en-curso",
    year: 2025,
    startDate: "2025-04-01",
    summary:
      "Residencia musical que documenta y fusiona percusión afrocolombiana y ritmos bubi y fang en un repertorio común.",
    body: [
      "El proyecto reúne a percusionistas del Pacífico colombiano con maestros tradicionales de Guinea Ecuatorial para investigar las raíces compartidas de sus ritmos.",
      "Durante seis meses se realizan residencias presenciales y virtuales que culminan en un álbum colaborativo y una gira de conciertos didácticos.",
      "Todo el material sonoro y audiovisual se publica con licencia abierta para escuelas de música de ambas regiones.",
    ],
    cover: "rojo-tierra",
    impact: [
      { label: "Artistas", value: "24" },
      { label: "Piezas grabadas", value: "15" },
      { label: "Conciertos", value: "8" },
    ],
    partners: ["Casa de la Cultura de Bata", "Colectivo Marimba Viva"],
    featured: true,
  },
  {
    slug: "aulas-sin-fronteras",
    title: "Aulas sin Fronteras",
    program: "educacion",
    region: "America Latina",
    country: "Ecuador",
    status: "activo",
    year: 2024,
    startDate: "2024-09-15",
    summary:
      "Bibliotecas comunitarias y alfabetización digital en territorios afroecuatorianos del valle del Chota.",
    body: [
      "Aulas sin Fronteras dota de libros, conectividad y formación docente a comunidades afrodescendientes, integrando contenidos sobre historia y cultura compartida con Guinea Ecuatorial.",
      "El programa forma a docentes en pedagogías culturalmente pertinentes y abre clubes de lectura intergeneracionales.",
      "Se prioriza el acceso de niñas y adolescentes a competencias digitales con perspectiva de equidad.",
    ],
    cover: "dorado",
    impact: [
      { label: "Estudiantes", value: "1.800" },
      { label: "Bibliotecas", value: "6" },
      { label: "Docentes formados", value: "75" },
    ],
    partners: ["Red de Bibliotecas del Chota", "Ministerio de Educación (mesa técnica)"],
    featured: true,
  },
  {
    slug: "jovenes-embajadores",
    title: "Jóvenes Embajadores de las Raíces",
    program: "juventud",
    region: "Transatlantico",
    country: "Regional",
    status: "en-curso",
    year: 2025,
    startDate: "2025-01-20",
    summary:
      "Red de liderazgo juvenil con mentorías, becas e intercambios entre nueve países de las dos regiones.",
    body: [
      "Una cohorte anual de jóvenes recibe formación en liderazgo, gestión de proyectos e identidad cultural.",
      "Cada participante diseña e implementa una iniciativa comunitaria con acompañamiento de mentores.",
      "La red sostiene intercambios virtuales mensuales y un encuentro presencial anual rotativo.",
    ],
    cover: "naranja",
    impact: [
      { label: "Embajadores", value: "90" },
      { label: "Iniciativas locales", value: "38" },
      { label: "Países", value: "9" },
    ],
    partners: ["Plataformas juveniles aliadas", "Programa de Becas Raíces"],
  },
  {
    slug: "ruta-del-reencuentro",
    title: "Ruta del Reencuentro",
    program: "turismo-de-raices",
    region: "Guinea Ecuatorial",
    country: "Guinea Ecuatorial",
    status: "proximamente",
    year: 2026,
    startDate: "2026-03-01",
    summary:
      "Itinerario de turismo comunitario y de memoria que conecta a la diáspora con territorios de origen.",
    body: [
      "La Ruta del Reencuentro diseña experiencias responsables que combinan patrimonio histórico, naturaleza y convivencia con comunidades anfitrionas.",
      "Las familias locales reciben formación en hospitalidad sostenible y gestión de ingresos comunitarios.",
      "El itinerario incorpora espacios de memoria sobre la historia transatlántica con enfoque de dignidad.",
    ],
    cover: "azul-profundo",
    impact: [
      { label: "Rutas piloto", value: "3" },
      { label: "Familias anfitrionas", value: "40" },
      { label: "Guías formados", value: "22" },
    ],
    partners: ["Asociaciones comunitarias de turismo", "Operadores responsables aliados"],
  },
  {
    slug: "mesa-de-cooperacion-sur-sur",
    title: "Mesa de Cooperación Sur-Sur",
    program: "cooperacion",
    region: "Transatlantico",
    country: "Regional",
    status: "finalizado",
    year: 2024,
    startDate: "2024-03-10",
    summary:
      "Espacio de articulación que produjo siete acuerdos de cooperación entre organizaciones de ambas regiones.",
    body: [
      "La Mesa reunió a organizaciones, gobiernos locales y academia para identificar prioridades comunes y oportunidades de cooperación.",
      "El proceso derivó en acuerdos de transferencia de conocimiento en educación, cultura y medio ambiente.",
      "Se publicó una hoja de ruta de cooperación Sur-Sur 2025–2027 de acceso abierto.",
    ],
    cover: "verde",
    impact: [
      { label: "Acuerdos firmados", value: "7" },
      { label: "Organizaciones", value: "31" },
      { label: "Países", value: "8" },
    ],
    partners: ["Red de ONG transatlántica", "Universidades aliadas"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

export const projectStatusLabels: Record<Project["status"], string> = {
  activo: "Activo",
  "en-curso": "En curso",
  finalizado: "Finalizado",
  proximamente: "Próximamente",
};

export const regionLabels: Record<Project["region"], string> = {
  "America Latina": "América Latina",
  "Guinea Ecuatorial": "Guinea Ecuatorial",
  Transatlantico: "Transatlántico",
};
