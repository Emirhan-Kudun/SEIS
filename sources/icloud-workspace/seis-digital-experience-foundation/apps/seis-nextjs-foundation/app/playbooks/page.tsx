import type { Metadata } from "next";
import Link from "next/link";

import { getAiWorkflowPacks, getAiWorkflowStats } from "@/lib/ai-workflows";
import { automationPlaybooks } from "@/lib/automation-content";
import { resolveLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Playbooks",
  description: "Automation and AI workflow playbooks for release operations, quality checks, and incident triage.",
  alternates: {
    canonical: "/playbooks"
  }
};

type PlaybooksPageProps = {
  searchParams?: { lang?: string };
};

export default function PlaybooksPage({ searchParams }: PlaybooksPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const aiWorkflows = getAiWorkflowPacks();
  const aiStats = getAiWorkflowStats();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Playbooks</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Operational automation and AI workflow packs for premium product delivery.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Reusable runbooks for content checks, release gating, telemetry triage, and cross-model orchestration.
        </p>

        <section className="mt-8 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Automation Playbooks</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {automationPlaybooks.map((playbook) => (
              <article key={playbook.id} className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
                <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{playbook.riskLevel} risk</p>
                <h3 className="mt-2 font-serif text-2xl">{playbook.name}</h3>
                <p className="mt-2 text-sm text-seis-muted">{playbook.goal}</p>
                <ul className="mt-3 grid gap-2 text-xs text-seis-muted">
                  {playbook.steps.map((step) => (
                    <li key={step} className="rounded border border-seis-line bg-[#120f0c] px-2 py-2">
                      {step}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-seis-line bg-seis-surface p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-3xl">AI Workflow Registry</h2>
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">
              {aiStats.total} workflows, {aiStats.highRiskCount} high risk
            </p>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {aiWorkflows.map((workflow) => (
              <article key={workflow.id} className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
                <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                  {workflow.provider} - {workflow.riskLevel} risk
                </p>
                <h3 className="mt-2 font-serif text-2xl">{workflow.name}</h3>
                <p className="mt-2 text-sm text-seis-muted">{workflow.goal}</p>

                <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">Inputs</p>
                <ul className="mt-1 grid gap-1 text-sm text-seis-muted">
                  {workflow.inputs.map((item) => (
                    <li key={item} className="rounded border border-seis-line bg-[#120f0c] px-2 py-1">
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">Checkpoints</p>
                <ul className="mt-1 grid gap-1 text-sm text-seis-muted">
                  {workflow.checkpoints.map((item) => (
                    <li key={item} className="rounded border border-seis-line bg-[#120f0c] px-2 py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/automation-playbooks" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/automation-playbooks
          </Link>
          <Link href="/api/ai-workflows" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/ai-workflows
          </Link>
          <Link href="/api/release-readiness" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/release-readiness
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
          <Link href={`/governance?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open governance matrix
          </Link>
          <Link href="/api/tomorrow-sprint" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/tomorrow-sprint
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/strategy?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open strategy board
          </Link>
          <Link href={`/release-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open release lab
          </Link>
          <Link href={`/risk?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open risk register
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/provider-hub?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open provider hub
          </Link>
          <Link href={`/growth-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open growth lab
          </Link>
          <Link href="/api/system-roadmap" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/system-roadmap
          </Link>
          <Link href="/api/orchestration-readiness" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/orchestration-readiness
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/incident-center" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/incident-center
          </Link>
          <Link href="/api/dependency-governance" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/dependency-governance
          </Link>
          <Link href="/api/execution-pipeline" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/execution-pipeline
          </Link>
          <Link href="/api/seo-intelligence" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/seo-intelligence
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

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/sre-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open SRE lab
          </Link>
          <Link href={`/compliance-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open compliance lab
          </Link>
          <Link href={`/capacity-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open capacity lab
          </Link>
          <Link href={`/research-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open research lab
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
            Open automation lab
          </Link>
          <Link href={`/finops-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open finops lab
          </Link>
          <Link href={`/localization-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open localization lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/security-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open security lab
          </Link>
          <Link href={`/accessibility-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open accessibility lab
          </Link>
          <Link href={`/experiment-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open experiment lab
          </Link>
          <Link href={`/collaboration-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open collaboration lab
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
            Open performance lab
          </Link>
          <Link href={`/content-ops-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open content ops lab
          </Link>
          <Link href={`/ai-governance-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ai governance lab
          </Link>
          <Link href={`/growth-analytics-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open growth analytics lab
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={`/worktree-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open worktree lab
          </Link>
          <Link href={`/design-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open design lab
          </Link>
          <Link href={`/observability-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open observability lab
          </Link>
          <Link href={`/product-ops-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open product ops lab
          </Link>
          <Link href={`/monetization-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open monetization lab
          </Link>
          <Link href={`/knowledge-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open knowledge lab
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
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={`/merge-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open merge lab
          </Link>
          <Link href={`/rollback-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open rollback lab
          </Link>
          <Link href={`/connector-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open connector lab
          </Link>
          <Link href={`/agent-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open agent lab
          </Link>
          <Link href={`/deployment-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open deployment lab
          </Link>
          <Link href={`/testing-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open testing lab
          </Link>
          <Link href={`/cloud-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open cloud lab
          </Link>
          <Link href={`/cloud-cost-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open cloud cost lab
          </Link>
          <Link href={`/handoff-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open handoff lab
          </Link>
          <Link href={`/skills-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open skills lab
          </Link>
        </div>

        <p className="mt-8">
          <Link href={`/?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Back to homepage
          </Link>
        </p>
      </section>
    </main>
  );
}
