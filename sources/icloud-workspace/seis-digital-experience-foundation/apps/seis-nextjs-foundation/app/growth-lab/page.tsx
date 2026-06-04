import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getExperimentBacklog, getExperienceLabSummary, getJourneyFrictions } from "@/lib/experience-lab";
import { getPipelineSummary } from "@/lib/execution-pipeline";
import { getFunnelStages, getFunnelSummary } from "@/lib/funnel-strategy";
import { getSeoSummary } from "@/lib/seo-intelligence";

export const metadata: Metadata = {
  title: "Growth Lab",
  description: "Funnel intelligence and experiment planning surface for conversion-safe growth iteration.",
  alternates: {
    canonical: "/growth-lab"
  }
};

type GrowthLabPageProps = {
  searchParams?: { lang?: string };
};

export default function GrowthLabPage({ searchParams }: GrowthLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const funnelSummary = getFunnelSummary();
  const stages = getFunnelStages();
  const frictions = getJourneyFrictions();
  const experiments = getExperimentBacklog();
  const experienceSummary = getExperienceLabSummary();
  const pipelineSummary = getPipelineSummary();
  const seoSummary = getSeoSummary();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Growth Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Funnel strategy, friction mapping, and experiment backlog for predictable conversion flow.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Designed to improve user progression from awareness to conversion without sacrificing brand clarity.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Funnel Stages</p>
            <p className="mt-1 font-serif text-3xl">{funnelSummary.stages}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Tracked Events</p>
            <p className="mt-1 font-serif text-3xl">{funnelSummary.totalEvents}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Active Experiments</p>
            <p className="mt-1 font-serif text-3xl">{experienceSummary.activeExperiments}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">High Frictions</p>
            <p className="mt-1 font-serif text-3xl">{experienceSummary.highFrictions}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Pipeline Stable</p>
            <p className="mt-1 font-serif text-3xl">{pipelineSummary.stablePhases}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">SEO Pass Checks</p>
            <p className="mt-1 font-serif text-3xl">{seoSummary.passChecks}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Funnel Stages</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {stages.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.name}</p>
                  <p className="mt-1 text-seis-text">{item.objective}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Events</p>
                  <p className="mt-1">{item.keyEvents.join(" · ")}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Optimizations</p>
                  <p className="mt-1">{item.optimizations.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Friction and Experiments</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {frictions.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.stage} - {item.severity}
                  </p>
                  <p className="mt-1 text-seis-text">{item.symptom}</p>
                  <p className="mt-1 text-sm text-seis-muted">Action: {item.action}</p>
                </li>
              ))}
            </ul>

            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {experiments.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
                  <p className="text-seis-text">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">
                    {item.stage} · {item.status} · impact: {item.expectedImpact} · effort: {item.effort}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/funnel-strategy" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/funnel-strategy
          </Link>
          <Link href="/api/experience-lab" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/experience-lab
          </Link>
          <Link href={`/experience-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open experience lab
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
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
