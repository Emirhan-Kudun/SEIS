import {
  getCaseStudies,
  homeDictionaries,
  locales,
  Locale,
  portfolioCards,
  pricingTiers,
  resolveLocale,
  systemPillars,
  testimonials
} from "@/lib/content";
import { getAccessibilityChecks, getAccessibilityRemediations } from "@/lib/accessibility-command";
import { getAiWorkflowPacks } from "@/lib/ai-workflows";
import { getAiGovernanceRules, getAiProviderHealth } from "@/lib/ai-governance-command";
import { getAutomationPipelines, getAutomationQueues } from "@/lib/automation-command";
import { getBenchCapabilityGroups } from "@/lib/bench-capabilities";
import { getBranchCheckpoints, getCollaborationFlows } from "@/lib/collaboration-command";
import { getConnectorSignals, getConnectorTasks } from "@/lib/connector-command";
import { getContentOpsSignals, getContentOpsTasks } from "@/lib/content-ops-command";
import { getDesignSignals, getDesignTasks } from "@/lib/design-system-command";
import {
  getCreativeExperiments,
  getExperienceItems,
  getMotionShowcaseItems,
  getServiceItems,
  getSocialItems,
  getToolGroups,
  getVisualResearchItems,
  getWorkItems
} from "@/lib/creative-content";
import { automationPlaybooks } from "@/lib/automation-content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getExperimentTracks, getGrowthLoops } from "@/lib/experiment-command";
import { getFeatureFlags } from "@/lib/feature-flags";
import { getCostOptimizations, getFinopsBudgets } from "@/lib/finops-command";
import { getExperienceSignals, getExperimentBacklog, getJourneyFrictions } from "@/lib/experience-lab";
import { getFunnelStages } from "@/lib/funnel-strategy";
import { getGovernanceRules } from "@/lib/governance-content";
import { getIncidentDrills, getIncidentScenarios } from "@/lib/incident-center";
import { getInsights } from "@/lib/insights-content";
import { getKnowledgeSignals, getKnowledgeTasks } from "@/lib/knowledge-command";
import { getLaunchChecklist } from "@/lib/launch-checklist";
import { getLocaleCoverage, getLocalizationTasks } from "@/lib/localization-command";
import { getMonetizationSignals, getMonetizationTasks } from "@/lib/monetization-command";
import { getObservabilitySignals, getObservabilityTasks } from "@/lib/observability-command";
import { getPerformanceSignals, getPerformanceTasks } from "@/lib/performance-command";
import { getProductOpsSignals, getProductOpsTasks } from "@/lib/product-ops-command";
import { getMergeSignals, getMergeTasks } from "@/lib/merge-command";
import { getProviderChannels } from "@/lib/provider-orchestration";
import { getPerformanceBudgets } from "@/lib/quality-audits";
import { getReleaseScenarios } from "@/lib/release-scenarios";
import { getRiskRegister } from "@/lib/risk-register";
import { getCapacityModels, getScalingSteps } from "@/lib/capacity-forecast";
import { getAuditCheckpoints, getComplianceControls } from "@/lib/compliance-matrix";
import { getDependencyGuardrails, getDependencyPolicies } from "@/lib/dependency-governance";
import { getDeliveryCadence, getPipelinePhases } from "@/lib/execution-pipeline";
import { getResearchBacklog, getResearchSignals } from "@/lib/research-ops";
import { getRollbackSignals, getRollbackTasks } from "@/lib/rollback-command";
import { getSecurityDrills, getSecurityRisks } from "@/lib/security-command";
import { getMetadataProfiles, getSeoChecks } from "@/lib/seo-intelligence";
import { getErrorBudgets, getSloMetrics, getSreRunbooks } from "@/lib/sre-command";
import { getExecutionTracks, getSystemRoadmapPhases } from "@/lib/system-roadmap";
import { getWorktreeSignals, getWorktreeTasks } from "@/lib/worktree-command";
import { getAgentSignals, getAgentTasks } from "@/lib/agent-command";
import { getDeploymentSignals, getDeploymentTasks } from "@/lib/deployment-command";
import { getFunnelHealth, getSegmentInsights } from "@/lib/growth-analytics-command";
import { getTestingSignals, getTestingTasks } from "@/lib/testing-command";
import { getCloudSignals, getCloudTasks } from "@/lib/cloud-command";
import { getCloudCostSignals, getCloudCostTasks } from "@/lib/cloud-cost-command";
import { getHandoffSignals, getHandoffTasks } from "@/lib/handoff-command";
import { getSkillsSignals, getSkillsTasks } from "@/lib/skills-command";
import { getCloudSecuritySignals, getCloudSecurityTasks } from "@/lib/cloud-security-command";
import { getCloudDeployPipelineSignals, getCloudDeployPipelineTasks } from "@/lib/cloud-deploy-pipeline-command";
import {
  getCloudObservabilityPlusSignals,
  getCloudObservabilityPlusTasks
} from "@/lib/cloud-observability-plus-command";
import { getUiDictionary } from "@/lib/site-i18n";

export type ContentSnapshot = {
  locale: Locale;
  locales: string[];
  home: ReturnType<typeof getHomeSectionSnapshot>;
  creative: ReturnType<typeof getCreativeSectionSnapshot>;
  systems: ReturnType<typeof getSystemSectionSnapshot>;
  meta: {
    generatedAt: string;
    version: string;
  };
};

function getHomeSectionSnapshot(locale: Locale) {
  return {
    dictionary: homeDictionaries[locale],
    portfolioCards,
    caseStudies: getCaseStudies(locale),
    pricingTiers
  };
}

