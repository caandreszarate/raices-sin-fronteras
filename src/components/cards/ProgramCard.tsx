import { useTranslations } from "next-intl";
import type { Program } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/icons";
import { CoverArt } from "@/components/ui/CoverArt";
import { programImage } from "@/lib/images";

const accentText: Record<string, string> = {
  "rojo-tierra": "text-rojo-tierra",
  naranja: "text-naranja-700",
  dorado: "text-marron",
  verde: "text-verde-600",
  "verde-600": "text-verde-600",
  "azul-profundo": "text-azul-profundo",
};

export function ProgramCard({ program }: { program: Program }) {
  const t = useTranslations("common");
  return (
    <Link
      href={`/programas#${program.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-verde-profundo/10 bg-white/80 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-verde/30 hover:shadow-[var(--shadow-lift)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado"
    >
      {/* Banda ilustrada (recorte real del branding) */}
      <CoverArt
        tone={program.accent}
        src={programImage[program.slug]}
        icon={program.icon}
        label={`Ilustración del programa ${program.title}`}
        ratio="aspect-[16/9]"
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className={`text-xl font-semibold ${accentText[program.accent] ?? "text-verde-profundo"}`}>
          {program.title}
        </h3>
        <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-verde-900/70">
          {program.summary}
        </p>
        <span
          className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${
            accentText[program.accent] ?? "text-verde-600"
          }`}
        >
          {t("knowProgram")}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
