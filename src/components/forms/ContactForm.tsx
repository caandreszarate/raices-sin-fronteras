"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { asuntoLabels } from "@/lib/validation";
import { CheckIcon, AlertIcon } from "@/components/icons";

const initial: ContactState = { status: "idle" };

function fieldClasses(hasError?: boolean) {
  return `w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-verde-900 placeholder:text-verde-900/40 transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado ${
    hasError ? "border-rojo-tierra" : "border-verde-profundo/15 focus:border-verde/50"
  }`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-naranja px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-naranja-600 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
      )}
      {pending ? "Enviando…" : "Enviar mensaje"}
    </button>
  );
}

export function ContactForm({ defaultAsunto }: { defaultAsunto?: keyof typeof asuntoLabels }) {
  const [state, formAction] = useActionState(submitContact, initial);
  const ids = {
    nombre: useId(),
    email: useId(),
    asunto: useId(),
    mensaje: useId(),
    consent: useId(),
    website: useId(),
  };

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-verde/30 bg-verde-claro/60 p-8 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-verde-600 text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="text-xl font-semibold text-verde-profundo">¡Mensaje enviado!</h3>
        <p className="max-w-sm text-sm text-verde-900/75">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Resumen de error general (accesible) */}
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-rojo-tierra/30 bg-rojo-tierra/10 p-4 text-sm text-rojo-tierra"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.nombre} className="mb-1.5 block text-sm font-medium text-verde-profundo">
            Nombre <span className="text-rojo-tierra">*</span>
          </label>
          <input
            id={ids.nombre}
            name="nombre"
            type="text"
            required
            autoComplete="name"
            maxLength={80}
            aria-invalid={!!state.fieldErrors?.nombre}
            aria-describedby={state.fieldErrors?.nombre ? `${ids.nombre}-err` : undefined}
            className={fieldClasses(!!state.fieldErrors?.nombre)}
            placeholder="Tu nombre completo"
          />
          {state.fieldErrors?.nombre && (
            <p id={`${ids.nombre}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
              {state.fieldErrors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.email} className="mb-1.5 block text-sm font-medium text-verde-profundo">
            Correo electrónico <span className="text-rojo-tierra">*</span>
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={120}
            aria-invalid={!!state.fieldErrors?.email}
            aria-describedby={state.fieldErrors?.email ? `${ids.email}-err` : undefined}
            className={fieldClasses(!!state.fieldErrors?.email)}
            placeholder="tu@correo.com"
          />
          {state.fieldErrors?.email && (
            <p id={`${ids.email}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
              {state.fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={ids.asunto} className="mb-1.5 block text-sm font-medium text-verde-profundo">
          Asunto <span className="text-rojo-tierra">*</span>
        </label>
        <select
          id={ids.asunto}
          name="asunto"
          required
          defaultValue={defaultAsunto ?? ""}
          aria-invalid={!!state.fieldErrors?.asunto}
          aria-describedby={state.fieldErrors?.asunto ? `${ids.asunto}-err` : undefined}
          className={fieldClasses(!!state.fieldErrors?.asunto)}
        >
          <option value="" disabled>
            Selecciona un asunto
          </option>
          {Object.entries(asuntoLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.asunto && (
          <p id={`${ids.asunto}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
            {state.fieldErrors.asunto}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={ids.mensaje} className="mb-1.5 block text-sm font-medium text-verde-profundo">
          Mensaje <span className="text-rojo-tierra">*</span>
        </label>
        <textarea
          id={ids.mensaje}
          name="mensaje"
          required
          rows={5}
          maxLength={2000}
          aria-invalid={!!state.fieldErrors?.mensaje}
          aria-describedby={state.fieldErrors?.mensaje ? `${ids.mensaje}-err` : undefined}
          className={`${fieldClasses(!!state.fieldErrors?.mensaje)} resize-y`}
          placeholder="Cuéntanos en qué te gustaría colaborar o qué necesitas…"
        />
        {state.fieldErrors?.mensaje && (
          <p id={`${ids.mensaje}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
            {state.fieldErrors.mensaje}
          </p>
        )}
      </div>

      {/* Honeypot anti-spam */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={ids.website}>No rellenar este campo</label>
        <input id={ids.website} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3">
        <input
          id={ids.consent}
          name="consentimiento"
          type="checkbox"
          required
          aria-invalid={!!state.fieldErrors?.consentimiento}
          aria-describedby={state.fieldErrors?.consentimiento ? `${ids.consent}-err` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-verde-profundo/30 text-verde-600 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
        />
        <div>
          <label htmlFor={ids.consent} className="text-sm text-verde-900/80">
            Acepto la política de privacidad y el tratamiento de mis datos para responder a esta
            consulta. <span className="text-rojo-tierra">*</span>
          </label>
          {state.fieldErrors?.consentimiento && (
            <p id={`${ids.consent}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
              {state.fieldErrors.consentimiento}
            </p>
          )}
        </div>
      </div>

      <SubmitButton />
      <p className="text-xs text-verde-900/55">
        Los campos marcados con <span className="text-rojo-tierra">*</span> son obligatorios. Nunca
        compartiremos tus datos con terceros.
      </p>
    </form>
  );
}
