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
import { locales, getCaseStudies } from "@/lib/content";
import { getWorkItems, getServiceItems } from "@/lib/creative-content";
import { getExperimentSummary } from "@/lib/experiment-command";
import { getFeatureFlagSummary } from "@/lib/feature-flags";
import { getFinopsSummary } from "@/lib/finops-command";
import { getGrowthAnalyticsSummary } from "@/lib/growth-analytics-command";
import { getKnowledgeSummary } from "@/lib/knowledge-command";
import { getMergeSummary } from "@/lib/merge-command";
import { getExperienceLabSummary } from "@/lib/experience-lab";
import { getFunnelSummary } from "@/lib/funnel-strategy";
import { getGovernanceSummary } from "@/lib/governance-content";
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

type ScoreBand = "critical" | "needs-attention" | "healthy";

function normalize(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((value / max) * 100)));
}

function scoreBand(value: number): ScoreBand {
  if (value < 50) return "critical";
  if (value < 75) return "needs-attention";
  return "healthy";
}

export async function GET() {
  const worksCount = getWorkItems("en").length;
  const caseCount = getCaseStudies("en").length;
  const insightCount = getInsights("en").length;
  const serviceCount = getServiceItems().length;
  const governanceSummary = getGovernanceSummary();
  const aiStats = getAiWorkflowStats();
  const capabilitySummary = getBenchCapabilitySummary();
  const flagSummary = getFeatureFlagSummary();
  const riskSummary = getRiskSummary();
  const checklistSummary = getLaunchChecklistSummary();
  const releaseScenarioSummary = getReleaseScenarioSummary();
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

  const integrationConfigured = integrationEntries.filter((item) => resolveIntegrationStatus(item) === "configured").length;
  const integrationScore = normalize(integrationConfigured, integrationEntries.length);

  const contentScore = normalize(worksCount + caseCount + insightCount + serviceCount, 16);
  const i18nScore = normalize(locales.length, 5);
  const governanceScore = normalize(governanceSummary.highSeverity + governanceSummary.mediumSeverity, 12);
  const aiScore = normalize(aiStats.total + aiStats.providerCounts.hybrid, 8);
  const capabilityScore = normalize(capabilitySummary.areas, 30);
  const featureFlagScore = normalize(flagSummary.byStatus.enabled + flagSummary.byStatus.beta, 8);
  const riskScore = normalize(riskSummary.total, 8);
  const checklistScore = normalize(checklistSummary.done + checklistSummary.inProgress, checklistSummary.total || 1);
  const scenarioScore = normalize(releaseScenarioSummary.total, 4);
  const providerScore = normalize(providerSummary.readyProviders + providerSummary.activeConnectors, providerSummary.providers + providerSummary.connectorStrategies);
  const funnelScore = normalize(funnelSummary.stages + funnelSummary.totalOptimizations, 20);
  const roadmapScore = normalize(roadmapSummary.readyPhases + roadmapSummary.inProgressPhases + roadmapSummary.greenTracks, 12);
  const experienceScore = normalize(experienceSummary.strongSignals + experienceSummary.activeExperiments + experienceSummary.completedExperiments, 15);
  const incidentScore = normalize(incidentSummary.totalScenarios + incidentSummary.readyDrills, 10);
  const dependencyScore = normalize(dependencySummary.approvedPolicies + dependencySummary.requiredGuardrails, 10);
  const pipelineScore = normalize(pipelineSummary.stablePhases + pipelineSummary.activeCadenceItems, 10);
  const seoScore = normalize(seoSummary.passChecks + seoSummary.strongProfiles, 10);
  const sreScore = normalize(
    sreSummary.healthySlos + sreSummary.readyRunbooks,
    sreSummary.totalSlos + sreSummary.runbooks || 1
  );
  const complianceScore = normalize(
    complianceSummary.compliantControls + complianceSummary.activeCheckpoints,
    complianceSummary.totalControls + complianceSummary.checkpoints || 1
  );
  const capacityScore = normalize(
    capacitySummary.safeModels + capacitySummary.activeScalingSteps,
    capacitySummary.totalModels + capacitySummary.scalingSteps || 1
  );
  const researchScore = normalize(
    researchSummary.validatedSignals + researchSummary.activeBacklogItems,
    researchSummary.totalSignals + researchSummary.backlogItems || 1
  );
  const automationScore = normalize(
    automationSummary.healthyPipelines + (automationSummary.queues - automationSummary.criticalQueues),
    automationSummary.totalPipelines + automationSummary.queues || 1
  );
  const finopsScore = normalize(
    finopsSummary.healthyBudgets + finopsSummary.activeOptimizations,
    finopsSummary.totalBudgets + finopsSummary.optimizations || 1
  );
  const localizationScore = normalize(
    localizationSummary.completeRows + localizationSummary.activeTasks,
    localizationSummary.totalCoverageRows + localizationSummary.tasks || 1
  );
  const securityScore = normalize(
    securitySummary.mitigatedRisks + securitySummary.readyDrills,
    securitySummary.totalRisks + securitySummary.drills || 1
  );
  const accessibilityScore = normalize(
    accessibilitySummary.passChecks + accessibilitySummary.activeRemediations,
    accessibilitySummary.totalChecks + accessibilitySummary.remediations || 1
  );
  const experimentScore = normalize(
    experimentSummary.runningTracks + experimentSummary.activeLoops,
    experimentSummary.totalTracks + experimentSummary.growthLoops || 1
  );
  const collaborationScore = normalize(
    collaborationSummary.alignedFlows + collaborationSummary.passCheckpoints,
    collaborationSummary.totalFlows + collaborationSummary.checkpoints || 1
  );
  const performanceScore = normalize(
    performanceSummary.healthySignals + performanceSummary.activeTasks,
    performanceSummary.totalSignals + performanceSummary.tasks || 1
  );
  const contentOpsScore = normalize(
    contentOpsSummary.healthySignals + contentOpsSummary.activeTasks,
    contentOpsSummary.totalSignals + contentOpsSummary.tasks || 1
  );
  const aiGovernanceScore = normalize(
    aiGovernanceSummary.enforcedRules + aiGovernanceSummary.strongProviders,
    aiGovernanceSummary.totalRules + aiGovernanceSummary.providers || 1
  );
  const growthAnalyticsScore = normalize(
    growthAnalyticsSummary.healthyStages + growthAnalyticsSummary.validatedSegments,
    growthAnalyticsSummary.totalStages + growthAnalyticsSummary.segments || 1
  );
  const worktreeScore = normalize(
    worktreeSummary.healthySignals + worktreeSummary.activeTasks,
    worktreeSummary.totalSignals + worktreeSummary.tasks || 1
  );
  const designScore = normalize(
    designSummary.healthySignals + designSummary.activeTasks,
    designSummary.totalSignals + designSummary.tasks || 1
  );
  const observabilityScore = normalize(
    observabilitySummary.healthySignals + observabilitySummary.activeTasks,
    observabilitySummary.totalSignals + observabilitySummary.tasks || 1
  );
  const productOpsScore = normalize(
    productOpsSummary.healthySignals + productOpsSummary.activeTasks,
    productOpsSummary.totalSignals + productOpsSummary.tasks || 1
  );
  const monetizationScore = normalize(
    monetizationSummary.healthySignals + monetizationSummary.activeTasks,
    monetizationSummary.totalSignals + monetizationSummary.tasks || 1
  );
  const knowledgeScore = normalize(
    knowledgeSummary.healthySignals + knowledgeSummary.activeTasks,
    knowledgeSummary.totalSignals + knowledgeSummary.tasks || 1
  );
  const mergeScore = normalize(
    mergeSummary.healthySignals + mergeSummary.activeTasks,
    mergeSummary.totalSignals + mergeSummary.tasks || 1
  );
  const rollbackScore = normalize(
    rollbackSummary.healthySignals + rollbackSummary.activeTasks,
    rollbackSummary.totalSignals + rollbackSummary.tasks || 1
  );
  const connectorScore = normalize(
    connectorSummary.healthySignals + connectorSummary.activeTasks,
    connectorSummary.totalSignals + connectorSummary.tasks || 1
  );
  const agentScore = normalize(
    agentSummary.healthySignals + agentSummary.activeTasks,
    agentSummary.totalSignals + agentSummary.tasks || 1
  );
  const deploymentScore = normalize(
    deploymentSummary.healthySignals + deploymentSummary.activeTasks,
    deploymentSummary.totalSignals + deploymentSummary.tasks || 1
  );
  const testingScore = normalize(
    testingSummary.healthySignals + testingSummary.activeTasks,
    testingSummary.totalSignals + testingSummary.tasks || 1
  );
  const cloudScore = normalize(
    cloudSummary.healthySignals + cloudSummary.activeTasks,
    cloudSummary.totalSignals + cloudSummary.tasks || 1
  );
  const cloudCostScore = normalize(
    cloudCostSummary.healthySignals + cloudCostSummary.activeTasks,
    cloudCostSummary.totalSignals + cloudCostSummary.tasks || 1
  );
  const handoffScore = normalize(
    handoffSummary.healthySignals + handoffSummary.activeTasks,
    handoffSummary.totalSignals + handoffSummary.tasks || 1
  );
  const skillsScore = normalize(
    skillsSummary.healthySignals + skillsSummary.activeTasks,
    skillsSummary.totalSignals + skillsSummary.tasks || 1
  );
  const cloudSecurityScore = normalize(
    cloudSecuritySummary.healthySignals + cloudSecuritySummary.activeTasks,
    cloudSecuritySummary.totalSignals + cloudSecuritySummary.tasks || 1
  );
  const cloudDeployPipelineScore = normalize(
    cloudDeployPipelineSummary.healthySignals + cloudDeployPipelineSummary.activeTasks,
    cloudDeployPipelineSummary.totalSignals + cloudDeployPipelineSummary.tasks || 1
  );
  const cloudObservabilityPlusScore = normalize(
    cloudObservabilityPlusSummary.healthySignals + cloudObservabilityPlusSummary.activeTasks,
    cloudObservabilityPlusSummary.totalSignals + cloudObservabilityPlusSummary.tasks || 1
  );

  const aggregateRaw =
    (contentScore * 0.12 +
      i18nScore * 0.06 +
      integrationScore * 0.09 +
      governanceScore * 0.06 +
      aiScore * 0.06 +
      capabilityScore * 0.04 +
      featureFlagScore * 0.06 +
      riskScore * 0.05 +
      checklistScore * 0.03 +
      scenarioScore * 0.02 +
      providerScore * 0.03 +
      funnelScore * 0.03 +
      roadmapScore * 0.03 +
      experienceScore * 0.03 +
      incidentScore * 0.03 +
      dependencyScore * 0.03 +
      pipelineScore * 0.03 +
      seoScore * 0.02 +
      sreScore * 0.013 +
      complianceScore * 0.013 +
      capacityScore * 0.013 +
      researchScore * 0.013 +
      automationScore * 0.009 +
      finopsScore * 0.009 +
      localizationScore * 0.009 +
      securityScore * 0.007 +
      accessibilityScore * 0.007 +
      experimentScore * 0.007 +
      collaborationScore * 0.007 +
      performanceScore * 0.007 +
      contentOpsScore * 0.007 +
      aiGovernanceScore * 0.007 +
      growthAnalyticsScore * 0.007 +
      worktreeScore * 0.006 +
      designScore * 0.006 +
      observabilityScore * 0.006 +
      productOpsScore * 0.006 +
      monetizationScore * 0.006 +
      knowledgeScore * 0.006 +
      mergeScore * 0.005 +
      rollbackScore * 0.005 +
      connectorScore * 0.005 +
      agentScore * 0.005 +
      deploymentScore * 0.005 +
      testingScore * 0.005 +
      cloudScore * 0.005 +
      cloudCostScore * 0.005 +
      handoffScore * 0.005 +
      skillsScore * 0.005 +
      cloudSecurityScore * 0.005 +
      cloudDeployPipelineScore * 0.005 +
      cloudObservabilityPlusScore * 0.005);
  const aggregate = Math.round(Math.min(100, Math.max(0, aggregateRaw)));

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    aggregate,
    band: scoreBand(aggregate),
    cards: [
      { id: "content", label: "Content Depth", score: contentScore, band: scoreBand(contentScore) },
      { id: "i18n", label: "I18n Coverage", score: i18nScore, band: scoreBand(i18nScore) },
      { id: "integration", label: "Integration Coverage", score: integrationScore, band: scoreBand(integrationScore) },
      { id: "governance", label: "Governance Hardening", score: governanceScore, band: scoreBand(governanceScore) },
      { id: "ai", label: "AI Workflow Maturity", score: aiScore, band: scoreBand(aiScore) },
      { id: "capabilities", label: "Capability Breadth", score: capabilityScore, band: scoreBand(capabilityScore) },
      { id: "flags", label: "Feature Rollout Readiness", score: featureFlagScore, band: scoreBand(featureFlagScore) },
      { id: "risks", label: "Risk Register Depth", score: riskScore, band: scoreBand(riskScore) },
      { id: "checklist", label: "Launch Checklist Progress", score: checklistScore, band: scoreBand(checklistScore) },
      { id: "scenarios", label: "Release Scenario Coverage", score: scenarioScore, band: scoreBand(scenarioScore) },
      { id: "providers", label: "Provider Orchestration", score: providerScore, band: scoreBand(providerScore) },
      { id: "funnel", label: "Funnel Intelligence", score: funnelScore, band: scoreBand(funnelScore) },
      { id: "roadmap", label: "Roadmap Coverage", score: roadmapScore, band: scoreBand(roadmapScore) },
      { id: "experience", label: "Experience Lab Maturity", score: experienceScore, band: scoreBand(experienceScore) },
      { id: "incident", label: "Incident Readiness", score: incidentScore, band: scoreBand(incidentScore) },
      { id: "dependency", label: "Dependency Governance", score: dependencyScore, band: scoreBand(dependencyScore) },
      { id: "pipeline", label: "Execution Pipeline", score: pipelineScore, band: scoreBand(pipelineScore) },
      { id: "seo", label: "SEO Intelligence", score: seoScore, band: scoreBand(seoScore) },
      { id: "sre", label: "SRE Maturity", score: sreScore, band: scoreBand(sreScore) },
      { id: "compliance", label: "Compliance Maturity", score: complianceScore, band: scoreBand(complianceScore) },
      { id: "capacity", label: "Capacity Readiness", score: capacityScore, band: scoreBand(capacityScore) },
      { id: "research", label: "Research Ops Maturity", score: researchScore, band: scoreBand(researchScore) },
      { id: "automation", label: "Automation Maturity", score: automationScore, band: scoreBand(automationScore) },
      { id: "finops", label: "FinOps Maturity", score: finopsScore, band: scoreBand(finopsScore) },
      { id: "localization", label: "Localization Maturity", score: localizationScore, band: scoreBand(localizationScore) },
      { id: "security", label: "Security Maturity", score: securityScore, band: scoreBand(securityScore) },
      { id: "accessibility", label: "Accessibility Maturity", score: accessibilityScore, band: scoreBand(accessibilityScore) },
      { id: "experiment", label: "Experimentation Maturity", score: experimentScore, band: scoreBand(experimentScore) },
      { id: "collaboration", label: "Collaboration Maturity", score: collaborationScore, band: scoreBand(collaborationScore) },
      { id: "performance", label: "Performance Command Maturity", score: performanceScore, band: scoreBand(performanceScore) },
      { id: "contentops", label: "Content Ops Maturity", score: contentOpsScore, band: scoreBand(contentOpsScore) },
      { id: "aigovernance", label: "AI Governance Maturity", score: aiGovernanceScore, band: scoreBand(aiGovernanceScore) },
      { id: "growthanalytics", label: "Growth Analytics Maturity", score: growthAnalyticsScore, band: scoreBand(growthAnalyticsScore) },
      { id: "worktree", label: "Worktree Governance Maturity", score: worktreeScore, band: scoreBand(worktreeScore) },
      { id: "design", label: "Design System Maturity", score: designScore, band: scoreBand(designScore) },
      { id: "observability", label: "Observability Maturity", score: observabilityScore, band: scoreBand(observabilityScore) },
      { id: "productops", label: "Product Ops Maturity", score: productOpsScore, band: scoreBand(productOpsScore) },
      { id: "monetization", label: "Monetization Maturity", score: monetizationScore, band: scoreBand(monetizationScore) },
      { id: "knowledge", label: "Knowledge Ops Maturity", score: knowledgeScore, band: scoreBand(knowledgeScore) },
      { id: "merge", label: "Merge Governance Maturity", score: mergeScore, band: scoreBand(mergeScore) },
      { id: "rollback", label: "Rollback Readiness Maturity", score: rollbackScore, band: scoreBand(rollbackScore) },
      { id: "connector", label: "Connector Governance Maturity", score: connectorScore, band: scoreBand(connectorScore) },
      { id: "agent", label: "Agent Orchestration Maturity", score: agentScore, band: scoreBand(agentScore) },
      { id: "deployment", label: "Deployment Safety Maturity", score: deploymentScore, band: scoreBand(deploymentScore) },
      { id: "testing", label: "Testing Maturity", score: testingScore, band: scoreBand(testingScore) },
      { id: "cloud", label: "Cloud Runtime Maturity", score: cloudScore, band: scoreBand(cloudScore) },
      { id: "cloudcost", label: "Cloud Cost Maturity", score: cloudCostScore, band: scoreBand(cloudCostScore) },
      { id: "handoff", label: "Handoff Governance Maturity", score: handoffScore, band: scoreBand(handoffScore) },
      { id: "skills", label: "Skills Governance Maturity", score: skillsScore, band: scoreBand(skillsScore) },
      { id: "cloudsecurity", label: "Cloud Security Maturity", score: cloudSecurityScore, band: scoreBand(cloudSecurityScore) },
      { id: "clouddeploy", label: "Cloud Deploy Pipeline Maturity", score: cloudDeployPipelineScore, band: scoreBand(cloudDeployPipelineScore) },
      { id: "cloudobservabilityplus", label: "Cloud Observability Plus Maturity", score: cloudObservabilityPlusScore, band: scoreBand(cloudObservabilityPlusScore) }
    ]
  });
}
