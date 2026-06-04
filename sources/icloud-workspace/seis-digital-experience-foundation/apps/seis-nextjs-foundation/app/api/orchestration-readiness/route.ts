import { NextResponse } from "next/server";

import { getAccessibilitySummary } from "@/lib/accessibility-command";
import { getAutomationSummary } from "@/lib/automation-command";
import { getAiGovernanceSummary } from "@/lib/ai-governance-command";
import { getCollaborationSummary } from "@/lib/collaboration-command";
import { getConnectorSummary } from "@/lib/connector-command";
import { getContentOpsSummary } from "@/lib/content-ops-command";
import { getDesignSystemSummary } from "@/lib/design-system-command";
import { getExperienceLabSummary } from "@/lib/experience-lab";
import { getExperimentSummary } from "@/lib/experiment-command";
import { getFinopsSummary } from "@/lib/finops-command";
import { getGrowthAnalyticsSummary } from "@/lib/growth-analytics-command";
import { getKnowledgeSummary } from "@/lib/knowledge-command";
import { getMergeSummary } from "@/lib/merge-command";
import { getFunnelSummary } from "@/lib/funnel-strategy";
import { getMonetizationSummary } from "@/lib/monetization-command";
import { getObservabilitySummary } from "@/lib/observability-command";
import { getProviderOrchestrationSummary } from "@/lib/provider-orchestration";
import { getQualityAuditSummary } from "@/lib/quality-audits";
import { getRiskSummary } from "@/lib/risk-register";
import { getIncidentSummary } from "@/lib/incident-center";
import { getDependencySummary } from "@/lib/dependency-governance";
import { getPipelineSummary } from "@/lib/execution-pipeline";
import { getLocalizationSummary } from "@/lib/localization-command";
import { getPerformanceCommandSummary } from "@/lib/performance-command";
import { getProductOpsSummary } from "@/lib/product-ops-command";
import { getSecuritySummary } from "@/lib/security-command";
import { getSeoSummary } from "@/lib/seo-intelligence";
import { getSreSummary } from "@/lib/sre-command";
import { getComplianceSummary } from "@/lib/compliance-matrix";
import { getCapacitySummary } from "@/lib/capacity-forecast";
import { getResearchSummary } from "@/lib/research-ops";
import { getRollbackSummary } from "@/lib/rollback-command";
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

