"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { programs } from "@/lib/data/programs";
import { projectStatusLabels, regionLabels } from "@/lib/data/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";

const allStatuses: Project["status"][] = ["activo", "en-curso", "finalizado", "proximamente"];
const allRegions: Project["region"][] = ["America Latina", "Guinea Ecuatorial", "Transatlantico"];

export function ProjectsExplorer({
  projects,
  initialProgram = "todos",
}: {
  projects: Project[];
  initialProgram?: string;
}) {
  const [program, setProgram] = useState(initialProgram);
  const [region, setRegion] = useState("todos");
  const [status, setStatus] = useState("todos");
  const [sort, setSort] = useState<"reciente" | "antiguo">("reciente");

  const filtered = useMemo(() => {
    const list = projects.filter(
      (p) =>
        (program === "todos" || p.program === program) &&
        (region === "todos" || p.region === region) &&
        (status === "todos" || p.status === status),
    );
    return list.sort((a, b) =>
      sort === "reciente"
        ? +new Date(b.startDate) - +new Date(a.startDate)
        : +new Date(a.startDate) - +new Date(b.startDate),
    );
  }, [projects, program, region, status, sort]);

  const reset = () => {
    setProgram("todos");
    setRegion("todos");
    setStatus("todos");
    setSort("reciente");
  };

  const selectClass =
    "rounded-full border border-verde-profundo/15 bg-white/80 px-4 py-2 text-sm text-verde-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado";

  return (
    <div>
      <div
        className="flex flex-wrap items-end gap-3 rounded-2xl border border-verde-profundo/10 bg-verde-claro/40 p-4"
        role="group"
        aria-label="Filtros de proyectos"
      >
        <Field label="Programa">
          <select value={program} onChange={(e) => setProgram(e.target.value)} className={selectClass}>
            <option value="todos">Todos</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Región">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
            <option value="todos">Todas</option>
            {allRegions.map((r) => (
              <option key={r} value={r}>
                {regionLabels[r]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estado">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
            <option value="todos">Todos</option>
            {allStatuses.map((s) => (
              <option key={s} value={s}>
                {projectStatusLabels[s]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Orden">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "reciente" | "antiguo")}
            className={selectClass}
          >
            <option value="reciente">Más recientes</option>
            <option value="antiguo">Más antiguos</option>
          </select>
        </Field>
        <button
          type="button"
          onClick={reset}
          className="ml-auto rounded-full px-4 py-2 text-sm font-medium text-verde-700 underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
        >
          Limpiar
        </button>
      </div>

      <p className="mt-5 text-sm text-verde-900/60" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "proyecto" : "proyectos"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-verde-profundo/20 bg-white/50 p-10 text-center">
          <p className="font-medium text-verde-profundo">No encontramos proyectos con estos filtros</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full bg-verde-profundo px-5 py-2 text-sm font-semibold text-marfil hover:bg-verde-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
          >
            Ver todos los proyectos
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-verde-900/55">
      {label}
      {children}
    </label>
  );
}
