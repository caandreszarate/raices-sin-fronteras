import type { ReactNode } from "react";

/** Contenedor centrado con ancho máximo consistente. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Sección con espaciado vertical estándar y fondo opcional. */
export function Section({
  children,
  className = "",
  bg = "default",
  id,
  labelledby,
}: {
  children: ReactNode;
  className?: string;
  bg?: "default" | "soft" | "tierra" | "white";
  id?: string;
  labelledby?: string;
}) {
  const backgrounds: Record<string, string> = {
    default: "",
    soft: "bg-verde-claro/40",
    tierra: "gradient-tierra",
    white: "bg-white/60",
  };
  return (
    <section
      id={id}
      aria-labelledby={labelledby}
      className={`py-16 sm:py-20 lg:py-24 ${backgrounds[bg]} ${className}`}
    >
      {children}
    </section>
  );
}
