import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Burbuja flotante de WhatsApp, visible en todo el sitio. Enlaza a wa.me con
 * un mensaje predefinido por idioma. Verde oficial de WhatsApp para que sea
 * reconocible al instante; anillo de foco dorado como el resto del sitio.
 */
export function WhatsAppButton() {
  const t = useTranslations("common");
  const href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(t("whatsappMessage"))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappLabel")}
      title={t("whatsappLabel")}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-lift)] transition-transform duration-200 hover:scale-110 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
