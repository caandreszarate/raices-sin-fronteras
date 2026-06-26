import Image from "next/image";
import { Link } from "@/i18n/navigation";

/**
 * Logo oficial: emblema de la ceiba (public/branding/logo-mark.svg, extraído del
 * logotipo institucional) + el wordmark "Raíces sin Fronteras" con el acento
 * manuscrito, replicando el logotipo del archivo de marca.
 *
 * `variant="dark"` para fondos claros (header), `variant="light"` para fondos
 * oscuros (footer). El emblema funciona sobre cualquier fondo (disco marfil).
 */
export function Logo({
  variant = "dark",
  withTagline = false,
}: {
  variant?: "dark" | "light";
  withTagline?: boolean;
}) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 rounded-lg"
      aria-label="Raíces sin Fronteras — Inicio"
    >
      <Image
        src="/branding/logo-mark.svg"
        alt=""
        width={48}
        height={48}
        priority
        className="h-11 w-11 shrink-0 transition-transform duration-200 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-bold tracking-tight">
          <span className={isLight ? "text-marfil" : "text-verde-profundo"}>Raíces </span>
          <span className="font-script text-base font-normal">
            <span className={isLight ? "text-salvia" : "text-verde"}>sin </span>
            <span className={isLight ? "text-naranja" : "text-rojo-tierra"}>Fronteras</span>
          </span>
        </span>
        {withTagline && (
          <span
            className={`mt-1.5 hidden whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.16em] sm:block ${
              isLight ? "text-verde-claro/80" : "text-verde-600/85"
            }`}
          >
            América Latina · Guinea Ecuatorial
          </span>
        )}
      </span>
    </Link>
  );
}
