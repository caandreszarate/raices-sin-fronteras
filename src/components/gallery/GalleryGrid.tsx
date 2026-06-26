"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { GalleryItem } from "@/lib/types";
import { programs } from "@/lib/data/programs";
import { CoverArt } from "@/components/ui/CoverArt";
import { programImage } from "@/lib/images";

export function GalleryGrid({
  items,
  countries,
  years,
}: {
  items: GalleryItem[];
  countries: string[];
  years: number[];
}) {
  const t = useTranslations("gallery");
  const tprog = useTranslations("programTitles");
  const [program, setProgram] = useState<string>("todos");
  const [country, setCountry] = useState<string>("todos");
  const [year, setYear] = useState<string>("todos");

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (program === "todos" || i.program === program) &&
          (country === "todos" || i.country === country) &&
          (year === "todos" || String(i.year) === year),
      ),
    [items, program, country, year],
  );

  const reset = () => {
    setProgram("todos");
    setCountry("todos");
    setYear("todos");
  };

  const selectClass =
    "w-full rounded-full border border-verde-profundo/15 bg-white/80 px-4 py-2.5 text-sm text-verde-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado sm:w-auto sm:py-2";

  return (
    <div>
      <div
        className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-end"
        role="group"
        aria-label={t("filtersLabel")}
      >
        <Field label={t("program")}>
          <select value={program} onChange={(e) => setProgram(e.target.value)} className={selectClass}>
            <option value="todos">{t("allPrograms")}</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {tprog(p.slug)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("country")}>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectClass}>
            <option value="todos">{t("allCountries")}</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("year")}>
          <select value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
            <option value="todos">{t("allYears")}</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </Field>
        <button
          type="button"
          onClick={reset}
          className="w-full rounded-full px-4 py-2.5 text-sm font-medium text-verde-700 underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado sm:w-auto sm:py-2"
        >
          {t("clear")}
        </button>
      </div>

      <p className="mt-4 text-sm text-verde-900/60" aria-live="polite">
        {filtered.length === 1 ? t("countOne", { count: 1 }) : t("countOther", { count: filtered.length })}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-verde-profundo/10 bg-white/60 shadow-[var(--shadow-soft)]"
            >
              <CoverArt tone={item.tone} src={programImage[item.program]} label={item.alt} icon={item.program} ratio="aspect-square" />
              <div className="p-3">
                <p className="text-sm font-semibold text-verde-profundo">{item.title}</p>
                <p className="mt-0.5 text-xs text-verde-900/60">
                  {item.country} · {item.year}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-verde-profundo/20 bg-white/50 p-10 text-center">
          <p className="font-medium text-verde-profundo">{t("emptyTitle")}</p>
          <p className="mt-1 text-sm text-verde-900/60">{t("emptyText")}</p>
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
