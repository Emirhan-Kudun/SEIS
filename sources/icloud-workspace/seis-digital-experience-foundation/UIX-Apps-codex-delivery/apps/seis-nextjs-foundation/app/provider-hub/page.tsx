import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getDependencySummary } from "@/lib/dependency-governance";
import { getIncidentSummary } from "@/lib/incident-center";
import {
  getConnectorStrategies,
  getProviderChannels,
  getProviderOrchestrationSummary
} from "@/lib/provider-orchestration";

export const metadata: Metadata = {
  title: "Provider Hub",
  description: "AI provider and connector orchestration hub with governance boundaries and fallback strategy.",
  alternates: {
    canonical: "/provider-hub"
  }
};

type ProviderHubPageProps = {
  searchParams?: { lang?: string };
};

export default function ProviderHubPage({ searchParams }: ProviderHubPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getProviderOrchestrationSummary();
  const providers = getProviderChannels();
  const connectors = getConnectorStrategies();
  const dependencySummary = getDependencySummary();
  const incidentSummary = getIncidentSummary();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Provider Hub</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Multi-provider AI orchestration with connector governance and explicit fallback paths.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps AI workflows portable, branch-safe, and resilient without forcing connector sprawl.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Providers</p>
            <p className="mt-1 font-serif text-3xl">{summary.providers}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Ready</p>
            <p className="mt-1 font-serif text-3xl">{summary.readyProviders}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Planned</p>
            <p className="mt-1 font-serif text-3xl">{summary.plannedProviders}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Active Connectors</p>
            <p className="mt-1 font-serif text-3xl">{summary.activeConnectors}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Dependency Guardrails</p>
            <p className="mt-1 font-serif text-3xl">{dependencySummary.requiredGuardrails}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical Incidents</p>
            <p className="mt-1 font-serif text-3xl">{incidentSummary.criticalScenarios}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Provider Channels</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {providers.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.provider} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.role}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Strengths</p>
                  <p className="mt-1">{item.strengths.join(" · ")}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Guardrails</p>
                  <p className="mt-1">{item.guardrails.join(" · ")}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Fallback</p>
                  <p className="mt-1">{item.fallback}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Connector Strategy</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {connectors.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - risk: {item.risk}
                  </p>
                  <p className="mt-1 text-seis-text">{item.name}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.scope}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/provider-orchestration" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/provider-orchestration
          </Link>
          <Link href="/api/orchestration-readiness" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/orchestration-readiness
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/incident-center?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open incident center
          </Link>
          <Link href={`/dependency-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open dependency lab
          </Link>
          <Link href={`/execution-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open execution lab
          </Link>
          <Link href={`/seo-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open SEO lab
          </Link>
        </div>
      </section>
    </main>
  );
}
