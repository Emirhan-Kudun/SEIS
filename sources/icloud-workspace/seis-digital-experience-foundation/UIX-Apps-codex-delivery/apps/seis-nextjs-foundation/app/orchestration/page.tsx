import type { Metadata } from "next";
import Link from "next/link";

import { getAccessibilitySummary } from "@/lib/accessibility-command";
import { getAutomationSummary } from "@/lib/automation-command";
import { getAiGovernanceSummary } from "@/lib/ai-governance-command";
import { getCollaborationSummary } from "@/lib/collaboration-command";
import { getConnectorSummary } from "@/lib/connector-command";
import { getContentOpsSummary } from "@/lib/content-ops-command";
import { getDesignSystemSummary } from "@/lib/design-system-command";
import { resolveLocale } from "@/lib/content";
import { getCapacitySummary } from "@/lib/capacity-forecast";
import { getComplianceSummary } from "@/lib/compliance-matrix";
import { getDependencySummary } from "@/lib/dependency-governance";
import { getExperienceLabSummary } from "@/lib/experience-lab";
import { getExperimentSummary } from "@/lib/experiment-command";
import { getFinopsSummary } from "@/lib/finops-command";
import { getGrowthAnalyticsSummary } from "@/lib/growth-analytics-command";
import { getKnowledgeSummary } from "@/lib/knowledge-command";
import { getMergeSummary } from "@/lib/merge-command";
import { getFunnelSummary } from "@/lib/funnel-strategy";
import { getIncidentSummary } from "@/lib/incident-center";
import { getPipelineSummary } from "@/lib/execution-pipeline";
import { getLocalizationSummary } from "@/lib/localization-command";
import { getMonetizationSummary } from "@/lib/monetization-command";
import { getObservabilitySummary } from "@/lib/observability-command";
import { getPerformanceCommandSummary } from "@/lib/performance-command";
import { getProductOpsSummary } from "@/lib/product-ops-command";
import { getProviderOrchestrationSummary } from "@/lib/provider-orchestration";
import { getQualityAuditSummary } from "@/lib/quality-audits";
import { getResearchSummary } from "@/lib/research-ops";
import { getRollbackSummary } from "@/lib/rollback-command";
import { getRiskSummary } from "@/lib/risk-register";
import { getSecuritySummary } from "@/lib/security-command";
import { getSeoSummary } from "@/lib/seo-intelligence";
import { getSreSummary } from "@/lib/sre-command";
import { getRoadmapSummary } from "@/lib/system-roadmap";
import { getWorktreeSummary } from "@/lib/worktree-command";
import { getAgentSummary } from "@/lib/agent-command";
import { getGoogleCopilotSummary } from "@/lib/google-open-source-copilot";
import { getDeploymentSummary } from "@/lib/deployment-command";
import { getTestingSummary } from "@/lib/testing-command";
import { getCloudSummary } from "@/lib/cloud-command";
import { getCloudCostSummary } from "@/lib/cloud-cost-command";
import { getHandoffSummary } from "@/lib/handoff-command";
import { getSkillsSummary } from "@/lib/skills-command";
import { getCloudSecuritySummary } from "@/lib/cloud-security-command";
import { getCloudDeployPipelineSummary } from "@/lib/cloud-deploy-pipeline-command";
import { getCloudObservabilityPlusSummary } from "@/lib/cloud-observability-plus-command";

export const metadata: Metadata = {
  title: "Orchestration",
  description: "Unified orchestration board connecting quality, provider, growth, roadmap, and risk signals.",
  alternates: {
    canonical: "/orchestration"
  }
};

type OrchestrationPageProps = {
  searchParams?: { lang?: string };
};