function getCreativeSectionSnapshot(locale: Locale) {
  return {
    dictionary: getCreativeDictionary(locale),
    works: getWorkItems(locale),
    motionShowcase: getMotionShowcaseItems(),
    insights: getInsights(locale),
    visualResearch: getVisualResearchItems(),
    experiments: getCreativeExperiments(),
    experience: getExperienceItems(),
    services: getServiceItems(),
    tools: getToolGroups(),
    social: getSocialItems(),
    automationPlaybooks,
    aiWorkflowPacks: getAiWorkflowPacks()
  };
}

function getSystemSectionSnapshot(locale: Locale) {
  return {
    uiDictionary: getUiDictionary(locale),
    systemPillars,
    testimonials,
    governanceRules: getGovernanceRules(),
    featureFlags: getFeatureFlags(),
    capabilityGroups: getBenchCapabilityGroups(),
    risks: getRiskRegister(),
    releaseScenarios: getReleaseScenarios(),
    launchChecklist: getLaunchChecklist(),
    providerChannels: getProviderChannels(),
    funnelStages: getFunnelStages(),
    qualityBudgets: getPerformanceBudgets(),
    roadmapPhases: getSystemRoadmapPhases(),
    executionTracks: getExecutionTracks(),
    experienceSignals: getExperienceSignals(),
    experienceFrictions: getJourneyFrictions(),
    experienceExperiments: getExperimentBacklog(),
    incidentScenarios: getIncidentScenarios(),
    incidentDrills: getIncidentDrills(),
    dependencyPolicies: getDependencyPolicies(),
    dependencyGuardrails: getDependencyGuardrails(),
    pipelinePhases: getPipelinePhases(),
    deliveryCadence: getDeliveryCadence(),
    seoChecks: getSeoChecks(),
    metadataProfiles: getMetadataProfiles(),
    sreSlos: getSloMetrics(),
    sreErrorBudgets: getErrorBudgets(),
    sreRunbooks: getSreRunbooks(),
    complianceControls: getComplianceControls(),
    complianceCheckpoints: getAuditCheckpoints(),
    capacityModels: getCapacityModels(),
    capacityScalingSteps: getScalingSteps(),
    researchSignals: getResearchSignals(),
    researchBacklog: getResearchBacklog(),
    automationPipelines: getAutomationPipelines(),
    automationQueues: getAutomationQueues(),
    finopsBudgets: getFinopsBudgets(),
    finopsOptimizations: getCostOptimizations(),
    localizationCoverage: getLocaleCoverage(),
    localizationTasks: getLocalizationTasks(),
    securityRisks: getSecurityRisks(),
    securityDrills: getSecurityDrills(),
    accessibilityChecks: getAccessibilityChecks(),
    accessibilityRemediations: getAccessibilityRemediations(),
    experimentTracks: getExperimentTracks(),
    growthLoops: getGrowthLoops(),
    collaborationFlows: getCollaborationFlows(),
    branchCheckpoints: getBranchCheckpoints(),
    performanceSignals: getPerformanceSignals(),
    performanceTasks: getPerformanceTasks(),
    contentOpsSignals: getContentOpsSignals(),
    contentOpsTasks: getContentOpsTasks(),
    aiGovernanceRules: getAiGovernanceRules(),
    aiProviderHealth: getAiProviderHealth(),
    growthAnalyticsFunnel: getFunnelHealth(),
    growthAnalyticsSegments: getSegmentInsights(),
    worktreeSignals: getWorktreeSignals(),
    worktreeTasks: getWorktreeTasks(),
    designSignals: getDesignSignals(),
    designTasks: getDesignTasks(),
    observabilitySignals: getObservabilitySignals(),
    observabilityTasks: getObservabilityTasks(),
    productOpsSignals: getProductOpsSignals(),
    productOpsTasks: getProductOpsTasks(),
    monetizationSignals: getMonetizationSignals(),
    monetizationTasks: getMonetizationTasks(),
    knowledgeSignals: getKnowledgeSignals(),
    knowledgeTasks: getKnowledgeTasks(),
    mergeSignals: getMergeSignals(),
    mergeTasks: getMergeTasks(),
    rollbackSignals: getRollbackSignals(),
    rollbackTasks: getRollbackTasks(),
    connectorSignals: getConnectorSignals(),
    connectorTasks: getConnectorTasks(),
    agentSignals: getAgentSignals(),
    agentTasks: getAgentTasks(),
    deploymentSignals: getDeploymentSignals(),
    deploymentTasks: getDeploymentTasks(),
    testingSignals: getTestingSignals(),
    testingTasks: getTestingTasks(),
    cloudSignals: getCloudSignals(),
    cloudTasks: getCloudTasks(),
    cloudCostSignals: getCloudCostSignals(),
    cloudCostTasks: getCloudCostTasks(),
    handoffSignals: getHandoffSignals(),
    handoffTasks: getHandoffTasks(),
    skillsSignals: getSkillsSignals(),
    skillsTasks: getSkillsTasks(),
    cloudSecuritySignals: getCloudSecuritySignals(),
    cloudSecurityTasks: getCloudSecurityTasks(),
    cloudDeployPipelineSignals: getCloudDeployPipelineSignals(),
    cloudDeployPipelineTasks: getCloudDeployPipelineTasks(),
    cloudObservabilityPlusSignals: getCloudObservabilityPlusSignals(),
    cloudObservabilityPlusTasks: getCloudObservabilityPlusTasks()
  };
}

export function getContentSnapshot(language: string | undefined): ContentSnapshot {
  const locale = resolveLocale(language);

  return {
    locale,
    locales: [...locales],
    home: getHomeSectionSnapshot(locale),
    creative: getCreativeSectionSnapshot(locale),
    systems: getSystemSectionSnapshot(locale),
    meta: {
      generatedAt: new Date().toISOString(),
      version: "seis-content-snapshot-v15"
    }
  };
}
