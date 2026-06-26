"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

const initial: NewsletterState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("newsletter");
  return (
    <button
      type="submit"
      disabled={pending}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-naranja text-white transition-colors hover:bg-naranja-600 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado disabled:opacity-60"
      aria-label={t("submit")}
    >
      {pending ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
      ) : (
        <ArrowRightIcon className="h-5 w-5" />
      )}
    </button>
  );
}

export function NewsletterForm() {
  const t = useTranslations("newsletter");
  const [state, formAction] = useActionState(subscribeNewsletter, initial);
  const emailId = useId();

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="flex items-center gap-2 rounded-xl bg-verde-600/30 px-4 py-3 text-sm text-marfil"
      >
        <CheckIcon className="h-4 w-4 text-dorado" />
        {t("success")}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-2" noValidate>
      <label htmlFor={emailId} className="sr-only">
        {t("label")}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={emailId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={t("placeholder")}
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? `${emailId}-error` : undefined}
          className="h-11 w-full rounded-full border border-marfil/25 bg-marfil/10 px-4 text-sm text-marfil placeholder:text-verde-claro/50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado"
        />
        {/* Honeypot anti-spam: oculto y no enfocable */}
        <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
          <label htmlFor={`${emailId}-website`}>{t("noFill")}</label>
          <input id={`${emailId}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <SubmitButton />
      </div>
      {state.status === "error" && (
        <p id={`${emailId}-error`} role="alert" className="text-xs text-dorado">
          {t("error")}
        </p>
      )}
    </form>
  );
}
