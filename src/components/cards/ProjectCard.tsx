import Link from "next/link";
import type { Project } from "@/lib/types";
import { projectStatusLabels, regionLabels } from "@/lib/data/projects";
import { programTitle } from "@/lib/data/programs";
import { getProgram } from "@/lib/data/programs";
import { CoverArt } from "@/components/ui/CoverArt";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import { programImage } from "@/lib/images";

export function ProjectCard({ project }: { project: Project }) {
  const program = getProgram(project.program);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-verde-profundo/10 bg-white/70 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link
        href={`/proyectos/${project.slug}`}
        className="block focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado"
        aria-label={`Ver proyecto: ${project.title}`}
      >
        <CoverArt
          tone={project.cover}
          icon={program?.icon}
          src={programImage[project.program]}
          label={`Portada del proyecto ${project.title}`}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} label={projectStatusLabels[project.status]} />
          <Badge tone="neutral">{regionLabels[project.region]}</Badge>
        </div>
        <h3 className="text-lg font-semibold text-verde-profundo">
          <Link
            href={`/proyectos/${project.slug}`}
            className="transition-colors hover:text-verde-600 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-verde-900/70">
          {project.summary}
        </p>
        <dl className="mt-4 flex items-center justify-between border-t border-verde-profundo/10 pt-3 text-xs text-verde-900/60">
          <div>
            <dt className="sr-only">Programa</dt>
            <dd className="font-semibold text-verde-700">{programTitle(project.program)}</dd>
          </div>
          <div className="text-right">
            <dt className="sr-only">Año</dt>
            <dd>{project.country} · {project.year}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
