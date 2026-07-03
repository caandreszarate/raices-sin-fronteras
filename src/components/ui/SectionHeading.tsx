import type { ReactNode } from "react";
import { RouteLine } from "@/components/decor";

/**
 * Encabezado de sección reutilizable, con sobretítulo (eyebrow), título serif
 * y descripción opcional. `align` controla centrado.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "dark",
  withRoute = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  variant?: "dark" | "light";
  withRoute?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  const isLight = variant === "light";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            isLight ? "text-dorado" : "text-rojo-tierra"
          }`}
        >
          <span className="h-px w-6 bg-current opacity-60" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag
        className={`text-balance text-3xl font-semibold sm:text-4xl ${
          isLight ? "text-marfil" : "text-verde-profundo"
        }`}
      >
        {title}
      </Tag>
      {withRoute && (
        <RouteLine className={`mt-4 h-6 w-44 ${align === "center" ? "mx-auto" : ""}`} />
      )}
      {description && (
        <p
          className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${
            isLight ? "text-verde-claro/90" : "text-verde-900/75"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
