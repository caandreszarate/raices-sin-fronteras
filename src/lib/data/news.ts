import type { NewsArticle } from "@/lib/types";

/** Datos mock de noticias. En producción: tabla `news` o CMS headless. */
export const news: NewsArticle[] = [
  {
    slug: "encuentro-transatlantico-malabo-2026",
    title: "Malabo acogerá el Encuentro Transatlántico de Raíces 2026",
    excerpt:
      "Más de 200 representantes de cultura, educación y cooperación de nueve países se reunirán para tejer la agenda común afro-hispana.",
    category: "Institucional",
    author: "Equipo de Comunicación",
    publishedAt: "2026-05-28",
    readingMinutes: 4,
    cover: "verde-profundo",
    tags: ["encuentro", "cooperación", "agenda 2026"],
    body: [
      "Raíces sin Fronteras anunció que la ciudad de Malabo será sede del Encuentro Transatlántico de Raíces 2026, un espacio que reunirá a organizaciones, artistas, docentes y jóvenes líderes de América Latina y Guinea Ecuatorial.",
      "Durante tres días, las delegaciones trabajarán en mesas temáticas de cultura, educación, juventud, medio ambiente, cooperación y turismo de raíces, con el objetivo de consolidar una hoja de ruta compartida para los próximos tres años.",
      "El encuentro incluirá una muestra cultural abierta al público con música, gastronomía y exposiciones de patrimonio, reafirmando que las raíces compartidas son también una celebración viva.",
    ],
    featured: true,
  },
  {
    slug: "ceiba-simbolo-de-identidad",
    title: "La ceiba: por qué eligimos este árbol como símbolo de identidad",
    excerpt:
      "Sus raíces profundas y su copa amplia narran la historia de comunidades que crecen unidas a ambos lados del Atlántico.",
    category: "Cultura",
    author: "Lucía Mbomío",
    publishedAt: "2026-05-12",
    readingMinutes: 5,
    cover: "verde",
    tags: ["ceiba", "identidad", "patrimonio"],
    body: [
      "En muchas culturas de África y América, la ceiba es un árbol sagrado: punto de encuentro, refugio y memoria de las comunidades. Por eso ocupa el corazón de nuestra identidad visual.",
      "Sus raíces, que se extienden visibles sobre la tierra, representan los vínculos que sostienen a quienes comparten un origen común aunque los separe un océano.",
      "Reivindicar la ceiba es reconocer que nuestras historias están entrelazadas y que el futuro también se construye cuidando lo que nos da raíz.",
    ],
    featured: true,
  },
  {
    slug: "becas-juventud-2026-abiertas",
    title: "Abiertas las becas de liderazgo juvenil 2026",
    excerpt:
      "Jóvenes de 18 a 28 años de ambas regiones pueden postular a la nueva cohorte de Embajadores de las Raíces.",
    category: "Juventud",
    author: "Programa Juventud",
    publishedAt: "2026-04-30",
    readingMinutes: 3,
    cover: "naranja",
    tags: ["becas", "juventud", "convocatoria"],
    body: [
      "La convocatoria 2026 del programa Jóvenes Embajadores de las Raíces ya está abierta. Buscamos liderazgos comprometidos con la cultura, la educación y la sostenibilidad.",
      "Las personas seleccionadas reciben formación, mentoría y apoyo económico para implementar una iniciativa comunitaria en su territorio.",
      "Las postulaciones se reciben hasta agotar los cupos por región; recomendamos postular con anticipación.",
    ],
  },
  {
    slug: "biblioteca-comunitaria-chota",
    title: "Una nueva biblioteca comunitaria florece en el valle del Chota",
    excerpt:
      "El proyecto Aulas sin Fronteras inaugura su sexto espacio de lectura con conectividad y contenidos interculturales.",
    category: "Educación",
    author: "Programa Educación",
    publishedAt: "2026-04-08",
    readingMinutes: 4,
    cover: "dorado",
    tags: ["educación", "bibliotecas", "Ecuador"],
    body: [
      "La comunidad afroecuatoriana del valle del Chota cuenta con una nueva biblioteca equipada con libros, computadoras y acceso a internet.",
      "El espacio ofrece clubes de lectura intergeneracionales y talleres de alfabetización digital con enfoque de equidad de género.",
      "Con esta apertura, el proyecto Aulas sin Fronteras suma seis bibliotecas comunitarias activas.",
    ],
  },
  {
    slug: "cooperacion-sur-sur-hoja-de-ruta",
    title: "Publicamos la hoja de ruta de cooperación Sur-Sur 2025–2027",
    excerpt:
      "Un documento de acceso abierto que orienta las alianzas entre organizaciones de América Latina y Guinea Ecuatorial.",
    category: "Cooperación",
    author: "Equipo de Cooperación",
    publishedAt: "2026-03-19",
    readingMinutes: 6,
    cover: "verde-600",
    tags: ["cooperación", "Sur-Sur", "publicación"],
    body: [
      "Tras meses de trabajo conjunto, la Mesa de Cooperación Sur-Sur publicó su hoja de ruta para el periodo 2025–2027.",
      "El documento prioriza la transferencia de conocimiento en educación, cultura y medio ambiente, así como el fortalecimiento institucional de organizaciones locales.",
      "El material está disponible de forma abierta para que cualquier organización pueda sumarse a las iniciativas propuestas.",
    ],
  },
  {
    slug: "reforestacion-bioko-supera-meta",
    title: "Reforestación en Bioko supera la meta anual de siembra",
    excerpt:
      "El proyecto Ceibas de la Memoria alcanzó 4.500 árboles sembrados junto a 120 familias anfitrionas.",
    category: "Medio Ambiente",
    author: "Programa Medio Ambiente",
    publishedAt: "2026-02-25",
    readingMinutes: 3,
    cover: "verde",
    tags: ["medio ambiente", "reforestación", "Bioko"],
    body: [
      "El proyecto Ceibas de la Memoria celebró haber superado su meta anual de siembra con 4.500 árboles nativos plantados en la isla de Bioko.",
      "Cada árbol fue sembrado junto a una familia que documentó una historia comunitaria asociada al territorio.",
      "El equipo proyecta ampliar los viveros comunitarios para la próxima temporada de siembra.",
    ],
  },
];

export function getArticle(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}

export const featuredNews = news.filter((n) => n.featured);

export const newsCategories: NewsArticle["category"][] = [
  "Institucional",
  "Cultura",
  "Educación",
  "Juventud",
  "Medio Ambiente",
  "Cooperación",
];
