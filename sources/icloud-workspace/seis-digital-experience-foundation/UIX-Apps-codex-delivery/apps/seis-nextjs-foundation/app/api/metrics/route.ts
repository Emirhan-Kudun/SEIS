import { NextResponse } from "next/server";

import { getAccessibilitySummary } from "@/lib/accessibility-command";
import { getAiWorkflowPacks } from "@/lib/ai-workflows";
import { getAiGovernanceSummary } from "@/lib/ai-governance-command";
import { getAutomationSummary } from "@/lib/automation-command";
import { automationPlaybooks } from "@/lib/automation-content";
import { getBenchCapabilityGroups } from "@/lib/bench-capabilities";
import { getCollaborationSummary } from "@/lib/collaboration-command";
import { getConnectorSummary } from "@/lib/connector-command";
import { getContentOpsSummary } from "@/lib/content-ops-command";
import { getCaseStudies, locales } from "@/lib/content";
import { getWorkItems, getServiceItems } from "@/lib/creative-content";
import { getExperimentSummary } from "@/lib/experiment-command";
import { getFeatureFlags } from "@/lib/feature-flags";
import { getFinopsSummary } from "@/lib/finops-command";
import { getGrowthAnalyticsSummary } from "@/lib/growth-analytics-command";
import { getKnowledgeSummary } from "@/lib/knowledge-command";
import { getExperienceLabSummary } from "@/lib/experience-lab";
import { getMergeSummary } from "@/lib/merge-command";
import { getFunnelSummary } from "@/lib/funnel-strategy";
import { getGovernanceRules } from "@/lib/governance-content";
import { getIncidentSummary } from "@/lib/incident-center";
import { integrationEntries, resolveIntegrationStatus } from "@/lib/integrations";
import { getInsights } from "@/lib/insights-content";
import { getLaunchChecklistSummary } from "@/lib/launch-checklist";
import { getLocalizationSummary } from "@/lib/localization-command";
import { getMonetizationSummary } from "@/lib/monetization-command";
import { getObservabilitySummary } from "@/lib/observability-command";
import { getPerformanceCommandSummary } from "@/lib/performance-command";
import { getProductOpsSummary } from "@/lib/product-ops-command";
import { getProviderOrchestrationSummary } from "@/lib/provider-orchestration";
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
import { getDesignSystemSummary } from "@/lib/design-system-command";
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

