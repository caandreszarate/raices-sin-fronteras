import { getMessages } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Program, Project, NewsArticle, GalleryItem, TeamMember, Value } from "@/lib/types";
import { programs as programsData } from "@/lib/data/programs";
import { projects as projectsData } from "@/lib/data/projects";
import { news as newsData } from "@/lib/data/news";
import { gallery as galleryData } from "@/lib/data/gallery";
import { team as teamData, values as valuesData, milestones as milestonesData } from "@/lib/data/org";

/**
 * Capa de contenido localizado. El español (`es`) es la fuente: devuelve los
 * datos originales. Para el resto de idiomas, fusiona las traducciones del
 * catálogo `messages/<locale>.json` (namespace `content`) con los datos base;
 * cualquier campo sin traducir cae de vuelta al español.
 */

type ContentMessages = {
  programs?: Record<string, Partial<Record<"title" | "summary" | "description", string> & { goals: string[]; highlights: string[] }>>;
  projects?: Record<string, Partial<Record<"title" | "summary" | "country", string> & { body: string[]; impact: string[] }>>;
  news?: Record<string, Partial<Record<"title" | "excerpt", string> & { body: string[] }>>;
  gallery?: Record<string, Partial<Record<"title" | "event" | "alt", string>>>;
  team?: Record<string, Partial<Record<"role" | "bio", string>>>;
  values?: { title: string; description: string }[];
  milestones?: { title: string; description: string }[];
};

async function getContent(locale: Locale): Promise<ContentMessages> {
  if (locale === "es") return {};
  const messages = (await getMessages({ locale })) as { content?: ContentMessages };
  return messages.content ?? {};
}

export async function getPrograms(locale: Locale): Promise<Program[]> {
  const c = (await getContent(locale)).programs ?? {};
  return programsData.map((p) => {
    const o = c[p.slug];
    if (!o) return p;
    return {
      ...p,
      title: o.title ?? p.title,
      summary: o.summary ?? p.summary,
      description: o.description ?? p.description,
      goals: o.goals ?? p.goals,
      highlights: p.highlights.map((h, i) => ({ value: h.value, label: o.highlights?.[i] ?? h.label })),
    };
  });
}

export async function getProgram(locale: Locale, slug: string): Promise<Program | undefined> {
  return (await getPrograms(locale)).find((p) => p.slug === slug);
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const c = (await getContent(locale)).projects ?? {};
  return projectsData.map((p) => {
    const o = c[p.slug];
    if (!o) return p;
    return {
      ...p,
      title: o.title ?? p.title,
      summary: o.summary ?? p.summary,
      country: o.country ?? p.country,
      body: o.body ?? p.body,
      impact: p.impact.map((m, i) => ({ value: m.value, label: o.impact?.[i] ?? m.label })),
    };
  });
}

export async function getProject(locale: Locale, slug: string): Promise<Project | undefined> {
  return (await getProjects(locale)).find((p) => p.slug === slug);
}

export async function getFeaturedProjects(locale: Locale): Promise<Project[]> {
  return (await getProjects(locale)).filter((p) => p.featured);
}

export async function getNews(locale: Locale): Promise<NewsArticle[]> {
  const c = (await getContent(locale)).news ?? {};
  return newsData.map((n) => {
    const o = c[n.slug];
    if (!o) return n;
    return { ...n, title: o.title ?? n.title, excerpt: o.excerpt ?? n.excerpt, body: o.body ?? n.body };
  });
}

export async function getArticle(locale: Locale, slug: string): Promise<NewsArticle | undefined> {
  return (await getNews(locale)).find((n) => n.slug === slug);
}

export async function getFeaturedNews(locale: Locale): Promise<NewsArticle[]> {
  return (await getNews(locale)).filter((n) => n.featured);
}

export async function getGallery(locale: Locale): Promise<GalleryItem[]> {
  const c = (await getContent(locale)).gallery ?? {};
  return galleryData.map((g) => {
    const o = c[g.id];
    if (!o) return g;
    return { ...g, title: o.title ?? g.title, event: o.event ?? g.event, alt: o.alt ?? g.alt };
  });
}

export async function getTeam(locale: Locale): Promise<TeamMember[]> {
  const c = (await getContent(locale)).team ?? {};
  return teamData.map((m) => {
    const o = c[m.initials];
    if (!o) return m;
    return { ...m, role: o.role ?? m.role, bio: o.bio ?? m.bio };
  });
}

export async function getValues(locale: Locale): Promise<Value[]> {
  const c = (await getContent(locale)).values;
  if (!c) return valuesData;
  return valuesData.map((v, i) => ({ ...v, title: c[i]?.title ?? v.title, description: c[i]?.description ?? v.description }));
}

export async function getMilestones(locale: Locale) {
  const c = (await getContent(locale)).milestones;
  if (!c) return milestonesData;
  return milestonesData.map((m, i) => ({ ...m, title: c[i]?.title ?? m.title, description: c[i]?.description ?? m.description }));
}
