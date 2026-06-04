import { NextResponse } from "next/server";

import { getAccessibilitySummary } from "@/lib/accessibility-command";
import { getAiWorkflowStats } from "@/lib/ai-workflows";
import { getAiGovernanceSummary } from "@/lib/ai-governance-command";
import { getAutomationSummary } from "@/lib/automation-command";
import { getBenchCapabilitySummary } from "@/lib/bench-capabilities";
import { getBranchHardeningSummary } from "@/lib/branch-hardening";
import { getCollaborationSummary } from "@/lib/collaboration-command";
import { getConnectorSummary } from "@/lib/connector-command";
import { getContentOpsSummary } from "@/lib/content-ops-command";
import { getDesignSystemSummary } from "@/lib/design-system-command";
import { automationPlaybooks } from "@/lib/automation-content";
import { locales } from "@/lib/content";
import { getExperimentSummary } from "@/lib/experiment-command";
import { getFeatureFlagSummary } from "@/lib/feature-flags";
import { getFinopsSummary } from "@/lib/finops-command";
import { getGrowthAnalyticsSummary } from "@/lib/growth-analytics-command";
import { getGoogleCopilotSummary } from "@/lib/google-open-source-copilot";
import { getKnowledgeSummary } from "@/lib/knowledge-command";
import { getExperienceLabSummary } from "@/lib/experience-lab";
import { getMergeSummary } from "@/lib/merge-command";
import { getIncidentSummary } from "@/lib/incident-center";
import { getFunnelSummary } from "@/lib/funnel-strategy";
import { getGovernanceSummary } from "@/lib/governance-content";
import { integrationEntries } from "@/lib/integrations";
import { getLaunchChecklistSummary } from "@/lib/launch-checklist";
import { getLocalizationSummary } from "@/lib/localization-command";
import { getMonetizationSummary } from "@/lib/monetization-command";
import { getObservabilitySummary } from "@/lib/observability-command";
import { getPerformanceCommandSummary } from "@/lib/performance-command";
import { getProductOpsSummary } from "@/lib/product-ops-command";
import { getProviderOrchestrationSummary } from "@/lib/provider-orchestration";
import { getQualityAuditSummary } from "@/lib/quality-audits";
import { getReleaseScenarioSummary } from "@/lib/release-scenarios";
import { getRiskSummary } from "@/lib/risk-register";
import { getCapacitySummary } from "@/lib/capacity-forecast";
import { getComplianceSummary } from "@/lib/compliance-matrix";
import { getDependencySummary } from "@/lib/dependency-governance";
import { getPipelineSummary } from "@/lib/execution-pipeline";
import { getResearchSummary } from "@/lib/research-ops";
import { getRollbackSummary } from "@/lib/rollback-command";
import { getSecuritySummary } from "@/lib/security-command";
import { getSeoSummary } from "@/lib/seo-intelligence";
import { getSreSummary } from "@/lib/sre-command";
import { getRoadmapSummary } from "@/lib/system-roadmap";
import { getWorktreeSummary } from "@/lib/worktree-command";
import { getAgentSummary } from "@/lib/agent-command";
import { getDeploymentSummary } from "@/lib/deployment-command";
import { getTestingSummary } from "@/lib/testing-command";
import { getCloudSummary } from "@/lib/cloud-command";
import { getCloudCostSummary } from "@/lib/cloud-cost-command";
import { getHandoffSummary } from "@/lib/handoff-command";
import { getSkillsSummary } from "@/lib/skills-command";
import { getCloudSecuritySummary } from "@/lib/cloud-security-command";
import { getCloudDeployPipelineSummary } from "@/lib/cloud-deploy-pipeline-command";
import { getCloudObservabilityPlusSummary } from "@/lib/cloud-observability-plus-command";
import { getFullStackRuntimeSummary } from "@/lib/fullstack-runtime";
import { siteConfig } from "@/lib/site-config";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    system: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      url: siteConfig.url,
      locales
    },
    modules: {
      api: [
        "/api/health",
        "/health",
        "/metrics",
        "/api/site",
        "/api/content-snapshot",
        "/api/integrations",
        "/api/metrics",
        "/api/multilingual-planning",
        "/api/projects",
        "/api/skills",
        "/api/briefs",
        "/api/readiness",
        "/api/scope-plans",
        "/api/doctrine",
        "/api/search",
        "/api/estimate",
        "/api/newsletter",
        "/api/contact",
        "/api/events",
        "/api/admin/submissions",
        "/api/admin/events",
        "/api/admin/briefs",
        "/api/admin/readiness",
        "/api/admin/scope-plans",
        "/api/admin/runtime",
        "/api/automation-playbooks",
        "/api/interaction-lab",
        "/api/ai-workflows",
        "/api/release-readiness",
        "/api/system-manifest",
        "/api/governance-matrix",
        "/api/feature-flags",
        "/api/bench-capabilities",
        "/api/quality-scorecard",
        "/api/tomorrow-sprint",
        "/api/risk-register",
        "/api/release-scenarios",
        "/api/launch-checklist",
        "/api/branch-strategy",
        "/api/branch-hardening",
        "/api/quality-audits",
        "/api/provider-orchestration",
        "/api/funnel-strategy",
        "/api/mega-capability-dashboard",
        "/api/system-roadmap",
        "/api/experience-lab",
        "/api/orchestration-readiness",
        "/api/incident-center",
        "/api/dependency-governance",
        "/api/execution-pipeline",
        "/api/seo-intelligence",
        "/api/sre-command",
        "/api/compliance-matrix",
        "/api/capacity-forecast",
        "/api/research-ops",
        "/api/automation-command",
        "/api/finops-command",
        "/api/localization-command",
        "/api/security-command",
        "/api/accessibility-command",
        "/api/experiment-command",
        "/api/collaboration-command",
        "/api/performance-command",
        "/api/content-ops-command",
        "/api/ai-governance-command",
        "/api/growth-analytics-command",
        "/api/worktree-command",
        "/api/design-system",
        "/api/design-system-command",
        "/api/governance",
        "/api/observability",
        "/api/observability-command",
        "/api/product-ops-command",
        "/api/monetization-command",
        "/api/knowledge-command",
        "/api/merge-command",
        "/api/rollback-command",
        "/api/connector-command",
        "/api/agent-command",
        "/api/google-open-source-copilot",
        "/api/deployment-command",
        "/api/testing-command",
        "/api/cloud-command",
        "/api/cloud-cost-command",
        "/api/handoff-command",
        "/api/skills-command",
        "/api/cloud-security-command",
        "/api/cloud-deploy-pipeline-command",
        "/api/cloud-observability-plus-command"
      ],
      routes: [
        "/",
        "/works",
        "/insights",
        "/services",
        "/studio",
        "/automation",
        "/playbooks",
        "/interaction-lab",
        "/control",
        "/ops",
        "/strategy",
        "/release-lab",
        "/risk",
        "/quality-lab",
        "/provider-hub",
        "/growth-lab",
        "/experience-lab",
        "/orchestration",
        "/incident-center",
        "/dependency-lab",
        "/execution-lab",
        "/seo-lab",
        "/sre-lab",
        "/compliance-lab",
        "/capacity-lab",
        "/research-lab",
        "/automation-lab",
        "/finops-lab",
        "/localization-lab",
        "/security-lab",
        "/accessibility-lab",
        "/experiment-lab",
        "/collaboration-lab",
        "/performance-lab",
        "/content-ops-lab",
        "/ai-governance-lab",
        "/growth-analytics-lab",
        "/worktree-lab",
        "/branch-hardening",
        "/runtime-admin",
        "/design-lab",
        "/observability-lab",
        "/product-ops-lab",
        "/monetization-lab",
        "/knowledge-lab",
        "/merge-lab",
        "/rollback-lab",
        "/connector-lab",
        "/agent-lab",
        "/google-open-source-lab",
        "/deployment-lab",
        "/testing-lab",
        "/cloud-lab",
        "/cloud-cost-lab",
        "/handoff-lab",
        "/skills-lab",
        "/cloud-security-lab",
        "/cloud-deploy-pipeline-lab",
        "/cloud-observability-plus-lab",
        "/governance",
        "/bench",
        "/doctrine",
        "/doctrine/[slug]"
      ]
    },
    capabilities: {
      integrationCatalog: integrationEntries.length,
      fullStackRuntime: getFullStackRuntimeSummary(),
      branchHardeningSummary: getBranchHardeningSummary(),
      automationPlaybooks: automationPlaybooks.length,
      aiWorkflowStats: getAiWorkflowStats(),
      governanceSummary: getGovernanceSummary(),
      featureFlagSummary: getFeatureFlagSummary(),
      benchCapabilitySummary: getBenchCapabilitySummary(),
      riskSummary: getRiskSummary(),
      releaseScenarioSummary: getReleaseScenarioSummary(),
      launchChecklistSummary: getLaunchChecklistSummary(),
      qualitySummary: getQualityAuditSummary(),
      providerOrchestrationSummary: getProviderOrchestrationSummary(),
      funnelSummary: getFunnelSummary(),
      roadmapSummary: getRoadmapSummary(),
      experienceSummary: getExperienceLabSummary(),
      incidentSummary: getIncidentSummary(),
      dependencySummary: getDependencySummary(),
      pipelineSummary: getPipelineSummary(),
      seoSummary: getSeoSummary(),
      sreSummary: getSreSummary(),
      complianceSummary: getComplianceSummary(),
      capacitySummary: getCapacitySummary(),
      researchSummary: getResearchSummary(),
      automationSummary: getAutomationSummary(),
      finopsSummary: getFinopsSummary(),
      localizationSummary: getLocalizationSummary(),
      securitySummary: getSecuritySummary(),
      accessibilitySummary: getAccessibilitySummary(),
      experimentSummary: getExperimentSummary(),
      collaborationSummary: getCollaborationSummary(),
      performanceSummary: getPerformanceCommandSummary(),
      contentOpsSummary: getContentOpsSummary(),
      aiGovernanceSummary: getAiGovernanceSummary(),
      growthAnalyticsSummary: getGrowthAnalyticsSummary(),
      worktreeSummary: getWorktreeSummary(),
      designSummary: getDesignSystemSummary(),
      observabilitySummary: getObservabilitySummary(),
      productOpsSummary: getProductOpsSummary(),
      monetizationSummary: getMonetizationSummary(),
      knowledgeSummary: getKnowledgeSummary(),
      mergeSummary: getMergeSummary(),
      rollbackSummary: getRollbackSummary(),
      connectorSummary: getConnectorSummary(),
      agentSummary: getAgentSummary(),
      googleCopilotSummary: getGoogleCopilotSummary(),
      deploymentSummary: getDeploymentSummary(),
      testingSummary: getTestingSummary(),
      cloudSummary: getCloudSummary(),
      cloudCostSummary: getCloudCostSummary(),
      handoffSummary: getHandoffSummary(),
      skillsSummary: getSkillsSummary(),
      cloudSecuritySummary: getCloudSecuritySummary(),
      cloudDeployPipelineSummary: getCloudDeployPipelineSummary(),
      cloudObservabilityPlusSummary: getCloudObservabilityPlusSummary()
    }
  });
}
