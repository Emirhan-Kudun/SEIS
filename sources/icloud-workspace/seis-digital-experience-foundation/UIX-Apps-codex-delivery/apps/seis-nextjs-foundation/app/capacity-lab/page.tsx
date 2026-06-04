import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getCapacityModels, getCapacitySummary, getScalingSteps } from "@/lib/capacity-forecast";

export const metadata: Metadata = {
  title: "Capacity Lab",
  description: "Capacity forecasting surface for traffic growth, bundle pressure, and scaling actions.",
  alternates: {
    canonical: "/capacity-lab"
  }
};

type CapacityLabPageProps = {
  searchParams?: { lang?: string };
};

export default function CapacityLabPage({ searchParams }: CapacityLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getCapacitySummary();
  const models = getCapacityModels();
  const steps = getScalingSteps();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Capacity Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Capacity forecasting for scalable growth without performance instability.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Tracks load and payload pressure while planning proactive scaling actions.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Models</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalModels}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchModels}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Risk</p>
            <p className="mt-1 font-serif text-3xl">{summary.riskModels}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Active Steps</p>
            <p className="mt-1 font-serif text-3xl">{summary.activeScalingSteps}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Capacity Models</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {models.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - {item.surface}
                  </p>
                  <p className="mt-1 text-seis-text">baseline: {item.baseline}</p>
                  <p className="mt-1 text-seis-text">forecast: {item.forecast}</p>
                  <p className="mt-1 text-sm text-seis-muted">bottleneck: {item.bottleneck}</p>
                  <p className="mt-1 text-sm text-seis-muted">mitigation: {item.mitigation}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Scaling Steps</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {steps.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.priority} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/capacity-forecast" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/capacity-forecast
          </Link>
          <Link href={`/execution-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open execution lab
          </Link>
          <Link href={`/quality-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open quality lab
          </Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
        </div>
      </section>
    </main>
  );
}
