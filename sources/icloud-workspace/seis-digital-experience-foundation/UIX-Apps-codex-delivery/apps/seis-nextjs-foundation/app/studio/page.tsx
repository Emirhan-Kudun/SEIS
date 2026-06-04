import type { Metadata } from "next";
import Link from "next/link";

import { StudioLivePanel } from "@/components/studio/studio-live-panel";
import { resolveLocale } from "@/lib/content";
import { integrationEntries, resolveIntegrationStatus } from "@/lib/integrations";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Studio",
  description: "SEIS studio readiness board for integrations, environment status, and operational checks.",
  alternates: {
    canonical: "/studio"
  }
};

type StudioPageProps = {
  searchParams?: { lang?: string };
};

export default function StudioPage({ searchParams }: StudioPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const integrationRows = integrationEntries.map((entry) => ({
    ...entry,
    status: resolveIntegrationStatus(entry)
  }));

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Studio</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Website build readiness board for tomorrow's production sprint.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Integration signals, environment hints, and operational readiness checks in one view.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">System</p>
            <h2 className="mt-2 font-serif text-2xl">{siteConfig.shortName}</h2>
            <p className="mt-2 text-sm text-seis-muted">{siteConfig.description}</p>
          </article>
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">Site URL</p>
            <h2 className="mt-2 font-serif text-2xl break-all">{siteConfig.url}</h2>
            <p className="mt-2 text-sm text-seis-muted">Configured via NEXT_PUBLIC_SITE_URL.</p>
          </article>
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">Contact</p>
            <h2 className="mt-2 font-serif text-2xl break-all">{siteConfig.email}</h2>
            <p className="mt-2 text-sm text-seis-muted">Used by contact form and fallback mail actions.</p>
          </article>
        </div>

        <div className="mt-8 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Integrations</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {integrationRows.map((item) => (
              <article key={item.id} className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
                <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.readiness}</p>
                <h3 className="mt-1 font-serif text-2xl">{item.label}</h3>
                <p className="mt-2 text-sm text-seis-muted">{item.notes}</p>
                <p
                  className={`mt-3 inline-flex rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${
                    item.status === "configured"
                      ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-200"
                      : item.status === "not-configured"
                        ? "border-amber-600/40 bg-amber-500/10 text-amber-200"
                        : "border-seis-line text-seis-muted"
                  }`}
                >
                  {item.status}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link href="/api/health" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/health
          </Link>
          <Link href="/api/content-snapshot?lang=en" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/content-snapshot
          </Link>
          <Link href="/api/integrations" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/integrations
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href="/api/newsletter" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/newsletter
          </Link>
          <Link href={`/insights?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /insights
          </Link>
          <Link href={`/works?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /works
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href="/api/metrics" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/metrics
          </Link>
          <Link href="/api/search?q=ai&domain=all&lang=en" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/search
          </Link>
          <Link href={`/automation?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /automation
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href="/api/release-readiness" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/release-readiness
          </Link>
          <Link href="/api/ai-workflows" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/ai-workflows
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /control
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link href={`/playbooks?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /playbooks
          </Link>
          <Link href="/api/system-manifest" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/system-manifest
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /ops
          </Link>
          <Link href={`/governance?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /governance
          </Link>
          <Link href={`/bench?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /bench
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href="/api/quality-scorecard" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/quality-scorecard
          </Link>
          <Link href="/api/feature-flags" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/feature-flags
          </Link>
          <Link href="/api/bench-capabilities" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/bench-capabilities
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/strategy?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /strategy
          </Link>
          <Link href={`/release-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /release-lab
          </Link>
          <Link href={`/risk?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /risk
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/multilingual-planning?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /multilingual-planning
          </Link>
          <Link href="/api/multilingual-planning" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/multilingual-planning
          </Link>
          <Link href="/api/branch-strategy" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/branch-strategy
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/branch-hardening?lang=${locale}`} className="rounded-lg border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /branch-hardening
          </Link>
          <Link href="/api/branch-hardening" className="rounded-lg border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/branch-hardening
          </Link>
          <Link href={`/runtime-admin?lang=${locale}`} className="rounded-lg border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /runtime-admin
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link href="/api/release-scenarios" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/release-scenarios
          </Link>
          <Link href="/api/risk-register" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/risk-register
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/provider-hub?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /provider-hub
          </Link>
          <Link href={`/growth-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /growth-lab
          </Link>
          <Link href={`/experience-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /experience-lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /orchestration
          </Link>
          <Link href="/api/system-roadmap" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/system-roadmap
          </Link>
          <Link href="/api/orchestration-readiness" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/orchestration-readiness
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/incident-center?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /incident-center
          </Link>
          <Link href={`/dependency-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /dependency-lab
          </Link>
          <Link href={`/execution-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /execution-lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/seo-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /seo-lab
          </Link>
          <Link href="/api/incident-center" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/incident-center
          </Link>
          <Link href="/api/dependency-governance" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/dependency-governance
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link href="/api/execution-pipeline" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/execution-pipeline
          </Link>
          <Link href="/api/seo-intelligence" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/seo-intelligence
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/sre-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /sre-lab
          </Link>
          <Link href={`/compliance-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /compliance-lab
          </Link>
          <Link href={`/capacity-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /capacity-lab
          </Link>
          <Link href={`/research-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /research-lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/sre-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/sre-command
          </Link>
          <Link href="/api/compliance-matrix" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/compliance-matrix
          </Link>
          <Link href="/api/capacity-forecast" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/capacity-forecast
          </Link>
          <Link href="/api/research-ops" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/research-ops
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/api/automation-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/automation-command
          </Link>
          <Link href="/api/finops-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/finops-command
          </Link>
          <Link href="/api/localization-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/localization-command
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/security-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/security-command
          </Link>
          <Link href="/api/accessibility-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/accessibility-command
          </Link>
          <Link href="/api/experiment-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/experiment-command
          </Link>
          <Link href="/api/collaboration-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/collaboration-command
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={`/automation-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /automation-lab
          </Link>
          <Link href={`/finops-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /finops-lab
          </Link>
          <Link href={`/localization-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /localization-lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/security-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /security-lab
          </Link>
          <Link href={`/accessibility-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /accessibility-lab
          </Link>
          <Link href={`/experiment-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /experiment-lab
          </Link>
          <Link href={`/collaboration-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /collaboration-lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/performance-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/performance-command
          </Link>
          <Link href="/api/content-ops-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/content-ops-command
          </Link>
          <Link href="/api/ai-governance-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/ai-governance-command
          </Link>
          <Link href="/api/growth-analytics-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/growth-analytics-command
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/api/worktree-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/worktree-command
          </Link>
          <Link href="/api/design-system-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/design-system-command
          </Link>
          <Link href="/api/observability-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/observability-command
          </Link>
          <Link href="/api/product-ops-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/product-ops-command
          </Link>
          <Link href="/api/monetization-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/monetization-command
          </Link>
          <Link href="/api/knowledge-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/knowledge-command
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/performance-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /performance-lab
          </Link>
          <Link href={`/content-ops-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /content-ops-lab
          </Link>
          <Link href={`/ai-governance-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /ai-governance-lab
          </Link>
          <Link href={`/growth-analytics-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /growth-analytics-lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={`/worktree-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /worktree-lab
          </Link>
          <Link href={`/design-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /design-lab
          </Link>
          <Link href={`/observability-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /observability-lab
          </Link>
          <Link href={`/product-ops-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /product-ops-lab
          </Link>
          <Link href={`/monetization-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /monetization-lab
          </Link>
          <Link href={`/knowledge-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /knowledge-lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/api/merge-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/merge-command
          </Link>
          <Link href="/api/rollback-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/rollback-command
          </Link>
          <Link href="/api/connector-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/connector-command
          </Link>
          <Link href="/api/agent-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/agent-command
          </Link>
          <Link href="/api/deployment-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/deployment-command
          </Link>
          <Link href="/api/testing-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/testing-command
          </Link>
          <Link href="/api/cloud-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/cloud-command
          </Link>
          <Link href="/api/cloud-cost-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/cloud-cost-command
          </Link>
          <Link href="/api/handoff-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/handoff-command
          </Link>
          <Link href="/api/skills-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/skills-command
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={`/merge-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /merge-lab
          </Link>
          <Link href={`/rollback-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /rollback-lab
          </Link>
          <Link href={`/connector-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /connector-lab
          </Link>
          <Link href={`/agent-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /agent-lab
          </Link>
          <Link href={`/deployment-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /deployment-lab
          </Link>
          <Link href={`/testing-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /testing-lab
          </Link>
          <Link href={`/cloud-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /cloud-lab
          </Link>
          <Link href={`/cloud-cost-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /cloud-cost-lab
          </Link>
          <Link href={`/handoff-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /handoff-lab
          </Link>
          <Link href={`/skills-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Route: /skills-lab
          </Link>
        </div>

        <StudioLivePanel />

        <p className="mt-8">
          <Link href={`/?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Back to homepage
          </Link>
        </p>
      </section>
    </main>
  );
}