export default function OrchestrationPage({ searchParams }: OrchestrationPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const quality = getQualityAuditSummary();
  const providers = getProviderOrchestrationSummary();
  const funnel = getFunnelSummary();
  const roadmap = getRoadmapSummary();
  const experience = getExperienceLabSummary();
  const risks = getRiskSummary();
  const incidents = getIncidentSummary();
  const dependencies = getDependencySummary();
  const pipeline = getPipelineSummary();
  const seo = getSeoSummary();
  const sre = getSreSummary();
  const compliance = getComplianceSummary();
  const capacity = getCapacitySummary();
  const research = getResearchSummary();
  const automation = getAutomationSummary();
  const finops = getFinopsSummary();
  const localization = getLocalizationSummary();
  const security = getSecuritySummary();
  const accessibility = getAccessibilitySummary();
  const experiments = getExperimentSummary();
  const collaboration = getCollaborationSummary();
  const performance = getPerformanceCommandSummary();
  const contentOps = getContentOpsSummary();
  const aiGovernance = getAiGovernanceSummary();
  const growthAnalytics = getGrowthAnalyticsSummary();
  const worktree = getWorktreeSummary();
  const design = getDesignSystemSummary();
  const observability = getObservabilitySummary();
  const productOps = getProductOpsSummary();
  const monetization = getMonetizationSummary();
  const knowledge = getKnowledgeSummary();
  const merge = getMergeSummary();
  const rollback = getRollbackSummary();
  const connector = getConnectorSummary();
  const agent = getAgentSummary();
  const googleOpenSource = getGoogleCopilotSummary();
  const deployment = getDeploymentSummary();
  const testing = getTestingSummary();
  const cloud = getCloudSummary();
  const cloudCost = getCloudCostSummary();
  const handoff = getHandoffSummary();
  const skills = getSkillsSummary();
  const cloudSecurity = getCloudSecuritySummary();
  const cloudDeployPipeline = getCloudDeployPipelineSummary();
  const cloudObservabilityPlus = getCloudObservabilityPlusSummary();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Orchestration</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Quality, provider, funnel, roadmap, and risk systems synchronized in one command surface.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Enables high-confidence release decisions by making cross-system tradeoffs explicit and reviewable.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-8">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Quality</p>
            <p className="mt-1 font-serif text-3xl">{quality.performance.healthy + quality.accessibility.pass}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Providers</p>
            <p className="mt-1 font-serif text-3xl">{providers.readyProviders}/{providers.providers}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Funnel</p>
            <p className="mt-1 font-serif text-3xl">{funnel.totalEvents}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Roadmap Tracks</p>
            <p className="mt-1 font-serif text-3xl">{roadmap.tracks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical/High Risks</p>
            <p className="mt-1 font-serif text-3xl">{risks.byLevel.critical + risks.byLevel.high}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Incident Readiness</p>
            <p className="mt-1 font-serif text-3xl">{incidents.readyDrills}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Dependency Guardrails</p>
            <p className="mt-1 font-serif text-3xl">{dependencies.requiredGuardrails}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Command Coverage</p>
            <p className="mt-1 font-serif text-3xl">
              {sre.healthySlos +
                compliance.compliantControls +
                capacity.safeModels +
                research.validatedSignals +
                automation.healthyPipelines +
                finops.healthyBudgets +
                localization.completeRows +
                security.mitigatedRisks +
                accessibility.passChecks +
                experiments.runningTracks +
                collaboration.alignedFlows +
                performance.healthySignals +
                contentOps.healthySignals +
                aiGovernance.enforcedRules +
                growthAnalytics.healthyStages +
                worktree.healthySignals +
                design.healthySignals +
                observability.healthySignals +
                productOps.healthySignals +
                monetization.healthySignals +
                knowledge.healthySignals +
                merge.healthySignals +
                rollback.healthySignals +
                connector.healthySignals +
                agent.healthySignals +
                googleOpenSource.healthySignals +
                deployment.healthySignals +
                testing.healthySignals +
                cloud.healthySignals +
                cloudCost.healthySignals +
                handoff.healthySignals +
                skills.healthySignals +
                cloudSecurity.healthySignals +
                cloudDeployPipeline.healthySignals +
                cloudObservabilityPlus.healthySignals}
            </p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Quality Signal</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                Performance healthy: {quality.performance.healthy}/{quality.performance.total}
              </li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                Accessibility pass: {quality.accessibility.pass}/{quality.accessibility.total}
              </li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                Content aligned: {quality.contentGovernance.aligned}/{quality.contentGovernance.total}
              </li>
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Growth Signal</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Funnel stages: {funnel.stages}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Optimizations: {funnel.totalOptimizations}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Active experiments: {experience.activeExperiments}</li>
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Roadmap Signal</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Ready phases: {roadmap.readyPhases}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">In progress phases: {roadmap.inProgressPhases}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Risk tracks: {roadmap.riskTracks}</li>
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Resilience Signal</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Ready incident drills: {incidents.readyDrills}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Pipeline stable phases: {pipeline.stablePhases}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">SEO pass checks: {seo.passChecks}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">SRE healthy SLOs: {sre.healthySlos}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Compliance controls: {compliance.compliantControls}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Capacity safe models: {capacity.safeModels}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Validated research signals: {research.validatedSignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Healthy automation pipelines: {automation.healthyPipelines}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">FinOps healthy budgets: {finops.healthyBudgets}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Localization complete rows: {localization.completeRows}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Security mitigated risks: {security.mitigatedRisks}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Accessibility pass checks: {accessibility.passChecks}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Running experiments: {experiments.runningTracks}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Aligned collaboration flows: {collaboration.alignedFlows}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Performance healthy signals: {performance.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Content ops healthy signals: {contentOps.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">AI governance enforced rules: {aiGovernance.enforcedRules}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Growth healthy stages: {growthAnalytics.healthyStages}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Worktree healthy signals: {worktree.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Design healthy signals: {design.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Observability healthy signals: {observability.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Product ops healthy signals: {productOps.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Monetization healthy signals: {monetization.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Knowledge healthy signals: {knowledge.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Merge healthy signals: {merge.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Rollback healthy signals: {rollback.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Connector healthy signals: {connector.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Agent healthy signals: {agent.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Google open-source healthy signals: {googleOpenSource.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Deployment healthy signals: {deployment.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Testing healthy signals: {testing.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Cloud healthy signals: {cloud.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Cloud cost healthy signals: {cloudCost.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Handoff healthy signals: {handoff.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Skills healthy signals: {skills.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Cloud security healthy signals: {cloudSecurity.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Cloud deploy healthy signals: {cloudDeployPipeline.healthySignals}</li>
              <li className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">Cloud observability+ healthy signals: {cloudObservabilityPlus.healthySignals}</li>
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/orchestration-readiness" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/orchestration-readiness
          </Link>
          <Link href="/api/mega-capability-dashboard" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/mega-capability-dashboard
          </Link>
          <Link href={`/provider-hub?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open provider hub
          </Link>
          <Link href={`/growth-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open growth lab
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
          <Link href={`/google-open-source-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open google open source lab
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
          <Link href={`/cloud-security-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open cloud security lab
          </Link>
          <Link href={`/cloud-deploy-pipeline-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open cloud deploy pipeline lab
          </Link>
          <Link href={`/cloud-observability-plus-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open cloud observability plus lab
          </Link>
        </div>
      </section>
    </main>
  );
}
