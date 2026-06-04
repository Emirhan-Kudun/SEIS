import type { Metadata } from "next";
import Link from "next/link";

import { SpatialPreviewPanel } from "@/components/features/spatial/spatial-preview-panel";
import { resolveLocale } from "@/lib/content";
import {
  getContentModels,
  getLocaleReadiness,
  getMultilingualPlanningSummary,
  getPlanningTracks,
  getSpatialReadinessPolicy
} from "@/lib/multilingual-planning";

export const metadata: Metadata = {
  title: "Multilingual Planning",
  description: "Lightweight SEIS multilingual planning, content model, and spatial readiness dashboard.",
  alternates: {
    canonical: "/multilingual-planning"
  }
};

type MultilingualPlanningPageProps = {
  searchParams?: { lang?: string };
};

function riskClass(risk: string) {
  if (risk === "high") return "border-red-500/40 bg-red-500/10 text-red-100";
  if (risk === "medium") return "border-amber-500/40 bg-amber-500/10 text-amber-100";
  return "border-emerald-500/40 bg-emerald-500/10 text-emerald-100";
}

export default function MultilingualPlanningPage({ searchParams }: MultilingualPlanningPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getMultilingualPlanningSummary();
  const readiness = getLocaleReadiness();
  const tracks = getPlanningTracks();
  const models = getContentModels();
  const spatialPolicy = getSpatialReadinessPolicy();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1180px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Multilingual Planning OS</p>
        <h1 className="mt-3 max-w-5xl font-serif text-4xl leading-tight sm:text-5xl">
          Full-stack content, locale, release, and spatial readiness without heavy local workflows.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          This route turns planning docs into typed runtime intelligence for TR/EN/FR/IT/DE coverage, publish gates, content models, and manual low-power spatial previews.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-muted">Release Readiness</p>
            <p className="mt-2 font-serif text-4xl">{summary.releaseReadiness}%</p>
            <p className={`mt-3 inline-flex rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${riskClass(summary.releaseRisk)}`}>
              {summary.releaseRisk} risk
            </p>
          </article>
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-muted">Average Coverage</p>
            <p className="mt-2 font-serif text-4xl">{summary.averageCoverage}%</p>
            <p className="mt-2 text-sm text-seis-muted">{summary.seoReadyLocales}/{summary.locales} locales SEO-ready.</p>
          </article>
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-muted">Implementation Tracks</p>
            <p className="mt-2 font-serif text-4xl">{summary.implementedTracks}/{summary.tracks}</p>
            <p className="mt-2 text-sm text-seis-muted">{summary.approvedTracks} approved, {summary.deferredTracks} deferred.</p>
          </article>
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-muted">Content Models</p>
            <p className="mt-2 font-serif text-4xl">{summary.contentModels}</p>
            <p className="mt-2 text-sm text-seis-muted">No database migration required.</p>
          </article>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Locale Readiness</h2>
            <div className="mt-4 grid gap-3">
              {readiness.map((item) => (
                <article key={item.locale} className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.12em] text-seis-accent">{item.locale.toUpperCase()} · {item.label}</p>
                    <span className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${riskClass(item.mobileRisk)}`}>
                      {item.mobileRisk} mobile risk
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/40">
                    <div className="h-full rounded-full bg-seis-accent" style={{ width: `${item.coverage}%` }} />
                  </div>
                  <p className="mt-2 text-sm text-seis-muted">{item.coverage}% coverage · owner: {item.reviewOwner}</p>
                  <p className="mt-1 text-sm text-seis-text">{item.nextAction}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Planning Tracks</h2>
            <div className="mt-4 grid gap-3">
              {tracks.map((track) => (
                <article key={track.id} className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-seis-accent">
                    {track.priority} · {track.status} · {track.runtimeSurface}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl">{track.title}</h3>
                  <p className="mt-2 text-sm text-seis-muted">{track.purpose}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.1em] text-seis-muted">rollback: {track.rollback}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Content Model Gates</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {models.map((model) => (
              <article key={model.id} className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-seis-accent">{model.id}</p>
                <h3 className="mt-1 font-serif text-2xl">{model.title}</h3>
                <p className="mt-2 text-sm text-seis-muted">{model.purpose}</p>
                <p className="mt-2 text-sm text-seis-text">{model.publishRule}</p>
                <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
                  {model.fields.map((field) => (
                    <li key={field.name} className="rounded border border-seis-line px-3 py-2">
                      <span className="text-seis-text">{field.name}</span> · {field.required ? "required" : "optional"} · {field.localized ? "localized" : "global"}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-6">
          <SpatialPreviewPanel />
        </div>

        <section className="mt-6 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">{spatialPolicy.title}</h2>
          <p className="mt-2 text-sm text-seis-muted">{spatialPolicy.deviceBudget}</p>
          <p className="mt-2 text-sm text-seis-muted">{spatialPolicy.reducedMotionBehavior}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {spatialPolicy.activationRules.map((rule) => (
              <p key={rule} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-2 text-sm text-seis-muted">
                {rule}
              </p>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link href="/api/multilingual-planning" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/multilingual-planning
          </Link>
          <Link href={`/localization-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /localization-lab
          </Link>
          <Link href={`/studio?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /studio
          </Link>
        </div>
      </section>
    </main>
  );
}
