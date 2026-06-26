import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Raíces sin Fronteras trata y protege tus datos personales.",
};

const sections = [
  {
    h: "Responsable del tratamiento",
    p: `Raíces sin Fronteras es responsable de los datos que nos facilitas a través de este sitio. Para cualquier consulta, escríbenos a ${siteConfig.contact.email}.`,
  },
  {
    h: "Qué datos recogemos",
    p: "Únicamente los datos que nos proporcionas voluntariamente en el formulario de contacto (nombre, correo, asunto y mensaje) y en la suscripción al boletín (correo electrónico).",
  },
  {
    h: "Con qué finalidad",
    p: "Usamos tus datos exclusivamente para responder a tu consulta, gestionar tu colaboración o enviarte el boletín si lo solicitas. No los usamos para perfilado ni decisiones automatizadas.",
  },
  {
    h: "Base legal",
    p: "El tratamiento se basa en tu consentimiento explícito, que otorgas al marcar la casilla correspondiente y enviar el formulario.",
  },
  {
    h: "Conservación",
    p: "Conservamos tus datos el tiempo necesario para atender tu solicitud o hasta que retires tu consentimiento o solicites la baja del boletín.",
  },
  {
    h: "No compartimos tus datos",
    p: "No cedemos ni vendemos tus datos a terceros. Solo accederán a ellos los proveedores tecnológicos estrictamente necesarios para operar el sitio, bajo acuerdos de confidencialidad.",
  },
  {
    h: "Tus derechos",
    p: `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${siteConfig.contact.email}.`,
  },
  {
    h: "Seguridad",
    p: "Aplicamos medidas técnicas y organizativas (validación en servidor, cifrado en tránsito, cabeceras de seguridad y control de acceso) para proteger tu información.",
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tu confianza"
        title="Política de privacidad"
        description="Tratamos tus datos con respeto, transparencia y la mínima recolección posible."
        breadcrumbs={[{ label: "Privacidad" }]}
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-xl">{s.h}</h2>
                <p className="mt-2 text-pretty leading-relaxed text-verde-900/80">{s.p}</p>
              </section>
            ))}
            <p className="border-t border-verde-profundo/10 pt-6 text-sm text-verde-900/55">
              Este texto es una plantilla orientativa y debe revisarse con asesoría legal antes de su
              publicación definitiva, adaptándola a la normativa aplicable (p. ej. RGPD).
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
