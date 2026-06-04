"use client";

import { FormEvent, useState } from "react";

import { budgetRanges, projectTypes, timelineOptions } from "@/lib/brief-schema";

type BriefLocale = "tr" | "en" | "fr" | "it" | "de";

type BriefForm = {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  goals: string;
  website: string;
};

const initialForm: BriefForm = {
  name: "",
  email: "",
  projectType: "cinematic-website",
  budgetRange: "not-sure",
  timeline: "flexible",
  goals: "",
  website: ""
};

const copy: Record<
  BriefLocale,
  {
    name: string;
    email: string;
    project: string;
    budget: string;
    timeline: string;
    goals: string;
    sending: string;
    send: string;
    fallbackError: string;
    fallbackSuccess: string;
  }
> = {
  tr: {
    name: "Isim",
    email: "E-posta",
    project: "Proje",
    budget: "Butce",
    timeline: "Zamanlama",
    goals: "Hedefler",
    sending: "Gonderiliyor...",
    send: "Brief gonder",
    fallbackError: "Brief gonderilemedi.",
    fallbackSuccess: "Brief alindi."
  },
  en: {
    name: "Name",
    email: "Email",
    project: "Project",
    budget: "Budget",
    timeline: "Timeline",
    goals: "Goals",
    sending: "Sending...",
    send: "Send brief",
    fallbackError: "Brief could not be sent.",
    fallbackSuccess: "Brief received."
  },
  fr: {
    name: "Nom",
    email: "E-mail",
    project: "Projet",
    budget: "Budget",
    timeline: "Calendrier",
    goals: "Objectifs",
    sending: "Envoi...",
    send: "Envoyer le brief",
    fallbackError: "Le brief n'a pas pu etre envoye.",
    fallbackSuccess: "Brief recu."
  },
  it: {
    name: "Nome",
    email: "Email",
    project: "Progetto",
    budget: "Budget",
    timeline: "Tempistica",
    goals: "Obiettivi",
    sending: "Invio...",
    send: "Invia brief",
    fallbackError: "Il brief non puo essere inviato.",
    fallbackSuccess: "Brief ricevuto."
  },
  de: {
    name: "Name",
    email: "E-Mail",
    project: "Projekt",
    budget: "Budget",
    timeline: "Zeitplan",
    goals: "Ziele",
    sending: "Wird gesendet...",
    send: "Brief senden",
    fallbackError: "Brief konnte nicht gesendet werden.",
    fallbackSuccess: "Brief erhalten."
  }
};

const optionLabels: Record<BriefLocale, Record<string, string>> = {
  tr: {
    "cinematic-website": "Sinematik website",
    "fullstack-platform": "Fullstack platform",
    "portfolio-system": "Portfolio sistemi",
    "ai-native-experience": "AI-native deneyim",
    "design-system": "Design system",
    other: "Diger",
    discovery: "Kesif",
    starter: "Baslangic",
    growth: "Buyume",
    institutional: "Kurumsal",
    "not-sure": "Net degil",
    "this-month": "Bu ay",
    "one-to-two-months": "1-2 ay",
    quarter: "Ceyrek",
    flexible: "Esnek"
  },
  en: {
    "cinematic-website": "Cinematic website",
    "fullstack-platform": "Fullstack platform",
    "portfolio-system": "Portfolio system",
    "ai-native-experience": "AI-native experience",
    "design-system": "Design system",
    other: "Other",
    discovery: "Discovery",
    starter: "Starter",
    growth: "Growth",
    institutional: "Institutional",
    "not-sure": "Not sure",
    "this-month": "This month",
    "one-to-two-months": "1-2 months",
    quarter: "Quarter",
    flexible: "Flexible"
  },
  fr: {
    "cinematic-website": "Site cinematographique",
    "fullstack-platform": "Plateforme fullstack",
    "portfolio-system": "Systeme portfolio",
    "ai-native-experience": "Experience AI-native",
    "design-system": "Systeme design",
    other: "Autre",
    discovery: "Decouverte",
    starter: "Demarrage",
    growth: "Croissance",
    institutional: "Institutionnel",
    "not-sure": "Pas encore defini",
    "this-month": "Ce mois-ci",
    "one-to-two-months": "1-2 mois",
    quarter: "Trimestre",
    flexible: "Flexible"
  },
  it: {
    "cinematic-website": "Website cinematografico",
    "fullstack-platform": "Piattaforma fullstack",
    "portfolio-system": "Sistema portfolio",
    "ai-native-experience": "Esperienza AI-native",
    "design-system": "Design system",
    other: "Altro",
    discovery: "Discovery",
    starter: "Starter",
    growth: "Crescita",
    institutional: "Istituzionale",
    "not-sure": "Non definito",
    "this-month": "Questo mese",
    "one-to-two-months": "1-2 mesi",
    quarter: "Trimestre",
    flexible: "Flessibile"
  },
  de: {
    "cinematic-website": "Cinematic Website",
    "fullstack-platform": "Fullstack Plattform",
    "portfolio-system": "Portfolio System",
    "ai-native-experience": "AI-native Erlebnis",
    "design-system": "Designsystem",
    other: "Andere",
    discovery: "Discovery",
    starter: "Starter",
    growth: "Wachstum",
    institutional: "Institutionell",
    "not-sure": "Noch offen",
    "this-month": "Diesen Monat",
    "one-to-two-months": "1-2 Monate",
    quarter: "Quartal",
    flexible: "Flexibel"
  }
};

function resolveBriefLocale(locale: string): BriefLocale {
  return locale === "en" || locale === "fr" || locale === "it" || locale === "de" ? locale : "tr";
}

function labelize(value: string, locale: BriefLocale): string {
  return optionLabels[locale][value] || value;
}

export function ProjectBriefIntake({ locale }: { locale: string }) {
  const activeLocale = resolveBriefLocale(locale);
  const text = copy[activeLocale];
  const [form, setForm] = useState<BriefForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/briefs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...form, locale })
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || text.fallbackError);
      }

      setForm(initialForm);
      setStatus("success");
      setMessage(payload.message || text.fallbackSuccess);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : text.fallbackError);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-seis-line bg-seis-surface p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
          {text.name}
          <input
            required
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
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

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
          {text.project}
          <select
            name="projectType"
            value={form.projectType}
            onChange={(event) => setForm((prev) => ({ ...prev, projectType: event.target.value }))}
            className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          >
            {projectTypes.map((item) => (
              <option key={item} value={item}>
                {labelize(item, activeLocale)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
          {text.budget}
          <select
            name="budgetRange"
            value={form.budgetRange}
            onChange={(event) => setForm((prev) => ({ ...prev, budgetRange: event.target.value }))}
            className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          >
            {budgetRanges.map((item) => (
              <option key={item} value={item}>
                {labelize(item, activeLocale)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
          {text.timeline}
          <select
            name="timeline"
            value={form.timeline}
            onChange={(event) => setForm((prev) => ({ ...prev, timeline: event.target.value }))}
            className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          >
            {timelineOptions.map((item) => (
              <option key={item} value={item}>
                {labelize(item, activeLocale)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
        {text.goals}
        <textarea
          required
          name="goals"
          minLength={24}
          maxLength={2400}
          rows={5}
          value={form.goals}
          onChange={(event) => setForm((prev) => ({ ...prev, goals: event.target.value }))}
          className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-10 rounded-lg border border-seis-accent bg-seis-accent px-4 text-xs font-medium uppercase text-[#16110c] disabled:opacity-50"
        >
          {status === "sending" ? text.sending : text.send}
        </button>
        {message ? (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm ${status === "error" ? "text-red-300" : "text-seis-muted"}`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
