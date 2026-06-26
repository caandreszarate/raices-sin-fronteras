import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { RootsDivider } from "@/components/decor";
import { HeartIcon, ArrowRightIcon } from "@/components/icons";

/**
 * Bloque de llamado a la acción institucional. Reutilizable al final de las
 * páginas. Sin props usa el CTA por defecto traducido; se puede sobreescribir
 * con `title`/`description`/`primary`/`secondary` (cadenas ya traducidas).
 */
export function CTASection({
  title,
  description,
  primary,
  secondary,
}: {
  title?: string;
  description?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  const t = useTranslations("cta");
  const tc = useTranslations("common");

  const finalTitle = title ?? t("title");
  const finalDescription = description ?? t("description");
  const finalPrimary = primary ?? { href: "/donar", label: tc("donateNow") };
  const finalSecondary = secondary ?? { href: "/contacto", label: tc("contactUs") };

  return (
    <section className="relative overflow-hidden">
      <div className="relative gradient-orillas">
        <RootsDivider className="absolute inset-x-0 top-0 text-marfil" color="var(--color-marfil)" />
        <div className="route-line absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="text-balance text-3xl font-semibold text-marfil sm:text-4xl">{finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-verde-claro/90 sm:text-lg">
            {finalDescription}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={finalPrimary.href} variant="primary" size="lg">
              <HeartIcon className="h-5 w-5" />
              {finalPrimary.label}
            </ButtonLink>
            <ButtonLink
              href={finalSecondary.href}
              variant="outline"
              size="lg"
              className="border-marfil/40 text-marfil hover:border-marfil hover:bg-marfil/10"
            >
              {finalSecondary.label}
              <ArrowRightIcon className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
