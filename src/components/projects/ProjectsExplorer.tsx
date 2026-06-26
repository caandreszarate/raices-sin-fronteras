"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/types";
import { programs } from "@/lib/data/programs";
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
  const t = useTranslations("projects");
  const tprog = useTranslations("programTitles");
  const treg = useTranslations("common.region");
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
        aria-label={t("filtersLabel")}
      >
        <Field label={t("program")}>
          <select value={program} onChange={(e) => setProgram(e.target.value)} className={selectClass}>
            <option value="todos">{t("all")}</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {tprog(p.slug)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("regionFilter")}>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
            <option value="todos">{t("allF")}</option>
            {allRegions.map((r) => (
              <option key={r} value={r}>
                {treg(r)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("statusFilter")}>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
            <option value="todos">{t("all")}</option>
            {allStatuses.map((s) => (
              <option key={s} value={s}>
                {t(`status.${s}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("sort")}>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "reciente" | "antiguo")}
            className={selectClass}
          >
            <option value="reciente">{t("sortRecent")}</option>
            <option value="antiguo">{t("sortOldest")}</option>
          </select>
        </Field>
        <button
          type="button"
          onClick={reset}
          className="ml-auto rounded-full px-4 py-2 text-sm font-medium text-verde-700 underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
        >
          {t("clear")}
        </button>
      </div>

      <p className="mt-5 text-sm text-verde-900/60" aria-live="polite">
        {filtered.length === 1 ? t("countOne", { count: 1 }) : t("countOther", { count: filtered.length })}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-verde-profundo/20 bg-white/50 p-10 text-center">
          <p className="font-medium text-verde-profundo">{t("emptyTitle")}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full bg-verde-profundo px-5 py-2 text-sm font-semibold text-marfil hover:bg-verde-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
          >
            {t("emptyCta")}
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
