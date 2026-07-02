"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { mainNav } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "@/components/icons";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Cierra el menú móvil al navegar (ajuste de estado en render).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-verde-profundo/10 bg-marfil/90 backdrop-blur-md"
          : "bg-marfil/60 backdrop-blur-sm"
      }`}
    >
      <nav
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label={t("primaryNav")}
      >
        <Logo withTagline />

        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative rounded-full px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado xl:px-3.5 ${
                  isActive(item.href)
                    ? "text-verde-profundo"
                    : "text-verde-900/70 hover:text-verde-profundo"
                }`}
              >
                {t(item.key)}
                {isActive(item.href) && (
                  <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-naranja xl:inset-x-3.5" aria-hidden />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSelector />
          <ButtonLink href="/contacto" variant="primary" size="sm">
            {tc("contactUs")}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <LanguageSelector compact />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-verde-profundo transition-colors hover:bg-verde-claro/60 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden">
          <div className="border-t border-verde-profundo/10 bg-marfil px-4 pb-6 pt-2 sm:px-6">
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado ${
                      isActive(item.href)
                        ? "bg-verde-claro/70 text-verde-profundo"
                        : "text-verde-900/80 hover:bg-verde-claro/50"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/contacto" variant="primary" size="lg" className="mt-4 w-full">
              {tc("contactUs")}
              <ArrowRightIcon className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
