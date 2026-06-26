import Image from "next/image";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, HeartIcon } from "@/components/icons";
import { cut } from "@/lib/images";

/**
 * Hero editorial "El Encuentro" — composición asimétrica tipo portada:
 * panel oscuro con la tipografía protagonista + panel de imagen vívida del
 * branding, unidos por un medallón circular dorado en la costura central
 * (las dos orillas que se encuentran), arco dorado, ruta animada y cinta kente.
 */
export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  return (
    <section className="relative isolate grid overflow-hidden lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[clamp(620px,90vh,860px)]">
      {/* ───────── Panel de texto (oscuro) ───────── */}
      <div className="hero-panel relative order-2 flex items-center px-6 py-16 sm:px-10 lg:order-1 lg:py-20 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16">
        {/* textura textil + arco dorado decorativos */}
        <div className="textile-pattern pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
        <svg
          className="pointer-events-none absolute -left-24 top-8 h-72 w-72 opacity-30"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden
        >
          <circle cx="50" cy="50" r="46" stroke="var(--color-dorado)" strokeWidth="1.5" strokeDasharray="2 6" />
          <circle cx="50" cy="50" r="34" stroke="var(--color-dorado)" strokeWidth="1" strokeDasharray="1 8" opacity="0.6" />
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-xl animate-fade-up lg:mx-0">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-dorado/40 bg-verde-900/40 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-dorado">
            <span className="h-1.5 w-1.5 rounded-full bg-naranja" aria-hidden />
            {t("eyebrow")}
          </span>

          <h1 className="mt-6 font-serif text-marfil">
            <span className="block text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              {t("title1")}
            </span>
            <span className="block text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              {t("title2")}
            </span>
            <span className="mt-2 block font-script text-4xl leading-tight text-naranja sm:text-5xl lg:text-6xl">
              {t("titleScript")}
            </span>
          </h1>

          <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-verde-claro/90">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/nosotros" variant="primary" size="lg">
              {tc("knowUs")}
              <ArrowRightIcon className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink
              href="/donar"
              variant="outline"
              size="lg"
              className="border-marfil/40 text-marfil hover:border-marfil hover:bg-marfil/10"
            >
              <HeartIcon className="h-5 w-5" />
              {tc("donateNow")}
            </ButtonLink>
          </div>

          {/* Dos orillas conectadas por la ruta animada */}
          <div className="mt-10 flex items-center gap-3 border-t border-marfil/15 pt-6 text-xs font-semibold uppercase tracking-wider text-verde-claro/80">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-naranja" aria-hidden />
              {t("shoreLatam")}
            </span>
            <svg className="h-3 w-16 shrink-0" viewBox="0 0 80 12" fill="none" aria-hidden>
              <path
                d="M2 6h76"
                stroke="var(--color-dorado)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="2 7"
                className="route-animate"
              />
            </svg>
            <span className="flex items-center gap-2">
              {t("shoreGuinea")}
              <span className="h-2 w-2 rounded-full bg-verde-500" aria-hidden />
            </span>
          </div>
        </div>
      </div>

      {/* ───────── Panel de imagen (vívido) ───────── */}
      <div className="relative order-1 h-[46vh] min-h-[320px] overflow-hidden lg:order-2 lg:h-auto lg:min-h-0">
        <Image
          src={cut.guinea}
          alt="Mujer ecuatoguineana con turbante de textil kente frente a una costa tropical con palmeras al atardecer, parte del emblema de Raíces sin Fronteras."
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-top"
        />
        {/* velo para fundir con el panel oscuro */}
        <div className="hero-image-veil absolute inset-0" aria-hidden />
        {/* arco dorado superior */}
        <svg className="absolute -right-10 -top-10 h-44 w-44 opacity-50" viewBox="0 0 100 100" fill="none" aria-hidden>
          <circle cx="50" cy="50" r="44" stroke="var(--color-dorado)" strokeWidth="2.5" strokeDasharray="3 7" />
        </svg>
        {/* cinta kente vertical en el borde */}
        <div className="kente-ribbon-v absolute inset-y-0 right-0 w-3 opacity-90 sm:w-4" aria-hidden />
      </div>

      {/* ───────── Medallón central (las dos orillas se encuentran) ───────── */}
      <div className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <div className="relative">
          <div className="halo-pulse absolute -inset-4 rounded-full bg-dorado/30 blur-xl" aria-hidden />
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-[5px] border-marfil shadow-[0_18px_40px_-12px_rgba(11,29,58,0.7)] ring-2 ring-dorado/70">
            <Image
              src={cut.latam}
              alt="Hombre latinoamericano de perfil con una catedral colonial y montañas andinas al fondo, parte del emblema de Raíces sin Fronteras."
              fill
              priority
              sizes="160px"
              className="object-cover"
            />
          </div>
          {/* sello dorado */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-dorado/60 bg-verde-profundo px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-dorado">
            {t("twoShores")}
          </span>
        </div>
      </div>

      {/* cinta kente horizontal al pie de todo el hero */}
      <div className="kente-ribbon-h absolute inset-x-0 bottom-0 z-20 h-2.5 opacity-90" aria-hidden />
    </section>
  );
}
