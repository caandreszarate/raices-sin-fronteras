import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Section";
import { RouteLine, RootsDivider } from "@/components/decor";

type Crumb = { label: string; href?: string };

/** Cabecera de página interior con migas de pan y fondo verde texturizado. */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
}) {
  const t = useTranslations("nav");
  return (
    <section className="relative isolate overflow-hidden gradient-orillas">
      <div className="textile-pattern absolute inset-0 opacity-25" aria-hidden />
      <div className="route-line absolute inset-0 opacity-[0.06]" aria-hidden />
      <Container className="relative py-14 sm:py-20">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Migas de pan" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-verde-claro/70">
              <li>
                <Link
                  href="/"
                  className="hover:text-marfil focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                >
                  {t("home")}
                </Link>
              </li>
              {breadcrumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <span aria-hidden className="text-verde-claro/40">
                    /
                  </span>
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="hover:text-marfil focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-marfil" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-dorado">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-balance text-4xl font-semibold text-marfil sm:text-5xl">
          {title}
        </h1>
        <RouteLine className="mt-5 h-6 w-44" />
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-verde-claro/90">
            {description}
          </p>
        )}
      </Container>
      <RootsDivider className="text-marfil" color="var(--color-marfil)" flip />
    </section>
  );
}