export async function GET() {
  const integrationStatuses = integrationEntries.map((entry) => resolveIntegrationStatus(entry));
  const integrationsConfigured = integrationStatuses.filter((status) => status === "configured").length;
  const riskSummary = getRiskSummary();
  const checklistSummary = getLaunchChecklistSummary();
  const scenarioSummary = getReleaseScenarioSummary();
  const providerSummary = getProviderOrchestrationSummary();
  const funnelSummary = getFunnelSummary();
  const roadmapSummary = getRoadmapSummary();
  const experienceSummary = getExperienceLabSummary();
  const incidentSummary = getIncidentSummary();
  const dependencySummary = getDependencySummary();
  const pipelineSummary = getPipelineSummary();
  const seoSummary = getSeoSummary();
  const sreSummary = getSreSummary();
  const complianceSummary = getComplianceSummary();
  const capacitySummary = getCapacitySummary();
  const researchSummary = getResearchSummary();
  const automationSummary = getAutomationSummary();
  const finopsSummary = getFinopsSummary();
  const localizationSummary = getLocalizationSummary();
  const securitySummary = getSecuritySummary();
  const accessibilitySummary = getAccessibilitySummary();
  const experimentSummary = getExperimentSummary();
  const collaborationSummary = getCollaborationSummary();
  const performanceSummary = getPerformanceCommandSummary();
  const contentOpsSummary = getContentOpsSummary();
  const aiGovernanceSummary = getAiGovernanceSummary();
  const growthAnalyticsSummary = getGrowthAnalyticsSummary();
  const worktreeSummary = getWorktreeSummary();
  const designSummary = getDesignSystemSummary();
  const observabilitySummary = getObservabilitySummary();
  const productOpsSummary = getProductOpsSummary();
  const monetizationSummary = getMonetizationSummary();
  const knowledgeSummary = getKnowledgeSummary();
  const mergeSummary = getMergeSummary();
  const rollbackSummary = getRollbackSummary();
  const connectorSummary = getConnectorSummary();
  const agentSummary = getAgentSummary();
  const deploymentSummary = getDeploymentSummary();
  const testingSummary = getTestingSummary();
  const cloudSummary = getCloudSummary();
  const cloudCostSummary = getCloudCostSummary();
  const handoffSummary = getHandoffSummary();
  const skillsSummary = getSkillsSummary();
  const cloudSecuritySummary = getCloudSecuritySummary();
  const cloudDeployPipelineSummary = getCloudDeployPipelineSummary();
  const cloudObservabilityPlusSummary = getCloudObservabilityPlusSummary();

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: {
      locales: locales.length,
      cases: getCaseStudies("en").length,
      works: getWorkItems("en").length,
      insights: getInsights("en").length,
      services: getServiceItems().length,
      automationPlaybooks: automationPlaybooks.length,
      aiWorkflows: getAiWorkflowPacks().length,
      governanceRules: getGovernanceRules().length,
      featureFlags: getFeatureFlags().length,
      capabilityGroups: getBenchCapabilityGroups().length,
      risks: riskSummary.total,
      releaseScenarios: scenarioSummary.total,
      launchChecklistItems: checklistSummary.total,
      providerChannels: providerSummary.providers,
      connectorStrategiesActive: providerSummary.activeConnectors,
      funnelStages: funnelSummary.stages,
      funnelOptimizations: funnelSummary.totalOptimizations,
      roadmapPhases: roadmapSummary.totalPhases,
      roadmapTracks: roadmapSummary.tracks,
      experienceSignals: experienceSummary.signals,
      activeExperiments: experienceSummary.activeExperiments,
      incidentScenarios: incidentSummary.totalScenarios,
      incidentDrillsReady: incidentSummary.readyDrills,
      dependencyPolicies: dependencySummary.totalPolicies,
      restrictedDependencies: dependencySummary.restrictedPolicies,
      pipelinePhases: pipelineSummary.totalPhases,
      pipelineWatchPhases: pipelineSummary.watchPhases,
      seoChecks: seoSummary.totalChecks,
      seoWatchChecks: seoSummary.watchChecks,
      sreSlos: sreSummary.totalSlos,
      sreRunbooks: sreSummary.runbooks,
      complianceControls: complianceSummary.totalControls,
      complianceWatchControls: complianceSummary.watchControls,
      capacityModels: capacitySummary.totalModels,
      capacityRiskModels: capacitySummary.riskModels,
      researchSignals: researchSummary.totalSignals,
      researchBlockedSignals: researchSummary.blockedSignals,
      automationPipelines: automationSummary.totalPipelines,
      automationBlockedPipelines: automationSummary.blockedPipelines,
      finopsBudgets: finopsSummary.totalBudgets,
      finopsOverBudgets: finopsSummary.overBudgets,
      localizationCoverageRows: localizationSummary.totalCoverageRows,
      localizationMissingRows: localizationSummary.missingRows,
      securityRisks: securitySummary.totalRisks,
      securityCriticalRisks: securitySummary.criticalRisks,
      accessibilityChecks: accessibilitySummary.totalChecks,
      accessibilityFailChecks: accessibilitySummary.failChecks,
      experimentTracks: experimentSummary.totalTracks,
      experimentRiskTracks: experimentSummary.riskTracks,
      collaborationFlows: collaborationSummary.totalFlows,
      collaborationBlockedFlows: collaborationSummary.blockedFlows,
      performanceSignals: performanceSummary.totalSignals,
      performanceCriticalSignals: performanceSummary.criticalSignals,
      contentOpsSignals: contentOpsSummary.totalSignals,
      contentOpsCriticalSignals: contentOpsSummary.criticalSignals,
      aiGovernanceRules: aiGovernanceSummary.totalRules,
      aiGovernanceMissingRules: aiGovernanceSummary.missingRules,
      growthAnalyticsStages: growthAnalyticsSummary.totalStages,
      growthAnalyticsCriticalStages: growthAnalyticsSummary.criticalStages,
      worktreeSignals: worktreeSummary.totalSignals,
      worktreeCriticalSignals: worktreeSummary.criticalSignals,
      designSignals: designSummary.totalSignals,
      designCriticalSignals: designSummary.criticalSignals,
      observabilitySignals: observabilitySummary.totalSignals,
      observabilityCriticalSignals: observabilitySummary.criticalSignals,
      productOpsSignals: productOpsSummary.totalSignals,
      productOpsCriticalSignals: productOpsSummary.criticalSignals,
      monetizationSignals: monetizationSummary.totalSignals,
      monetizationCriticalSignals: monetizationSummary.criticalSignals,
      knowledgeSignals: knowledgeSummary.totalSignals,
      knowledgeCriticalSignals: knowledgeSummary.criticalSignals,
      mergeSignals: mergeSummary.totalSignals,
      mergeCriticalSignals: mergeSummary.criticalSignals,
      rollbackSignals: rollbackSummary.totalSignals,
      rollbackCriticalSignals: rollbackSummary.criticalSignals,
      connectorSignals: connectorSummary.totalSignals,
      connectorCriticalSignals: connectorSummary.criticalSignals,
      agentSignals: agentSummary.totalSignals,
      agentCriticalSignals: agentSummary.criticalSignals,
      deploymentSignals: deploymentSummary.totalSignals,
      deploymentCriticalSignals: deploymentSummary.criticalSignals,
      testingSignals: testingSummary.totalSignals,
      testingCriticalSignals: testingSummary.criticalSignals,
      cloudSignals: cloudSummary.totalSignals,
      cloudCriticalSignals: cloudSummary.criticalSignals,
      cloudCostSignals: cloudCostSummary.totalSignals,
      cloudCostCriticalSignals: cloudCostSummary.criticalSignals,
      handoffSignals: handoffSummary.totalSignals,
      handoffCriticalSignals: handoffSummary.criticalSignals,
      skillsSignals: skillsSummary.totalSignals,
      skillsCriticalSignals: skillsSummary.criticalSignals,
      cloudSecuritySignals: cloudSecuritySummary.totalSignals,
      cloudSecurityCriticalSignals: cloudSecuritySummary.criticalSignals,
      cloudDeployPipelineSignals: cloudDeployPipelineSummary.totalSignals,
      cloudDeployPipelineCriticalSignals: cloudDeployPipelineSummary.criticalSignals,
      cloudObservabilityPlusSignals: cloudObservabilityPlusSummary.totalSignals,
      cloudObservabilityPlusCriticalSignals: cloudObservabilityPlusSummary.criticalSignals,
      integrationsTotal: integrationEntries.length,
      integrationsConfigured
    }
  });
}
