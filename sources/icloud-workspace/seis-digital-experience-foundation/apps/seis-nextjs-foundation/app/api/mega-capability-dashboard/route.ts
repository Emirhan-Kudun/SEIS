import { NextResponse } from "next/server";

import { getAccessibilitySummary } from "@/lib/accessibility-command";
import { getAiWorkflowStats } from "@/lib/ai-workflows";
import { getAiGovernanceSummary } from "@/lib/ai-governance-command";
import { getAutomationSummary } from "@/lib/automation-command";
import { getBenchCapabilitySummary } from "@/lib/bench-capabilities";
import { getCollaborationSummary } from "@/lib/collaboration-command";
import { getConnectorSummary } from "@/lib/connector-command";
import { getContentOpsSummary } from "@/lib/content-ops-command";
import { getDesignSystemSummary } from "@/lib/design-system-command";
import { getExperimentSummary } from "@/lib/experiment-command";
import { getFeatureFlagSummary } from "@/lib/feature-flags";
import { getFinopsSummary } from "@/lib/finops-command";
import { getGrowthAnalyticsSummary } from "@/lib/growth-analytics-command";
import { getKnowledgeSummary } from "@/lib/knowledge-command";
import { getMergeSummary } from "@/lib/merge-command";
import { getFunnelSummary } from "@/lib/funnel-strategy";
import { getGovernanceSummary } from "@/lib/governance-content";
import { getIncidentSummary } from "@/lib/incident-center";
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
import { getExperienceLabSummary } from "@/lib/experience-lab";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    dashboard: {
      ai: getAiWorkflowStats(),
      bench: getBenchCapabilitySummary(),
      flags: getFeatureFlagSummary(),
      funnel: getFunnelSummary(),
      governance: getGovernanceSummary(),
      launchChecklist: getLaunchChecklistSummary(),
      providers: getProviderOrchestrationSummary(),
      quality: getQualityAuditSummary(),
      releaseScenarios: getReleaseScenarioSummary(),
      risks: getRiskSummary(),
      roadmap: getRoadmapSummary(),
      experience: getExperienceLabSummary(),
      incidents: getIncidentSummary(),
      dependencies: getDependencySummary(),
      pipeline: getPipelineSummary(),
      seo: getSeoSummary(),
      sre: getSreSummary(),
      compliance: getComplianceSummary(),
      capacity: getCapacitySummary(),
      research: getResearchSummary(),
      automation: getAutomationSummary(),
      finops: getFinopsSummary(),
      localization: getLocalizationSummary(),
      security: getSecuritySummary(),
      accessibility: getAccessibilitySummary(),
      experiments: getExperimentSummary(),
      collaboration: getCollaborationSummary(),
      performance: getPerformanceCommandSummary(),
      contentOps: getContentOpsSummary(),
      aiGovernance: getAiGovernanceSummary(),
      growthAnalytics: getGrowthAnalyticsSummary(),
      worktree: getWorktreeSummary(),
      design: getDesignSystemSummary(),
      observability: getObservabilitySummary(),
      productOps: getProductOpsSummary(),
      monetization: getMonetizationSummary(),
      knowledge: getKnowledgeSummary(),
      merge: getMergeSummary(),
      rollback: getRollbackSummary(),
      connector: getConnectorSummary(),
      agent: getAgentSummary(),
      deployment: getDeploymentSummary(),
      testing: getTestingSummary(),
      cloud: getCloudSummary(),
      cloudCost: getCloudCostSummary(),
      handoff: getHandoffSummary(),
      skills: getSkillsSummary(),
      cloudSecurity: getCloudSecuritySummary(),
      cloudDeployPipeline: getCloudDeployPipelineSummary(),
      cloudObservabilityPlus: getCloudObservabilityPlusSummary()
    }
  });
}
