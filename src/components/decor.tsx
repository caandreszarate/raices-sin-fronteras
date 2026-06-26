/**
 * Elementos gráficos derivados del branding: las raíces de la ceiba como
 * divisor de secciones y la ruta transatlántica punteada. Todos decorativos
 * (aria-hidden) y construidos en SVG para nitidez y peso mínimo.
 */

export function RootsDivider({
  className = "",
  flip = false,
  color = "var(--color-verde-profundo)",
}: {
  className?: string;
  flip?: boolean;
  color?: string;
}) {
  return (
    <div className={className} aria-hidden style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-12 w-full sm:h-16"
        fill="none"
      >
        {/* Raíces que descienden del tronco central, abriéndose hacia los lados */}
        <path
          d="M720 0c0 22-4 30-22 44-16 12-22 24-22 44 0 12-8 20-22 26-16 7-26 6-44 6M720 0c0 22 4 30 22 44 16 12 22 24 22 44 0 12 8 20 22 26 16 7 26 6 44 6M720 6c0 30-2 44-2 70 0 24-2 34-2 44M620 30c-30 10-60 16-110 18-40 1-70 10-110 24M820 30c30 10 60 16 110 18 40 1 70 10 110 24"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}

/** Línea de ruta punteada con dos nodos (América Latina ↔ Guinea Ecuatorial). */
export function RouteLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 40"
      className={className}
      fill="none"
      aria-hidden
      role="presentation"
    >
      <path
        d="M14 26C70 6 120 6 160 20s90 14 146-6"
        stroke="var(--color-dorado)"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <circle cx="14" cy="26" r="5" fill="var(--color-naranja)" />
      <circle cx="306" cy="14" r="5" fill="var(--color-verde)" />
    </svg>
  );
}

/** Banda de textura textil sutil para fondos de sección. */
export function TextileBand({ className = "" }: { className?: string }) {
  return <div className={`textile-pattern ${className}`} aria-hidden />;
}
