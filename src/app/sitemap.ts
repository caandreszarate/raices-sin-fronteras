import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { projects } from "@/lib/data/projects";
import { news } from "@/lib/data/news";
import { routing } from "@/i18n/routing";

/** URL con prefijo de idioma (es sin prefijo, resto con prefijo). */
function localized(path: string, locale: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path === "/" ? "" : path}` || siteConfig.url;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/nosotros",
    "/programas",
    "/proyectos",
    "/noticias",
    "/galeria",
    "/contacto",
    "/donar",
    "/privacidad",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: localized(path, locale),
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.8,
      });
    }
    for (const p of projects) {
      entries.push({
        url: localized(`/proyectos/${p.slug}`, locale),
        lastModified: new Date(p.startDate),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const n of news) {
      entries.push({
        url: localized(`/noticias/${n.slug}`, locale),
        lastModified: new Date(n.publishedAt),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
