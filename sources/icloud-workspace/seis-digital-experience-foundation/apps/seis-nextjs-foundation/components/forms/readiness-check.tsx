"use client";

import { FormEvent, useState } from "react";

import { launchWindows, projectStages, readinessLevels } from "@/lib/readiness-schema";

type ReadinessLocale = "tr" | "en" | "fr" | "it" | "de";

type ReadinessForm = {
  projectName: string;
  email: string;
  projectStage: string;
  contentReadiness: string;
  designReadiness: string;
  integrationReadiness: string;
  launchWindow: string;
  website: string;
};

type ReadinessResult = {
  score: number;
  level: string;
  recommendation: string;
  nextActions: string[];
};

const initialForm: ReadinessForm = {
  projectName: "",
  email: "",
  projectStage: "idea",
  contentReadiness: "medium",
  designReadiness: "medium",
  integrationReadiness: "low",
  launchWindow: "flexible",
  website: ""
};

const copy: Record<
  ReadinessLocale,
  {
    projectName: string;
    email: string;
    stage: string;
    content: string;
    design: string;
    integrations: string;
    launch: string;
    sending: string;
    send: string;
    fallbackError: string;
    score: string;
    next: string;
  }
> = {
  tr: {
    projectName: "Proje adi",
    email: "E-posta",
    stage: "Asama",
    content: "Icerik",
    design: "Tasarim",
    integrations: "Entegrasyon",
    launch: "Lansman",
    sending: "Olculuyor...",
    send: "Hazirligi olc",
    fallbackError: "Hazirlik olcumu tamamlanamadi.",
    score: "Skor",
    next: "Siradaki adimlar"
  },
  en: {
    projectName: "Project name",
    email: "Email",
    stage: "Stage",
    content: "Content",
    design: "Design",
    integrations: "Integrations",
    launch: "Launch",
    sending: "Checking...",
    send: "Check readiness",
    fallbackError: "Readiness check could not be completed.",
    score: "Score",
    next: "Next actions"
  },
  fr: {
    projectName: "Nom du projet",
    email: "E-mail",
    stage: "Phase",
    content: "Contenu",
    design: "Design",
    integrations: "Integrations",
    launch: "Lancement",
    sending: "Verification...",
    send: "Verifier",
    fallbackError: "La verification n'a pas pu etre terminee.",
    score: "Score",
    next: "Prochaines actions"
  },
  it: {
    projectName: "Nome progetto",
    email: "Email",
    stage: "Fase",
    content: "Contenuto",
    design: "Design",
    integrations: "Integrazioni",
    launch: "Lancio",
    sending: "Verifica...",
    send: "Verifica readiness",
    fallbackError: "La verifica non puo essere completata.",
    score: "Punteggio",
    next: "Prossime azioni"
  },
  de: {
    projectName: "Projektname",
    email: "E-Mail",
    stage: "Phase",
    content: "Inhalt",
    design: "Design",
    integrations: "Integrationen",
    launch: "Launch",
    sending: "Prufung...",
    send: "Bereitschaft prufen",
    fallbackError: "Bereitschaft konnte nicht gepruft werden.",
    score: "Score",
    next: "Nachste Schritte"
  }
};

const optionLabels: Record<ReadinessLocale, Record<string, string>> = {
  tr: {
    idea: "Fikir",
    "active-build": "Aktif gelistirme",
    redesign: "Yeniden tasarim",
    "launch-prep": "Lansman hazirligi",
    low: "Dusuk",
    medium: "Orta",
    high: "Yuksek",
    "two-weeks": "2 hafta",
    "one-month": "1 ay",
    quarter: "Ceyrek",
    flexible: "Esnek"
  },
  en: {
    idea: "Idea",
    "active-build": "Active build",
    redesign: "Redesign",
    "launch-prep": "Launch prep",
    low: "Low",
    medium: "Medium",
    high: "High",
    "two-weeks": "2 weeks",
    "one-month": "1 month",
    quarter: "Quarter",
    flexible: "Flexible"
  },
  fr: {
    idea: "Idee",
    "active-build": "Construction",
    redesign: "Refonte",
    "launch-prep": "Preparation",
    low: "Bas",
    medium: "Moyen",
    high: "Eleve",
    "two-weeks": "2 semaines",
    "one-month": "1 mois",
    quarter: "Trimestre",
    flexible: "Flexible"
  },
  it: {
    idea: "Idea",
    "active-build": "Sviluppo",
    redesign: "Redesign",
    "launch-prep": "Preparazione",
    low: "Basso",
    medium: "Medio",
    high: "Alto",
    "two-weeks": "2 settimane",
    "one-month": "1 mese",
    quarter: "Trimestre",
    flexible: "Flessibile"
  },
  de: {
    idea: "Idee",
    "active-build": "Aktiver Bau",
    redesign: "Redesign",
    "launch-prep": "Launch-Vorbereitung",
    low: "Niedrig",
    medium: "Mittel",
    high: "Hoch",
    "two-weeks": "2 Wochen",
    "one-month": "1 Monat",
    quarter: "Quartal",
    flexible: "Flexibel"
  }
};

