"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { HeartIcon, CheckIcon } from "@/components/icons";

type Frequency = "unica" | "mensual";

const amounts: Record<Frequency, number[]> = {
  unica: [15, 30, 60, 120],
  mensual: [10, 20, 40, 80],
};

export function DonationWidget() {
  const t = useTranslations("donate.widget");
  const [frequency, setFrequency] = useState<Frequency>("mensual");
  const [amount, setAmount] = useState<number>(amounts.mensual[1]);
  const [custom, setCustom] = useState<string>("");

  const effectiveAmount = custom ? Math.max(0, Math.floor(Number(custom) || 0)) : amount;

  const impactText = (a: number) => {
    if (a >= 80) return t("impact.high");
    if (a >= 40) return t("impact.mid");
    if (a >= 20) return t("impact.low");
    return t("impact.base");
  };

  const handleFrequency = (f: Frequency) => {
    setFrequency(f);
    setAmount(amounts[f][1]);
    setCustom("");
  };

  return (
    <div className="rounded-3xl border border-verde-profundo/10 bg-white/80 p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <h2 className="text-2xl">{t("title")}</h2>
      <p className="mt-2 text-sm text-verde-900/70">{t("text")}</p>

      <div
        className="mt-6 grid grid-cols-2 gap-2 rounded-full bg-verde-claro/60 p-1"
        role="group"
        aria-label={t("frequencyLabel")}
      >
        {(["mensual", "unica"] as Frequency[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={frequency === f}
            onClick={() => handleFrequency(f)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado ${
              frequency === f ? "bg-verde-profundo text-marfil shadow-sm" : "text-verde-900/70"
            }`}
          >
            {f === "mensual" ? t("monthly") : t("oneTime")}
          </button>
        ))}
      </div>

      <fieldset className="mt-5">
        <legend className="sr-only">{t("amountLabel")}</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {amounts[frequency].map((a) => {
            const active = !custom && amount === a;
            return (
              <button
                key={a}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setAmount(a);
                  setCustom("");
                }}
                className={`rounded-xl border-2 px-3 py-3 text-center font-serif text-xl font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-dorado ${
                  active
                    ? "border-verde bg-verde-claro/70 text-verde-profundo"
                    : "border-verde-profundo/15 text-verde-900/80 hover:border-verde/40"
                }`}
              >
                {a}€
              </button>
            );
          })}
        </div>

        <label className="mt-3 block">
          <span className="sr-only">{t("otherAmount")}</span>
          <div className="flex items-center gap-2 rounded-xl border border-verde-profundo/15 bg-white px-4 py-2.5 focus-within:border-verde/50">
            <span className="text-verde-900/70">€</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder={t("otherAmount")}
              className="w-full bg-transparent text-verde-900 placeholder:text-verde-900/40 focus:outline-none"
            />
            <span className="text-sm text-verde-900/50">{frequency === "mensual" ? t("perMonth") : t("once")}</span>
          </div>
        </label>
      </fieldset>

      <p className="mt-5 flex items-start gap-2 rounded-xl bg-verde-claro/50 p-4 text-sm text-verde-900/80">
        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-verde-600" />
        <span>
          <strong className="font-semibold text-verde-profundo">{effectiveAmount}€</strong>
          {frequency === "mensual" ? ` ${t("monthlySuffix")}` : ""}: {impactText(effectiveAmount)}
        </span>
      </p>

      <form action="/api/donaciones/checkout" method="post" className="mt-6">
        <input type="hidden" name="amount" value={effectiveAmount} />
        <input type="hidden" name="frequency" value={frequency} />
        <button
          type="submit"
          disabled={effectiveAmount < 1}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-naranja px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-naranja-600 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado disabled:cursor-not-allowed disabled:opacity-60"
        >
          <HeartIcon className="h-5 w-5" />
          {frequency === "mensual"
            ? t("donateAmountMonthly", { amount: effectiveAmount })
            : t("donateAmount", { amount: effectiveAmount })}
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-verde-900/70">{t("secureNote")}</p>
    </div>
  );
}
