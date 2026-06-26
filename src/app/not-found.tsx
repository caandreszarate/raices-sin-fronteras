import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CeibaIcon, ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-full bg-verde-claro text-verde-700">
        <CeibaIcon className="h-10 w-10" strokeWidth={1.2} />
      </span>
      <p className="mt-6 font-serif text-6xl font-semibold text-verde-profundo">404</p>
      <h1 className="mt-2 text-2xl">Esta raíz no encontró su camino</h1>
      <p className="mt-3 max-w-md text-pretty text-verde-900/70">
        La página que buscas no existe o ha cambiado de lugar. Volvamos a tierra firme.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="primary">
          Ir al inicio
          <ArrowRightIcon className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink href="/contacto" variant="outline">
          Contáctanos
        </ButtonLink>
      </div>
    </Container>
  );
}
