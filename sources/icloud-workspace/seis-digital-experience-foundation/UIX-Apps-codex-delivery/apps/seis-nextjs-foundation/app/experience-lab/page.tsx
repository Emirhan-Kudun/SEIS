import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getExperienceLabSummary,
  getExperienceSignals,
  getExperimentBacklog,
  getJourneyFrictions
} from "@/lib/experience-lab";
import { getPipelineSummary } from "@/lib/execution-pipeline";
import { getSeoSummary } from "@/lib/seo-intelligence";

export const metadata: Metadata = {
  title: "Experience Lab",
  description: "Experience telemetry and UX friction lab for premium interface refinement.",
  alternates: {
    canonical: "/experience-lab"
  }
};

type ExperienceLabPageProps = {
  searchParams?: { lang?: string };
};

function signalTone(band: "strong" | "watch" | "weak") {
  if (band === "strong") return "border-emerald-600/40 bg-emerald-500/10 text-emerald-200";
  if (band === "watch") return "border-amber-600/40 bg-amber-500/10 text-amber-200";
  return "border-red-600/40 bg-red-500/10 text-red-200";
}

export default function ExperienceLabPage({ searchParams }: ExperienceLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getExperienceLabSummary();
  const signals = getExperienceSignals();
  const frictions = getJourneyFrictions();
  const experiments = getExperimentBacklog();
  const pipelineSummary = getPipelineSummary();
  const seoSummary = getSeoSummary();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Experience Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          UX signal intelligence, friction diagnostics, and experiment tracking in one premium lab.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps visual sophistication and conversion quality balanced through measurable experience operations.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Signals</p>
            <p className="mt-1 font-serif text-3xl">{summary.signals}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Strong</p>
            <p className="mt-1 font-serif text-3xl">{summary.strongSignals}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Frictions</p>
            <p className="mt-1 font-serif text-3xl">{summary.frictions}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Experiments</p>
            <p className="mt-1 font-serif text-3xl">{summary.experiments}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Pipeline Stable</p>
            <p className="mt-1 font-serif text-3xl">{pipelineSummary.stablePhases}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">SEO Watch Checks</p>
            <p className="mt-1 font-serif text-3xl">{seoSummary.watchChecks}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4 lg:col-span-1">
            <h2 className="font-serif text-3xl">Signal Board</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {signals.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-seis-text">{item.area}</p>
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] ${signalTone(item.band)}`}>
                      {item.score}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4 lg:col-span-1">
            <h2 className="font-serif text-3xl">Friction Diagnostics</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {frictions.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.stage} - {item.severity}
                  </p>
                  <p className="mt-1 text-seis-text">{item.symptom}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.action}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4 lg:col-span-1">
            <h2 className="font-serif text-3xl">Experiment Backlog</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {experiments.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-seis-text">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">
                    {item.stage} - {item.status} - impact: {item.expectedImpact}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">effort: {item.effort}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/experience-lab" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/experience-lab
          </Link>
          <Link href="/api/funnel-strategy" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/funnel-strategy
          </Link>
          <Link href={`/growth-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open growth lab
          </Link>
          <Link href={`/quality-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open quality lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/execution-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open execution lab
          </Link>
          <Link href={`/seo-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open SEO lab
          </Link>
          <Link href={`/incident-center?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open incident center
          </Link>
          <Link href={`/dependency-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open dependency lab
          </Link>
        </div>
      </section>
    </main>
  );
}
