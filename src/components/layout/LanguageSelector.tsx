"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeNames, type Locale } from "@/i18n/routing";
import { CheckIcon } from "@/components/icons";

/** Selector de idioma accesible (es/en/fr/pt). */
export function LanguageSelector({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const t = useTranslations("langSelector");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const change = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  const isLight = variant === "light";
  const triggerColor = isLight
    ? "border-marfil/30 text-marfil hover:border-dorado hover:text-dorado"
    : "border-verde-profundo/20 text-verde-profundo hover:border-verde/40 bg-white/60";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("choose")}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado ${triggerColor}`}
      >
        <span aria-hidden>{localeNames[locale].flag}</span>
        <span className="uppercase">{locale}</span>
        <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-verde-profundo/10 bg-marfil py-1 shadow-[var(--shadow-lift)]"
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => change(l)}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm transition-colors hover:bg-verde-claro/60 focus-visible:bg-verde-claro/60 focus-visible:outline-none ${
                    active ? "font-semibold text-verde-profundo" : "text-verde-900/80"
                  }`}
                >
                  <span aria-hidden className="text-base">{localeNames[l].flag}</span>
                  <span className="flex-1">{localeNames[l].native}</span>
                  {active && <CheckIcon className="h-4 w-4 text-verde-600" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
