import Image from "next/image";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";
import { cut } from "@/lib/images";

/**
 * Hero institucional de dos paneles: texto sobre fondo verde profundo e
 * ilustración del branding a la derecha. Composición sobria — un solo acento
 * tipográfico (cursiva serif en naranja) y la línea "dos orillas" como cierre.
 */
export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  return (
    <section className="relative isolate grid overflow-hidden lg:grid-cols-[1.05fr_0.95fr] lg:min-h-[clamp(560px,80vh,780px)]">
      {/* ───────── Panel de texto (oscuro) ───────── */}
      <div className="hero-panel relative order-2 flex items-center px-6 py-16 sm:px-10 lg:order-1 lg:py-20 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16">
        <div className="relative z-10 mx-auto w-full max-w-xl animate-fade-up lg:mx-0">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-dorado">
            <span className="h-px w-6 bg-current opacity-60" aria-hidden />
            {t("eyebrow")}
          </p>

          <h1 className="mt-5 font-serif text-marfil">
            <span className="block text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {t("title1")} {t("title2")}
            </span>
            <span className="mt-2 block text-4xl font-medium italic leading-tight text-naranja sm:text-5xl lg:text-6xl">
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
              href="/contacto"
              variant="outline"
              size="lg"
              className="border-marfil/50 text-marfil hover:border-marfil hover:bg-marfil/10"
            >
              {tc("contactUs")}
            </ButtonLink>
          </div>

          {/* Las dos orillas, como firma discreta */}
          <div className="mt-10 flex items-center gap-3 border-t border-marfil/15 pt-6 text-xs font-semibold uppercase tracking-wider text-verde-claro/80">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-naranja" aria-hidden />
              {t("shoreLatam")}
            </span>
            <span className="h-px w-14 bg-dorado/50" aria-hidden />
            <span className="flex items-center gap-2">
              {t("shoreGuinea")}
              <span className="h-2 w-2 rounded-full bg-verde-500" aria-hidden />
            </span>
          </div>
        </div>
      </div>

      {/* ───────── Panel de imagen ───────── */}
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
      </div>
    </section>
  );
}
