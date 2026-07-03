import Image from "next/image";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Hero "El árbol de las raíces": ilustración a ancho completo (copa de
 * textiles de ambas orillas, raíces que se vuelven personas unidas) con el
 * texto en oscuro sobre una veladura marfil. En móvil, imagen y texto se
 * apilan para no recortar la composición centrada del árbol.
 */
export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const treeAlt = t("treeAlt");
  return (
    <section className="relative isolate overflow-hidden">
      {/* Imagen: bloque propio en móvil, fondo completo en escritorio */}
      <div className="relative h-[44vh] min-h-[300px] lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
        <Image
          src="/branding/hero-arbol.jpg"
          alt={treeAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] lg:object-[68%_center]"
        />
        {/* veladura para la legibilidad del texto (solo escritorio) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-marfil from-25% via-marfil/85 to-transparent lg:block"
          aria-hidden
        />
      </div>

      {/* Texto */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:flex lg:min-h-[clamp(540px,76vh,740px)] lg:items-center lg:px-8 lg:py-0">
        <div className="max-w-xl animate-fade-up">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-naranja">
            <span className="h-px w-6 bg-current opacity-60" aria-hidden />
            {t("eyebrow")}
          </p>

          <h1 className="mt-5 font-serif text-verde-profundo">
            <span className="block text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {t("title1")} {t("title2")}
            </span>
            <span className="mt-2 block text-4xl font-medium italic leading-tight text-naranja sm:text-5xl lg:text-6xl">
              {t("titleScript")}
            </span>
          </h1>

          <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-verde-900/75">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/nosotros" variant="primary" size="lg">
              {tc("knowUs")}
              <ArrowRightIcon className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/contacto" variant="outline" size="lg">
              {tc("contactUs")}
            </ButtonLink>
          </div>

          {/* Las dos orillas, como firma discreta */}
          <div className="mt-10 flex items-center gap-3 border-t border-verde-profundo/15 pt-6 text-xs font-semibold uppercase tracking-wider text-verde-900/70">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-naranja" aria-hidden />
              {t("shoreLatam")}
            </span>
            <span className="h-px w-14 bg-dorado/60" aria-hidden />
            <span className="flex items-center gap-2">
              {t("shoreGuinea")}
              <span className="h-2 w-2 rounded-full bg-verde-500" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