function resolveLocale(locale: string): ReadinessLocale {
  return locale === "en" || locale === "fr" || locale === "it" || locale === "de" ? locale : "tr";
}

function labelize(value: string, locale: ReadinessLocale): string {
  return optionLabels[locale][value] || value;
}

export function ReadinessCheck({ locale }: { locale: string }) {
  const activeLocale = resolveLocale(locale);
  const text = copy[activeLocale];
  const [form, setForm] = useState<ReadinessForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ReadinessResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    setResult(null);

    try {
      const response = await fetch("/api/readiness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...form, locale })
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string; result?: ReadinessResult };

      if (!response.ok || !payload.ok || !payload.result) {
        throw new Error(payload.message || text.fallbackError);
      }

      setStatus("success");
      setResult(payload.result);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : text.fallbackError);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-seis-line bg-seis-surface p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
          {text.projectName}
          <input
            required
            name="projectName"
            minLength={2}
            maxLength={140}
            value={form.projectName}
            onChange={(event) => setForm((prev) => ({ ...prev, projectName: event.target.value }))}
            className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          />
        </label>
        <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
          {text.email}
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            maxLength={180}
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <SelectField label={text.stage} value={form.projectStage} options={projectStages} locale={activeLocale} onChange={(value) => setForm((prev) => ({ ...prev, projectStage: value }))} />
        <SelectField label={text.content} value={form.contentReadiness} options={readinessLevels} locale={activeLocale} onChange={(value) => setForm((prev) => ({ ...prev, contentReadiness: value }))} />
        <SelectField label={text.design} value={form.designReadiness} options={readinessLevels} locale={activeLocale} onChange={(value) => setForm((prev) => ({ ...prev, designReadiness: value }))} />
        <SelectField label={text.integrations} value={form.integrationReadiness} options={readinessLevels} locale={activeLocale} onChange={(value) => setForm((prev) => ({ ...prev, integrationReadiness: value }))} />
        <SelectField label={text.launch} value={form.launchWindow} options={launchWindows} locale={activeLocale} onChange={(value) => setForm((prev) => ({ ...prev, launchWindow: value }))} />
      </div>

      <input
        tabIndex={-1}
        autoComplete="off"
        name="website"
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg border border-seis-accent/60 px-4 py-2 text-sm font-semibold text-seis-text transition hover:bg-seis-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? text.sending : text.send}
      </button>

      {status === "error" && <p className="text-sm text-red-300">{message}</p>}

      {result ? (
        <output className="rounded-lg border border-seis-line bg-seis-bg p-4 text-sm text-seis-muted">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-[0.14em] text-seis-accent">{text.score}</span>
            <strong className="font-serif text-3xl text-seis-text">{result.score}</strong>
            <span className="rounded-full border border-seis-line px-3 py-1 text-xs uppercase tracking-[0.12em]">{result.level}</span>
          </div>
          <p className="mt-3 leading-6">{result.recommendation}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-seis-accent">{text.next}</p>
          <ul className="mt-2 grid gap-2">
            {result.nextActions.map((action) => (
              <li key={action} className="rounded-md border border-seis-line px-3 py-2">
                {action}
              </li>
            ))}
          </ul>
        </output>
      ) : null}
    </form>
  );
}

function SelectField({
  label,
  value,
  options,
  locale,
  onChange
}: {
  label: string;
  value: string;
  options: readonly string[];
  locale: ReadinessLocale;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {labelize(option, locale)}
          </option>
        ))}
      </select>
    </label>
  );
}