function computeScore() {
  const quality = getQualityAuditSummary();
  const provider = getProviderOrchestrationSummary();
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
  const deployment = getDeploymentSummary();
  const testing = getTestingSummary();
  const cloud = getCloudSummary();
  const cloudCost = getCloudCostSummary();
  const handoff = getHandoffSummary();
  const skills = getSkillsSummary();
  const cloudSecurity = getCloudSecuritySummary();
  const cloudDeployPipeline = getCloudDeployPipelineSummary();
  const cloudObservabilityPlus = getCloudObservabilityPlusSummary();

  const qualityScore = quality.performance.healthy * 12 + quality.accessibility.pass * 10 + quality.contentGovernance.aligned * 8;
  const providerScore = provider.readyProviders * 18 + provider.activeConnectors * 10;
  const funnelScore = funnel.totalOptimizations * 4 + funnel.stages * 6;
  const roadmapScore = roadmap.readyPhases * 15 + roadmap.inProgressPhases * 8 + roadmap.greenTracks * 5;
  const experienceScore = experience.strongSignals * 8 + experience.activeExperiments * 5 + experience.completedExperiments * 4;
  const incidentScore = incidents.readyDrills * 8 + incidents.totalScenarios * 3;
  const dependencyScore = dependencies.approvedPolicies * 6 + dependencies.requiredGuardrails * 5;
  const pipelineScore = pipeline.stablePhases * 7 + pipeline.activeCadenceItems * 6;
  const seoScore = seo.passChecks * 6 + seo.strongProfiles * 5;
  const sreScore = sre.healthySlos * 8 + sre.readyRunbooks * 6;
  const complianceScore = compliance.compliantControls * 7 + compliance.activeCheckpoints * 5;
  const capacityScore = capacity.safeModels * 6 + capacity.activeScalingSteps * 5;
  const researchScore = research.validatedSignals * 6 + research.activeBacklogItems * 4;
  const automationScore = automation.healthyPipelines * 6 + (automation.queues - automation.criticalQueues) * 4;
  const finopsScore = finops.healthyBudgets * 5 + finops.activeOptimizations * 4;
  const localizationScore = localization.completeRows * 5 + localization.activeTasks * 4;
  const securityScore = security.mitigatedRisks * 6 + security.readyDrills * 5;
  const accessibilityScore = accessibility.passChecks * 6 + accessibility.activeRemediations * 5;
  const experimentScore = experiments.runningTracks * 5 + experiments.activeLoops * 4;
  const collaborationScore = collaboration.alignedFlows * 5 + collaboration.passCheckpoints * 4;
  const performanceScore = performance.healthySignals * 6 + performance.activeTasks * 5;
  const contentOpsScore = contentOps.healthySignals * 6 + contentOps.activeTasks * 4;
  const aiGovernanceScore = aiGovernance.enforcedRules * 6 + aiGovernance.strongProviders * 5;
  const growthAnalyticsScore = growthAnalytics.healthyStages * 6 + growthAnalytics.validatedSegments * 5;
  const worktreeScore = worktree.healthySignals * 6 + worktree.activeTasks * 5;
  const designScore = design.healthySignals * 6 + design.activeTasks * 4;
  const observabilityScore = observability.healthySignals * 6 + observability.activeTasks * 5;
  const productOpsScore = productOps.healthySignals * 6 + productOps.activeTasks * 4;
  const monetizationScore = monetization.healthySignals * 6 + monetization.activeTasks * 4;
  const knowledgeScore = knowledge.healthySignals * 6 + knowledge.activeTasks * 4;
  const mergeScore = merge.healthySignals * 6 + merge.activeTasks * 4;
  const rollbackScore = rollback.healthySignals * 6 + rollback.activeTasks * 5;
  const connectorScore = connector.healthySignals * 6 + connector.activeTasks * 4;
  const agentScore = agent.healthySignals * 6 + agent.activeTasks * 4;
  const deploymentScore = deployment.healthySignals * 6 + deployment.activeTasks * 5;
  const testingScore = testing.healthySignals * 6 + testing.activeTasks * 5;
  const cloudScore = cloud.healthySignals * 6 + cloud.activeTasks * 5;
  const cloudCostScore = cloudCost.healthySignals * 6 + cloudCost.activeTasks * 5;
  const handoffScore = handoff.healthySignals * 6 + handoff.activeTasks * 5;
  const skillsScore = skills.healthySignals * 6 + skills.activeTasks * 4;
  const cloudSecurityScore = cloudSecurity.healthySignals * 6 + cloudSecurity.activeTasks * 5;
  const cloudDeployPipelineScore = cloudDeployPipeline.healthySignals * 6 + cloudDeployPipeline.activeTasks * 5;
  const cloudObservabilityPlusScore = cloudObservabilityPlus.healthySignals * 6 + cloudObservabilityPlus.activeTasks * 5;
  const riskPenalty =
    risks.byLevel.critical * 14 +
    risks.byLevel.high * 6 +
    dependencies.restrictedPolicies * 3 +
    capacity.riskModels * 4 +
    automation.blockedPipelines * 5 +
    finops.overBudgets * 4 +
    localization.missingRows * 3 +
    security.criticalRisks * 5 +
    accessibility.failChecks * 4 +
    experiments.riskTracks * 4 +
    collaboration.blockedFlows * 4 +
    performance.criticalSignals * 5 +
    contentOps.criticalSignals * 4 +
    aiGovernance.missingRules * 5 +
    growthAnalytics.criticalStages * 4 +
    worktree.criticalSignals * 5 +
    design.criticalSignals * 4 +
    observability.criticalSignals * 5 +
    productOps.criticalSignals * 4 +
    monetization.criticalSignals * 5 +
    knowledge.criticalSignals * 4 +
    merge.criticalSignals * 4 +
    rollback.criticalSignals * 5 +
    connector.criticalSignals * 4 +
    agent.criticalSignals * 5 +
    deployment.criticalSignals * 5 +
    testing.criticalSignals * 5 +
    cloud.criticalSignals * 5 +
    cloudCost.criticalSignals * 5 +
    handoff.criticalSignals * 5 +
    skills.criticalSignals * 4 +
    cloudSecurity.criticalSignals * 5 +
    cloudDeployPipeline.criticalSignals * 5 +
    cloudObservabilityPlus.criticalSignals * 5;

  const raw =
    qualityScore +
    providerScore +
    funnelScore +
    roadmapScore +
    experienceScore +
    incidentScore +
    dependencyScore +
    pipelineScore +
    seoScore +
    sreScore +
    complianceScore +
    capacityScore +
    researchScore +
    automationScore +
    finopsScore +
    localizationScore +
    securityScore +
    accessibilityScore +
    experimentScore +
    collaborationScore +
    performanceScore +
    contentOpsScore +
    aiGovernanceScore +
    growthAnalyticsScore +
    worktreeScore +
    designScore +
    observabilityScore +
    productOpsScore +
    monetizationScore +
    knowledgeScore +
    mergeScore +
    rollbackScore +
    connectorScore +
    agentScore +
    deploymentScore +
    testingScore +
    cloudScore +
    cloudCostScore +
    handoffScore +
    skillsScore +
    cloudSecurityScore +
    cloudDeployPipelineScore +
    cloudObservabilityPlusScore -
    riskPenalty;
  const normalized = Math.max(0, Math.min(100, Math.round(raw / 10.5)));
  return normalized;
}

export async function GET() {
  const score = computeScore();

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    score,
    status: score >= 80 ? "strong" : score >= 60 ? "watch" : "critical",
    modules: {
      quality: getQualityAuditSummary(),
      providers: getProviderOrchestrationSummary(),
      funnel: getFunnelSummary(),
      roadmap: getRoadmapSummary(),
      experience: getExperienceLabSummary(),
      risks: getRiskSummary(),
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
