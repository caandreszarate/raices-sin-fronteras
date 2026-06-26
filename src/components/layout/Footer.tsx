import Link from "next/link";
import { siteConfig, footerNav } from "@/lib/site";
import { programs } from "@/lib/data/programs";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/icons";
import { RootsDivider } from "@/components/decor";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 gradient-orillas text-marfil">
      <RootsDivider className="absolute inset-x-0 -top-px text-verde-profundo" color="var(--color-verde-profundo)" flip />
      <div className="route-line absolute inset-0 opacity-[0.06]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Marca */}
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-verde-claro/85">
              {siteConfig.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteConfig.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-marfil/20 px-3 py-1.5 text-xs font-medium text-marfil/85 transition-colors hover:border-dorado hover:text-dorado focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces */}
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-dorado">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-verde-claro/85 transition-colors hover:text-marfil focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contacto + Newsletter */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-dorado">
              Mantente cerca
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-verde-claro/85">
              <li className="flex items-start gap-2.5">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-dorado" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-marfil focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-dorado" />
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="hover:text-marfil focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-dorado" />
                <span>{siteConfig.contact.addressLines.join(" · ")}</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-marfil">Boletín de raíces</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Programas como pie de enlaces */}
        <div className="mt-12 border-t border-marfil/15 pt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programas#${p.slug}`}
                  className="text-xs font-medium uppercase tracking-wider text-verde-claro/70 transition-colors hover:text-dorado focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-marfil/15 pt-6 text-xs text-verde-claro/65 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. Hecho con raíces compartidas entre {siteConfig.regions}.
          </p>
          <ul className="flex gap-4">
            <li>
              <Link href="/privacidad" className="hover:text-marfil focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado">
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-marfil focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
