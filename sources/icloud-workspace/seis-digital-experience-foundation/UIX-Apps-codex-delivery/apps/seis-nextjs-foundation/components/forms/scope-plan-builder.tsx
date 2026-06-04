"use client";

import { FormEvent, useState } from "react";

import { complexityProfiles, deliveryModels, maintenanceModes, scopeFocusAreas } from "@/lib/scope-plan-schema";

type ScopeLocale = "tr" | "en" | "fr" | "it" | "de";

type ScopePlanForm = {
  projectName: string;
  email: string;
  primaryGoal: string;
  deliveryModel: string;
  complexity: string;
  maintenance: string;
  focusAreas: string[];
  website: string;
};

type ScopePlanResult = {
  score: number;
  level: string;
  recommendation: string;
  phases: { name: string; detail: string }[];
  operationalNotes: string[];
};

const initialForm: ScopePlanForm = {
  projectName: "",
  email: "",
  primaryGoal: "",
  deliveryModel: "foundation",
  complexity: "lean",
  maintenance: "light",
  focusAreas: ["frontend", "content"],
  website: ""
};

const copy: Record<
  ScopeLocale,
  {
    projectName: string;
    email: string;
    primaryGoal: string;
    delivery: string;
    complexity: string;
    maintenance: string;
    focus: string;
    sending: string;
    send: string;
    fallbackError: string;
    score: string;
    phases: string;
    notes: string;
  }
> = {
  tr: {
    projectName: "Proje adi",
    email: "E-posta",
    primaryGoal: "Ana hedef",
    delivery: "Teslim modeli",
    complexity: "Karmasiklik",
    maintenance: "Bakim",
    focus: "Odak alanlari",
    sending: "Planlaniyor...",
    send: "Scope plan uret",
    fallbackError: "Scope plan uretilemedi.",
    score: "Skor",
    phases: "Fazlar",
    notes: "Operasyon notlari"
  },
  en: {
    projectName: "Project name",
    email: "Email",
    primaryGoal: "Primary goal",
    delivery: "Delivery model",
    complexity: "Complexity",
    maintenance: "Maintenance",
    focus: "Focus areas",
    sending: "Planning...",
    send: "Generate scope plan",
    fallbackError: "Scope plan could not be generated.",
    score: "Score",
    phases: "Phases",
    notes: "Operational notes"
  },
  fr: {
    projectName: "Nom du projet",
    email: "E-mail",
    primaryGoal: "Objectif principal",
    delivery: "Modele de livraison",
    complexity: "Complexite",
    maintenance: "Maintenance",
    focus: "Axes",
    sending: "Planification...",
    send: "Generer le plan",
    fallbackError: "Le plan n'a pas pu etre genere.",
    score: "Score",
    phases: "Phases",
    notes: "Notes operationnelles"
  },
  it: {
    projectName: "Nome progetto",
    email: "Email",
    primaryGoal: "Obiettivo primario",
    delivery: "Modello consegna",
    complexity: "Complessita",
    maintenance: "Manutenzione",
    focus: "Focus",
    sending: "Pianificazione...",
    send: "Genera piano",
    fallbackError: "Il piano non puo essere generato.",
    score: "Punteggio",
    phases: "Fasi",
    notes: "Note operative"
  },
  de: {
    projectName: "Projektname",
    email: "E-Mail",
    primaryGoal: "Primarziel",
    delivery: "Liefermodell",
    complexity: "Komplexitat",
    maintenance: "Wartung",
    focus: "Fokus",
    sending: "Planung...",
    send: "Scope-Plan erstellen",
    fallbackError: "Scope-Plan konnte nicht erstellt werden.",
    score: "Score",
    phases: "Phasen",
    notes: "Betriebsnotizen"
  }
};

