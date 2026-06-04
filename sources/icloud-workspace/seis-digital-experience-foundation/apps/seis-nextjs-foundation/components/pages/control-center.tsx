"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { Locale } from "@/lib/content";

type SearchDomain = "all" | "works" | "insights" | "cases" | "playbooks" | "ops" | "strategy" | "intelligence" | "resilience" | "command";

type SearchResult = {
  type:
    | "work"
    | "insight"
    | "case"
    | "playbook"
    | "workflow"
    | "governance"
    | "flag"
    | "capability"
    | "risk"
    | "scenario"
    | "checklist"
    | "provider"
    | "funnel"
    | "roadmap"
    | "experience"
    | "quality"
    | "incident"
    | "dependency"
    | "pipeline"
    | "seo"
    | "sre"
    | "compliance"
    | "capacity"
    | "research"
    | "automation"
    | "finops"
    | "localization"
    | "security"
    | "accessibility"
    | "experiment"
    | "collaboration"
    | "performance"
    | "contentops"
    | "aigovernance"
    | "growthanalytics"
    | "worktree"
    | "design"
    | "observability"
    | "productops"
    | "monetization"
    | "knowledge"
    | "merge"
    | "rollback"
    | "connector"
    | "agent"
    | "deployment"
    | "testing"
    | "cloud"
    | "cloudcost"
    | "handoff"
    | "skills"
    | "cloudsecurity"
    | "clouddeploy"
    | "cloudobservabilityplus";
  slug: string;
  title: string;
  subtitle: string;
  href: string;
};

type SearchPayload = {
  ok: boolean;
  total: number;
  results: SearchResult[];
};

type MetricsPayload = {
  ok: boolean;
  generatedAt: string;
  summary: {
    locales: number;
    cases: number;
    works: number;
    insights: number;
    services: number;
    automationPlaybooks: number;
    aiWorkflows: number;
    governanceRules: number;
    featureFlags: number;
    capabilityGroups: number;
    risks: number;
    releaseScenarios: number;
    launchChecklistItems: number;
    providerChannels: number;
    connectorStrategiesActive: number;
    funnelStages: number;
    funnelOptimizations: number;
    roadmapPhases: number;
    roadmapTracks: number;
    experienceSignals: number;
    activeExperiments: number;
    incidentScenarios: number;
    incidentDrillsReady: number;
    dependencyPolicies: number;
    restrictedDependencies: number;
    pipelinePhases: number;
    pipelineWatchPhases: number;
    seoChecks: number;
    seoWatchChecks: number;
    sreSlos: number;
    sreRunbooks: number;
    complianceControls: number;
    complianceWatchControls: number;
    capacityModels: number;
    capacityRiskModels: number;
    researchSignals: number;
    researchBlockedSignals: number;
    automationPipelines: number;
    automationBlockedPipelines: number;
    finopsBudgets: number;
    finopsOverBudgets: number;
    localizationCoverageRows: number;
    localizationMissingRows: number;
    securityRisks: number;
    securityCriticalRisks: number;
    accessibilityChecks: number;
    accessibilityFailChecks: number;
    experimentTracks: number;
    experimentRiskTracks: number;
    collaborationFlows: number;
    collaborationBlockedFlows: number;
    performanceSignals: number;
    performanceCriticalSignals: number;
    contentOpsSignals: number;
    contentOpsCriticalSignals: number;
    aiGovernanceRules: number;
    aiGovernanceMissingRules: number;
    growthAnalyticsStages: number;
    growthAnalyticsCriticalStages: number;
    worktreeSignals: number;
    worktreeCriticalSignals: number;
    designSignals: number;
    designCriticalSignals: number;
    observabilitySignals: number;
    observabilityCriticalSignals: number;
    productOpsSignals: number;
    productOpsCriticalSignals: number;
    monetizationSignals: number;
    monetizationCriticalSignals: number;
    knowledgeSignals: number;
    knowledgeCriticalSignals: number;
    mergeSignals: number;
    mergeCriticalSignals: number;
    rollbackSignals: number;
    rollbackCriticalSignals: number;
    connectorSignals: number;
    connectorCriticalSignals: number;
    agentSignals: number;
    agentCriticalSignals: number;
    deploymentSignals: number;
    deploymentCriticalSignals: number;
    testingSignals: number;
    testingCriticalSignals: number;
    cloudSignals: number;
    cloudCriticalSignals: number;
    cloudCostSignals: number;
    cloudCostCriticalSignals: number;
    handoffSignals: number;
    handoffCriticalSignals: number;
    skillsSignals: number;
    skillsCriticalSignals: number;
    cloudSecuritySignals: number;
    cloudSecurityCriticalSignals: number;
    cloudDeployPipelineSignals: number;
    cloudDeployPipelineCriticalSignals: number;
    cloudObservabilityPlusSignals: number;
    cloudObservabilityPlusCriticalSignals: number;
    integrationsTotal: number;
    integrationsConfigured: number;
  };
};

