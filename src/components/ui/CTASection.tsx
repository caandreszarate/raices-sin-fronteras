import { ButtonLink } from "@/components/ui/Button";
import { RootsDivider } from "@/components/decor";
import { HeartIcon, ArrowRightIcon } from "@/components/icons";

/**
 * Bloque de llamado a la acción institucional. Reutilizable al final de las
 * páginas. Usa el gradiente "dos orillas" y las raíces como remate.
 */
export function CTASection({
  title = "Sumemos raíces, multipliquemos futuros",
  description = "Tu apoyo sostiene programas de cultura, educación, juventud y medio ambiente entre América Latina y Guinea Ecuatorial. Cada aporte se convierte en oportunidades reales.",
  primary = { href: "/donar", label: "Dona ahora" },
  secondary = { href: "/contacto", label: "Contáctanos" },
}: {
  title?: string;
  description?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative gradient-orillas">
        <RootsDivider className="absolute inset-x-0 top-0 text-marfil" color="var(--color-marfil)" />
        <div className="route-line absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="text-balance text-3xl font-semibold text-marfil sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-verde-claro/90 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primary.href} variant="primary" size="lg">
              <HeartIcon className="h-5 w-5" />
              {primary.label}
            </ButtonLink>
            <ButtonLink
              href={secondary.href}
              variant="outline"
              size="lg"
              className="border-marfil/40 text-marfil hover:border-marfil hover:bg-marfil/10"
            >
              {secondary.label}
              <ArrowRightIcon className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
