import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { projects } from "@/lib/data/projects";
import { news } from "@/lib/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/nosotros",
    "/programas",
    "/proyectos",
    "/noticias",
    "/galeria",
    "/contacto",
    "/donar",
    "/privacidad",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/proyectos/${p.slug}`,
    lastModified: new Date(p.startDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const newsRoutes = news.map((n) => ({
    url: `${base}/noticias/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...newsRoutes];
}
