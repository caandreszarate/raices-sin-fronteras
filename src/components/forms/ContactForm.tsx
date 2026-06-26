"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { submitContact, type ContactState } from "@/app/actions/contact";
import type { ContactInput } from "@/lib/validation";
import { CheckIcon, AlertIcon } from "@/components/icons";

const initial: ContactState = { status: "idle" };

const SUBJECTS: ContactInput["asunto"][] = ["general", "voluntariado", "alianzas", "prensa", "donaciones"];

function fieldClasses(hasError?: boolean) {
  return `w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-verde-900 placeholder:text-verde-900/40 transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado ${
    hasError ? "border-rojo-tierra" : "border-verde-profundo/15 focus:border-verde/50"
  }`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("contactForm");
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-naranja px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-naranja-600 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
      )}
      {pending ? t("sending") : t("submit")}
    </button>
  );
}

export function ContactForm({ defaultAsunto }: { defaultAsunto?: ContactInput["asunto"] }) {
  const t = useTranslations("contactForm");
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
        <h3 className="text-xl font-semibold text-verde-profundo">{t("successTitle")}</h3>
        <p className="max-w-sm text-sm text-verde-900/75">{t("successText")}</p>
      </div>
    );
  }

  const fieldError = () => t("checkField");

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-rojo-tierra/30 bg-rojo-tierra/10 p-4 text-sm text-rojo-tierra"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{t("errorGeneral")}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.nombre} className="mb-1.5 block text-sm font-medium text-verde-profundo">
            {t("name")} <span className="text-rojo-tierra">*</span>
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
            placeholder={t("namePlaceholder")}
          />
          {state.fieldErrors?.nombre && (
            <p id={`${ids.nombre}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
              {fieldError()}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.email} className="mb-1.5 block text-sm font-medium text-verde-profundo">
            {t("email")} <span className="text-rojo-tierra">*</span>
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
            placeholder={t("emailPlaceholder")}
          />
          {state.fieldErrors?.email && (
            <p id={`${ids.email}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
              {fieldError()}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={ids.asunto} className="mb-1.5 block text-sm font-medium text-verde-profundo">
          {t("subject")} <span className="text-rojo-tierra">*</span>
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
            {t("subjectPlaceholder")}
          </option>
          {SUBJECTS.map((value) => (
            <option key={value} value={value}>
              {t(`subjects.${value}`)}
            </option>
          ))}
        </select>
        {state.fieldErrors?.asunto && (
          <p id={`${ids.asunto}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
            {fieldError()}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={ids.mensaje} className="mb-1.5 block text-sm font-medium text-verde-profundo">
          {t("message")} <span className="text-rojo-tierra">*</span>
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
          placeholder={t("messagePlaceholder")}
        />
        {state.fieldErrors?.mensaje && (
          <p id={`${ids.mensaje}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
            {fieldError()}
          </p>
        )}
      </div>

      {/* Honeypot anti-spam */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={ids.website}>{t("noFill")}</label>
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
            {t("consent")} <span className="text-rojo-tierra">*</span>
          </label>
          {state.fieldErrors?.consentimiento && (
            <p id={`${ids.consent}-err`} role="alert" className="mt-1 text-xs text-rojo-tierra">
              {fieldError()}
            </p>
          )}
        </div>
      </div>

      <SubmitButton />
      <p className="text-xs text-verde-900/55">{t("requiredNote")}</p>
    </form>
  );
}
