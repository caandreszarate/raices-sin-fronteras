import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Pacifico } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

// Titulares editoriales (serif patrimonial, como en el branding).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// Texto y navegación (sans legible y moderna).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Acento manuscrito puntual ("sin Fronteras").
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  // Alternativas por idioma para SEO (hreflang).
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? "/" : `/${l}`;
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: `${siteConfig.name} — ${t("tagline")}`, template: `%s · ${siteConfig.name}` },
    description: t("description"),
    applicationName: siteConfig.name,
    alternates: { canonical: locale === routing.defaultLocale ? "/" : `/${locale}`, languages },
    openGraph: {
      type: "website",
      locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${t("tagline")}`,
      description: t("description"),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${siteConfig.name} — ${t("tagline")}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${t("tagline")}`,
      description: t("description"),
      images: ["/og.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d3b2a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Habilita el renderizado estático con el idioma correcto.
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} ${pacifico.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider>
          <a href="#contenido" className="skip-link">
            {t("skipToContent")}
          </a>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