const optionLabels: Record<ScopeLocale, Record<string, string>> = {
  tr: {
    foundation: "Temel",
    launch: "Lansman",
    growth: "Buyume",
    lean: "Yalin",
    balanced: "Dengeli",
    advanced: "Gelismis",
    light: "Hafif",
    standard: "Standart",
    governed: "Yonetisimli",
    brand: "Marka",
    content: "Icerik",
    frontend: "Frontend",
    backend: "Backend",
    ai: "AI",
    observability: "Observability"
  },
  en: {
    foundation: "Foundation",
    launch: "Launch",
    growth: "Growth",
    lean: "Lean",
    balanced: "Balanced",
    advanced: "Advanced",
    light: "Light",
    standard: "Standard",
    governed: "Governed",
    brand: "Brand",
    content: "Content",
    frontend: "Frontend",
    backend: "Backend",
    ai: "AI",
    observability: "Observability"
  },
  fr: {
    foundation: "Fondation",
    launch: "Lancement",
    growth: "Croissance",
    lean: "Lean",
    balanced: "Equilibre",
    advanced: "Avance",
    light: "Leger",
    standard: "Standard",
    governed: "Gouverne",
    brand: "Marque",
    content: "Contenu",
    frontend: "Frontend",
    backend: "Backend",
    ai: "AI",
    observability: "Observabilite"
  },
  it: {
    foundation: "Fondazione",
    launch: "Lancio",
    growth: "Crescita",
    lean: "Lean",
    balanced: "Bilanciato",
    advanced: "Avanzato",
    light: "Leggero",
    standard: "Standard",
    governed: "Governato",
    brand: "Brand",
    content: "Contenuto",
    frontend: "Frontend",
    backend: "Backend",
    ai: "AI",
    observability: "Osservabilita"
  },
  de: {
    foundation: "Fundament",
    launch: "Launch",
    growth: "Wachstum",
    lean: "Lean",
    balanced: "Ausgewogen",
    advanced: "Fortgeschritten",
    light: "Leicht",
    standard: "Standard",
    governed: "Gesteuert",
    brand: "Marke",
    content: "Inhalt",
    frontend: "Frontend",
    backend: "Backend",
    ai: "AI",
    observability: "Observability"
  }
};

function resolveScopeLocale(locale: string): ScopeLocale {
  return locale === "en" || locale === "fr" || locale === "it" || locale === "de" ? locale : "tr";
}

function labelize(value: string, locale: ScopeLocale): string {
  return optionLabels[locale][value] || value;
}

export function ScopePlanBuilder({ locale }: { locale: string }) {
  const activeLocale = resolveScopeLocale(locale);
  const text = copy[activeLocale];
  const [form, setForm] = useState<ScopePlanForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ScopePlanResult | null>(null);

  function toggleFocus(value: string) {
    setForm((prev) => {
      const exists = prev.focusAreas.includes(value);
      return {
        ...prev,
        focusAreas: exists ? prev.focusAreas.filter((item) => item !== value) : [...prev.focusAreas, value]
      };
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    setResult(null);

    try {
      const response = await fetch("/api/scope-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...form, locale })
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string; result?: ScopePlanResult };

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
            type="email"
            autoComplete="email"
            maxLength={180}
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          />
        </label>
      </div>

      <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
        {text.primaryGoal}
        <textarea
          required
          minLength={24}
          maxLength={800}
          rows={3}
          value={form.primaryGoal}
          onChange={(event) => setForm((prev) => ({ ...prev, primaryGoal: event.target.value }))}
          className="resize-y rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <SelectField label={text.delivery} value={form.deliveryModel} options={deliveryModels} locale={activeLocale} onChange={(value) => setForm((prev) => ({ ...prev, deliveryModel: value }))} />
        <SelectField label={text.complexity} value={form.complexity} options={complexityProfiles} locale={activeLocale} onChange={(value) => setForm((prev) => ({ ...prev, complexity: value }))} />
        <SelectField label={text.maintenance} value={form.maintenance} options={maintenanceModes} locale={activeLocale} onChange={(value) => setForm((prev) => ({ ...prev, maintenance: value }))} />
      </div>

      <fieldset className="grid gap-2">
        <legend className="text-xs font-medium uppercase text-seis-muted">{text.focus}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {scopeFocusAreas.map((area) => (
            <label key={area} className="flex items-center gap-2 rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-muted">
              <input
                type="checkbox"
                checked={form.focusAreas.includes(area)}
                onChange={() => toggleFocus(area)}
                className="size-4 accent-seis-accent"
              />
              {labelize(area, activeLocale)}
            </label>
          ))}
        </div>
      </fieldset>

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
        <output className="grid gap-4 rounded-lg border border-seis-line bg-seis-bg p-4 text-sm text-seis-muted">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-[0.14em] text-seis-accent">{text.score}</span>
            <strong className="font-serif text-3xl text-seis-text">{result.score}</strong>
            <span className="rounded-full border border-seis-line px-3 py-1 text-xs uppercase tracking-[0.12em]">{result.level}</span>
          </div>
          <p className="leading-6">{result.recommendation}</p>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{text.phases}</p>
            <ol className="mt-2 grid gap-2">
              {result.phases.map((phase) => (
                <li key={phase.name} className="rounded-md border border-seis-line px-3 py-2">
                  <strong className="block text-seis-text">{phase.name}</strong>
                  <span>{phase.detail}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{text.notes}</p>
            <ul className="mt-2 grid gap-2">
              {result.operationalNotes.map((note) => (
                <li key={note} className="rounded-md border border-seis-line px-3 py-2">
                  {note}
                </li>
              ))}
            </ul>
          </div>
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
  locale: ScopeLocale;
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
