import Image from "next/image";
import { CeibaIcon, ProgramIcon } from "@/components/icons";

/**
 * Arte de portada con la ILUSTRACIÓN REAL del branding.
 *
 * Cuando se pasa `src` (recorte del emblema oficial), se renderiza la imagen con
 * un velo de color de marca para unificar el tono, ocultar esquinas y dar
 * legibilidad. Si no hay `src`, cae a un panel con gradiente + textura textil.
 */

const toneStyles: Record<string, { from: string; to: string; veil: string }> = {
  verde: { from: "var(--color-verde-600)", to: "var(--color-verde-900)", veil: "13,59,42" },
  "verde-600": { from: "var(--color-verde-500)", to: "var(--color-verde-800)", veil: "13,59,42" },
  "rojo-tierra": { from: "var(--color-rojo-tierra)", to: "var(--color-marron)", veil: "122,40,34" },
  dorado: { from: "var(--color-dorado)", to: "var(--color-marron)", veil: "122,78,45" },
  naranja: { from: "var(--color-naranja)", to: "var(--color-rojo-tierra)", veil: "175,72,18" },
  "azul-profundo": { from: "var(--color-azul-profundo)", to: "var(--color-verde-900)", veil: "11,29,58" },
  marron: { from: "var(--color-marron)", to: "var(--color-verde-900)", veil: "122,78,45" },
  salvia: { from: "var(--color-salvia)", to: "var(--color-verde-600)", veil: "13,59,42" },
  "verde-profundo": { from: "var(--color-verde-profundo)", to: "var(--color-azul-profundo)", veil: "13,59,42" },
};

export function CoverArt({
  tone = "verde",
  icon,
  label,
  src,
  className = "",
  ratio = "aspect-[16/10]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  tone?: string;
  icon?: string;
  label: string;
  src?: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const t = toneStyles[tone] ?? toneStyles.verde;

  // --- Con ilustración real del branding ---
  if (src) {
    return (
      <div className={`relative isolate overflow-hidden ${ratio} ${className}`}>
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* velo de color de marca para coherencia y legibilidad */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: `linear-gradient(150deg, rgba(${t.veil},0.15), rgba(${t.veil},0.62))` }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: `linear-gradient(to top, rgba(${t.veil},0.85), transparent)` }}
          aria-hidden
        />
        {/* arco dorado decorativo (referencia del emblema) */}
        <svg className="absolute -right-8 -top-10 h-36 w-36 opacity-40" viewBox="0 0 100 100" fill="none" aria-hidden>
          <circle cx="50" cy="50" r="40" stroke="var(--color-dorado)" strokeWidth="2.5" strokeDasharray="3 7" />
        </svg>
        {icon && (
          <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl bg-marfil/95 text-verde-profundo shadow-md backdrop-blur" aria-hidden>
            <ProgramIcon name={icon} className="h-5 w-5" />
          </span>
        )}
      </div>
    );
  }

  // --- Fallback (gradiente + textil) ---
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative isolate overflow-hidden ${ratio} ${className}`}
      style={{ background: `linear-gradient(140deg, ${t.from}, ${t.to})` }}
    >
      <div className="textile-pattern absolute inset-0 opacity-50" aria-hidden />
      <svg className="absolute -right-10 -top-12 h-44 w-44 opacity-30" viewBox="0 0 100 100" fill="none" aria-hidden>
        <circle cx="50" cy="50" r="40" stroke="var(--color-dorado)" strokeWidth="3" strokeDasharray="3 6" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-white/85" aria-hidden>
        {icon ? <ProgramIcon name={icon} className="h-12 w-12" strokeWidth={1.2} /> : <CeibaIcon className="h-12 w-12" strokeWidth={1.2} />}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
    </div>
  );
}
