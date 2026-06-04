"use client";

import { useEffect, useMemo, useState } from "react";

type MetricPayload = {
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

type HealthPayload = {
  ok: boolean;
  timestamp: string;
  checks: {
    siteUrlConfigured: boolean;
    contactEmailConfigured: boolean;
    integrations: Array<{
      id: string;
      status: string;
    }>;
  };
};

export function StudioLivePanel() {
  const [metrics, setMetrics] = useState<MetricPayload | null>(null);
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);

    try {
      const [metricsRes, healthRes] = await Promise.all([fetch("/api/metrics"), fetch("/api/health")]);

      if (!metricsRes.ok || !healthRes.ok) {
        throw new Error("Failed to fetch studio telemetry.");
      }

      setMetrics((await metricsRes.json()) as MetricPayload);
      setHealth((await healthRes.json()) as HealthPayload);
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Unknown studio telemetry error.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  const checklist = useMemo(() => {
    if (!health) return [];

    return [
      {
        id: "site-url",
        label: "Site URL configured",
        ok: health.checks.siteUrlConfigured
      },
      {
        id: "contact-email",
        label: "Contact email configured",
        ok: health.checks.contactEmailConfigured
      },
      {
        id: "integration-health",
        label: "Integration env coverage",
        ok: health.checks.integrations.some((item) => item.status === "configured")
      }
    ];
  }, [health]);

  return (
    <section className="mt-8 rounded-xl border border-seis-line bg-seis-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-3xl">Live Studio Telemetry</h2>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="rounded-full border border-seis-line px-3 py-1 text-xs uppercase tracking-[0.1em] text-seis-muted hover:border-seis-accent disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

      {metrics ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-10">
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Locales</p>
            <p className="mt-1 font-serif text-3xl">{metrics.summary.locales}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Cases / Works</p>
            <p className="mt-1 font-serif text-3xl">{metrics.summary.cases + metrics.summary.works}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Insights</p>
            <p className="mt-1 font-serif text-3xl">{metrics.summary.insights}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Configured Integrations</p>
            <p className="mt-1 font-serif text-3xl">{metrics.summary.integrationsConfigured}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Playbooks / AI Workflows</p>
            <p className="mt-1 font-serif text-3xl">{metrics.summary.automationPlaybooks + metrics.summary.aiWorkflows}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Governance / Flags</p>
            <p className="mt-1 font-serif text-3xl">{metrics.summary.governanceRules + metrics.summary.featureFlags}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Risk / Strategy Units</p>
            <p className="mt-1 font-serif text-3xl">
              {metrics.summary.risks + metrics.summary.releaseScenarios + metrics.summary.launchChecklistItems}
            </p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Intelligence Units</p>
            <p className="mt-1 font-serif text-3xl">
              {metrics.summary.providerChannels + metrics.summary.funnelStages + metrics.summary.roadmapPhases + metrics.summary.experienceSignals}
            </p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Resilience Units</p>
            <p className="mt-1 font-serif text-3xl">
              {metrics.summary.incidentScenarios + metrics.summary.dependencyPolicies + metrics.summary.pipelinePhases + metrics.summary.seoChecks}
            </p>
          </article>
          <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Command Units</p>
            <p className="mt-1 font-serif text-3xl">
              {metrics.summary.sreSlos +
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
                metrics.summary.cloudObservabilityPlusSignals}
            </p>
          </article>
        </div>
      ) : null}

      {checklist.length > 0 ? (
        <ul className="mt-4 grid gap-2 text-sm text-seis-muted">
          {checklist.map((item) => (
            <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
              <span className={item.ok ? "text-emerald-300" : "text-amber-300"}>{item.ok ? "PASS" : "CHECK"}</span>{" "}
              {item.label}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