type ReleasePayload = {
  ok: boolean;
  score: number;
  riskLevel: "low" | "medium" | "high";
  summary: {
    totalGates: number;
    passing: number;
    warnings: number;
    failures: number;
  };
};

type ControlCenterProps = {
  locale: Locale;
};

export function ControlCenter({ locale }: ControlCenterProps) {
  const [query, setQuery] = useState("premium");
  const [domain, setDomain] = useState<SearchDomain>("all");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [metrics, setMetrics] = useState<MetricsPayload | null>(null);
  const [release, setRelease] = useState<ReleasePayload | null>(null);
  const [signalError, setSignalError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSignals() {
      try {
        const [metricsRes, releaseRes] = await Promise.all([fetch("/api/metrics"), fetch("/api/release-readiness")]);
        if (!metricsRes.ok || !releaseRes.ok) throw new Error("Signal endpoints failed.");
        setMetrics((await metricsRes.json()) as MetricsPayload);
        setRelease((await releaseRes.json()) as ReleasePayload);
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : "Signal loading failed.";
        setSignalError(message);
      }
    }

    void loadSignals();
  }, []);

  async function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: query,
        domain,
        lang: locale,
        limit: "24"
      });
      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Search request failed.");
      }

      const payload = (await response.json()) as SearchPayload;
      setResults(payload.results);

      void trackEvent({
        name: "control_search_executed",
        scope: "control-center",
        label: domain,
        locale,
        metadata: {
          query,
          resultCount: payload.total
        }
      });
    } catch (searchError) {
      const message = searchError instanceof Error ? searchError.message : "Search failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-seis-line bg-seis-surface p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-9">
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Release Score</p>
          <p className="mt-1 font-serif text-3xl">{release?.score ?? "-"}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">{release?.riskLevel ?? "loading"}</p>
        </article>
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Content Units</p>
          <p className="mt-1 font-serif text-3xl">
            {metrics ? metrics.summary.works + metrics.summary.cases + metrics.summary.insights : "-"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">works + cases + insights</p>
        </article>
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Locales</p>
          <p className="mt-1 font-serif text-3xl">{metrics?.summary.locales ?? "-"}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">active language targets</p>
        </article>
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Configured Integrations</p>
          <p className="mt-1 font-serif text-3xl">{metrics?.summary.integrationsConfigured ?? "-"}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">runtime env coverage</p>
        </article>
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Playbooks + AI</p>
          <p className="mt-1 font-serif text-3xl">
            {metrics ? metrics.summary.automationPlaybooks + metrics.summary.aiWorkflows : "-"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">ops intelligence units</p>
        </article>
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Risk + Strategy</p>
          <p className="mt-1 font-serif text-3xl">
            {metrics ? metrics.summary.risks + metrics.summary.releaseScenarios + metrics.summary.launchChecklistItems : "-"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">risk/scenario/checklist units</p>
        </article>
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Intelligence Units</p>
          <p className="mt-1 font-serif text-3xl">
            {metrics ? metrics.summary.providerChannels + metrics.summary.funnelStages + metrics.summary.roadmapPhases + metrics.summary.experienceSignals : "-"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">provider/funnel/roadmap/ux</p>
        </article>
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Resilience Units</p>
          <p className="mt-1 font-serif text-3xl">
            {metrics ? metrics.summary.incidentScenarios + metrics.summary.dependencyPolicies + metrics.summary.pipelinePhases + metrics.summary.seoChecks : "-"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">incident/dependency/pipeline/seo</p>
        </article>
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Command Units</p>
          <p className="mt-1 font-serif text-3xl">
            {metrics
              ? metrics.summary.sreSlos +
                metrics.summary.complianceControls +
                metrics.summary.capacityModels +
                metrics.summary.researchSignals +
                metrics.summary.automationPipelines +
                metrics.summary.finopsBudgets +
                metrics.summary.localizationCoverageRows +
                metrics.summary.securityRisks +
                metrics.summary.accessibilityChecks +
                metrics.summary.experimentTracks +
                metrics.summary.collaborationFlows +
                metrics.summary.performanceSignals +
                metrics.summary.contentOpsSignals +
                metrics.summary.aiGovernanceRules +
                metrics.summary.growthAnalyticsStages +
                metrics.summary.worktreeSignals +
                metrics.summary.designSignals +
                metrics.summary.observabilitySignals +
                metrics.summary.productOpsSignals +
                metrics.summary.monetizationSignals +
                metrics.summary.knowledgeSignals +
                metrics.summary.mergeSignals +
                metrics.summary.rollbackSignals +
                metrics.summary.connectorSignals +
                metrics.summary.agentSignals +
                metrics.summary.deploymentSignals +
                metrics.summary.testingSignals +
                metrics.summary.cloudSignals +
                metrics.summary.cloudCostSignals +
                metrics.summary.handoffSignals +
                metrics.summary.skillsSignals +
                metrics.summary.cloudSecuritySignals +
                metrics.summary.cloudDeployPipelineSignals +
                metrics.summary.cloudObservabilityPlusSignals
              : "-"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">sre/compliance/capacity/research/automation/finops/localization/security/accessibility/experiment/collaboration/performance/contentops/aigovernance/growthanalytics/worktree/design/observability/productops/monetization/knowledge/merge/rollback/connector/agent/deployment/testing/cloud/cloudcost/handoff/skills/cloudsecurity/clouddeploy/cloudobservabilityplus</p>
        </article>
      </div>

      {signalError ? <p className="mt-3 text-sm text-amber-300">{signalError}</p> : null}

      <form onSubmit={runSearch} className="mt-5 grid gap-3 rounded-xl border border-seis-line bg-[#1a1510] p-4 sm:grid-cols-[2fr_1fr_auto]">
        <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
          Search query
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="premium motion ai"
            className="rounded-lg border border-seis-line bg-[#120f0c] px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          />
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
          Domain
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value as SearchDomain)}
            className="rounded-lg border border-seis-line bg-[#120f0c] px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          >
            <option value="all">All</option>
            <option value="works">Works</option>
            <option value="insights">Insights</option>
            <option value="cases">Case Studies</option>
            <option value="playbooks">Playbooks</option>
            <option value="ops">Ops + Governance</option>
            <option value="strategy">Risk + Strategy</option>
            <option value="intelligence">Provider + Growth + UX</option>
            <option value="resilience">Incident + Dependency + SEO</option>
            <option value="command">SRE + Compliance + Capacity + Research + Automation + FinOps + Localization + Security + Accessibility + Experiment + Collaboration + Performance + ContentOps + AIGovernance + GrowthAnalytics + Worktree + Design + Observability + ProductOps + Monetization + Knowledge + Merge + Rollback + Connector + Agent + Deployment + Testing + Cloud Security + Cloud Deploy + Cloud Observability Plus</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="self-end rounded-full border border-seis-accent bg-seis-accent px-4 py-2 text-xs uppercase tracking-[0.1em] text-[#16110c] disabled:opacity-60"
        >
          {loading ? "Searching..." : "Run Search"}
        </button>
      </form>

      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

      <div className="mt-4 grid gap-2">
        {results.length === 0 ? (
          <p className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-sm text-seis-muted">
            No results yet. Run a query to search works, case studies, insights, playbooks, and ops governance signals.
          </p>
        ) : (
          results.map((item) => (
            <Link key={`${item.type}-${item.slug}`} href={item.href} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 hover:border-seis-accent">
              <p className="text-xs uppercase tracking-[0.08em] text-seis-accent">{item.type}</p>
              <p className="mt-1 text-sm text-seis-text">{item.title}</p>
              <p className="mt-1 text-sm text-seis-muted">{item.subtitle}</p>
            </Link>
          ))
        )}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/api/system-manifest" className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /api/system-manifest
        </Link>
        <Link href="/api/release-readiness" className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /api/release-readiness
        </Link>
        <Link href={`/playbooks?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /playbooks
        </Link>
        <Link href={`/studio?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /studio
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/api/quality-scorecard" className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /api/quality-scorecard
        </Link>
        <Link href={`/ops?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /ops
        </Link>
        <Link href={`/governance?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /governance
        </Link>
        <Link href={`/bench?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /bench
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <Link href="/api/tomorrow-sprint" className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /api/tomorrow-sprint
        </Link>
        <Link href={`/ops?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          open ops plan console
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        <Link href={`/strategy?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /strategy
        </Link>
        <Link href={`/release-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /release-lab
        </Link>
        <Link href={`/risk?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /risk
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/incident-center?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /incident-center
        </Link>
        <Link href={`/dependency-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /dependency-lab
        </Link>
        <Link href={`/execution-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /execution-lab
        </Link>
        <Link href={`/seo-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /seo-lab
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/sre-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /sre-lab
        </Link>
        <Link href={`/compliance-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /compliance-lab
        </Link>
        <Link href={`/capacity-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /capacity-lab
        </Link>
        <Link href={`/research-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /research-lab
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <Link href={`/automation-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /automation-lab
        </Link>
        <Link href={`/finops-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /finops-lab
        </Link>
        <Link href={`/localization-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /localization-lab
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/security-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /security-lab
        </Link>
        <Link href={`/accessibility-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /accessibility-lab
        </Link>
        <Link href={`/experiment-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /experiment-lab
        </Link>
        <Link href={`/collaboration-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /collaboration-lab
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/performance-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /performance-lab
        </Link>
        <Link href={`/content-ops-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /content-ops-lab
        </Link>
        <Link href={`/ai-governance-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /ai-governance-lab
        </Link>
        <Link href={`/growth-analytics-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /growth-analytics-lab
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <Link href={`/worktree-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /worktree-lab
        </Link>
        <Link href={`/design-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /design-lab
        </Link>
        <Link href={`/observability-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /observability-lab
        </Link>
        <Link href={`/product-ops-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /product-ops-lab
        </Link>
        <Link href={`/monetization-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /monetization-lab
        </Link>
        <Link href={`/knowledge-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /knowledge-lab
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <Link href={`/merge-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /merge-lab
        </Link>
        <Link href={`/rollback-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /rollback-lab
        </Link>
        <Link href={`/connector-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /connector-lab
        </Link>
        <Link href={`/agent-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /agent-lab
        </Link>
        <Link href={`/deployment-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /deployment-lab
        </Link>
        <Link href={`/testing-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /testing-lab
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <Link href={`/cloud-security-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /cloud-security-lab
        </Link>
        <Link href={`/cloud-deploy-pipeline-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /cloud-deploy-pipeline-lab
        </Link>
        <Link href={`/cloud-observability-plus-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /cloud-observability-plus-lab
        </Link>
      </div>
    </section>
  );
}
