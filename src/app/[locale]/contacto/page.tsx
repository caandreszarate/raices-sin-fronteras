import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { asuntoLabels } from "@/lib/validation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("headerTitle"),
    description: t("headerText"),
  };
}

const validAsuntos = Object.keys(asuntoLabels);

export default async function ContactoPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ asunto?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tf = await getTranslations("footer");
  const { asunto } = await searchParams;
  const defaultAsunto = (validAsuntos.includes(asunto ?? "") ? asunto : undefined) as
    | keyof typeof asuntoLabels
    | undefined;

  return (
    <>
      <PageHeader
        eyebrow={t("headerEyebrow")}
        title={t("headerTitle")}
        description={t("headerText")}
        breadcrumbs={[{ label: t("breadcrumb") }]}
        image="/pages/contacto.jpg"
        imagePosition="62% 65%"
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            {/* Datos de contacto */}
            <div>
              <h2 className="text-2xl">{t("dataTitle")}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-verde-900/75">
                {t("dataText")}
              </p>

              <ul className="mt-8 space-y-5">
                <ContactRow icon={<MailIcon className="h-5 w-5" />} label={tf("email")}>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-verde-profundo hover:text-verde-600 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <p className="text-sm text-verde-900/70">
                    {tf("press")}:{" "}
                    <a
                      href={`mailto:${siteConfig.contact.pressEmail}`}
                      className="hover:text-verde-600 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                    >
                      {siteConfig.contact.pressEmail}
                    </a>
                  </p>
                </ContactRow>
                <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label={tf("phone")}>
                  {siteConfig.contact.phones.map((p) => (
                    <p key={p.phoneHref}>
                      <a
                        href={`tel:${p.phoneHref}`}
                        className="font-medium text-verde-profundo hover:text-verde-600 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                      >
                        {p.label}: {p.phone}
                      </a>
                    </p>
                  ))}
                </ContactRow>
                <ContactRow icon={<MapPinIcon className="h-5 w-5" />} label={tf("where")}>
                  {siteConfig.contact.addressLines.map((line) => (
                    <p key={line} className="text-verde-900/80">
                      {line}
                    </p>
                  ))}
                </ContactRow>
                <ContactRow icon={<ClockIcon className="h-5 w-5" />} label={t("hours")}>
                  <p className="text-verde-900/80">{siteConfig.contact.hours}</p>
                </ContactRow>
              </ul>

              {/* Mapa (OpenStreetMap, permitido en CSP) */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-verde-profundo/10 shadow-[var(--shadow-soft)]">
                <iframe
                  title={t("mapTitle")}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=8.74%2C3.73%2C8.82%2C3.78&layer=mapnik"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Formulario */}
            <div className="rounded-3xl border border-verde-profundo/10 bg-white/70 p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <h2 className="text-2xl">{t("writeTitle")}</h2>
              <p className="mt-2 text-sm text-verde-900/70">
                {t("writeText")}
              </p>
              <div className="mt-6">
                <ContactForm defaultAsunto={defaultAsunto} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-verde-claro text-verde-700">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-verde-900/70">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  );
}
