import type { ReactNode } from "react";

const tones: Record<string, string> = {
  verde: "bg-verde-claro text-verde-700 border-verde/20",
  "verde-600": "bg-verde-claro text-verde-700 border-verde/20",
  naranja: "bg-naranja/12 text-naranja-700 border-naranja/25",
  dorado: "bg-dorado/15 text-marron border-dorado/30",
  "rojo-tierra": "bg-rojo-tierra/12 text-rojo-tierra border-rojo-tierra/25",
  "azul-profundo": "bg-azul-profundo/10 text-azul-profundo border-azul-profundo/20",
  marron: "bg-marron/12 text-marron border-marron/25",
  salvia: "bg-salvia/30 text-verde-700 border-verde/15",
  neutral: "bg-verde-claro/70 text-verde-900/80 border-verde-profundo/10",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: string;
  className?: string;
}) {
  const cls = tones[tone] ?? tones.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${cls} ${className}`}
    >
      {children}
    </span>
  );
}

const statusTone: Record<string, string> = {
  activo: "verde",
  "en-curso": "naranja",
  finalizado: "neutral",
  proximamente: "dorado",
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <Badge tone={statusTone[status] ?? "neutral"}>
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden
      />
      {label}
    </Badge>
  );
}
