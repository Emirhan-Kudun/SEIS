import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getFunnelHealth,
  getGrowthAnalyticsSummary,
  getSegmentInsights
} from "@/lib/growth-analytics-command";

export const metadata: Metadata = {
  title: "Growth Analytics Lab",
  description: "Growth analytics command board for funnel health, segment insights, and conversion risk management.",
  alternates: {
    canonical: "/growth-analytics-lab"
  }
};

type GrowthAnalyticsLabPageProps = {
  searchParams?: { lang?: string };
};

export default function GrowthAnalyticsLabPage({ searchParams }: GrowthAnalyticsLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getGrowthAnalyticsSummary();
  const funnel = getFunnelHealth();
  const segments = getSegmentInsights();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Growth Analytics Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Funnel and segment analytics for conversion health, trust surfaces, and growth resilience.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Connects product storytelling with measurable growth outcomes and risk-aware optimization actions.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Funnel Stages</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalStages}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p>
            <p className="mt-1 font-serif text-3xl">{summary.healthyStages}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical</p>
            <p className="mt-1 font-serif text-3xl">{summary.criticalStages}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Validated Segments</p>
            <p className="mt-1 font-serif text-3xl">{summary.validatedSegments}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Funnel Health</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {funnel.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - trend: {item.trend}
                  </p>
                  <p className="mt-1 text-seis-text">{item.stage}</p>
                  <p className="mt-1 text-sm text-seis-muted">conversion: {item.conversion}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.action}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Segment Insights</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {segments.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - confidence: {item.confidence}
                  </p>
                  <p className="mt-1 text-seis-text">{item.segment}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.signal}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/growth-analytics-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/growth-analytics-command
          </Link>
          <Link href={`/growth-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open growth lab
          </Link>
          <Link href={`/services?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open services
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
          </Link>
        </div>
      </section>
    </main>
  );
}
