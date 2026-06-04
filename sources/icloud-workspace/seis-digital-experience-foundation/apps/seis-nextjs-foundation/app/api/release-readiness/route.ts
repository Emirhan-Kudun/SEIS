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
import { getDesignSystemSummary } from "@/lib/design-system-command";
import { locales, getCaseStudies } from "@/lib/content";
import { getWorkItems, getServiceItems } from "@/lib/creative-content";
import { getExperimentSummary } from "@/lib/experiment-command";
import { getFeatureFlags } from "@/lib/feature-flags";
import { getFinopsSummary } from "@/lib/finops-command";
import { getGrowthAnalyticsSummary } from "@/lib/growth-analytics-command";
import { getKnowledgeSummary } from "@/lib/knowledge-command";
import { getMergeSummary } from "@/lib/merge-command";
import { getExperienceLabSummary } from "@/lib/experience-lab";
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
import { DEFAULT_CONTACT_EMAIL, DEFAULT_SITE_URL, siteConfig } from "@/lib/site-config";

type GateStatus = "pass" | "warn" | "fail";

type ReadinessGate = {
  id: string;
  label: string;
  status: GateStatus;
  detail: string;
  weight: number;
};

function createGate(id: string, label: string, status: GateStatus, detail: string, weight: number): ReadinessGate {
  return { id, label, status, detail, weight };
}

function computeScore(gates: ReadinessGate[]): number {
  const totalWeight = gates.reduce((sum, gate) => sum + gate.weight, 0);
  if (!totalWeight) return 0;

  const earned = gates.reduce((sum, gate) => {
    if (gate.status === "pass") return sum + gate.weight;
    if (gate.status === "warn") return sum + gate.weight * 0.5;
    return sum;
  }, 0);

  return Math.round((earned / totalWeight) * 100);
}

export async function GET() {
  const configuredIntegrations = integrationEntries.filter((entry) => resolveIntegrationStatus(entry) === "configured").length;
  const worksCount = getWorkItems("en").length;
  const caseCount = getCaseStudies("en").length;
  const insightCount = getInsights("en").length;
  const serviceCount = getServiceItems().length;
  const automationCount = automationPlaybooks.length;
  const aiWorkflowCount = getAiWorkflowPacks().length;
  const governanceCount = getGovernanceRules().length;
  const featureFlagCount = getFeatureFlags().length;
  const capabilityCount = getBenchCapabilityGroups().length;
  const riskCount = getRiskSummary().total;
  const releaseScenarioCount = getReleaseScenarioSummary().total;
  const checklistTotal = getLaunchChecklistSummary().total;
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

  const localeCoverage = locales.length >= 5 ? "pass" : "warn";
  const contentCoverage = worksCount >= 4 && caseCount >= 3 ? "pass" : "warn";
  const insightCoverage = insightCount >= 3 ? "pass" : "warn";
  const serviceCoverage = serviceCount >= 3 ? "pass" : "warn";
  const playbookCoverage = automationCount >= 3 ? "pass" : "warn";
  const aiWorkflowCoverage = aiWorkflowCount >= 4 ? "pass" : "warn";
  const governanceCoverage = governanceCount >= 8 ? "pass" : "warn";
  const featureFlagCoverage = featureFlagCount >= 6 ? "pass" : "warn";
  const capabilityCoverage = capabilityCount >= 5 ? "pass" : "warn";
  const riskCoverage = riskCount >= 5 ? "pass" : "warn";
  const scenarioCoverage = releaseScenarioCount >= 3 ? "pass" : "warn";
  const checklistCoverage = checklistTotal >= 10 ? "pass" : "warn";
  const providerCoverage = providerSummary.readyProviders >= 2 ? "pass" : "warn";
  const funnelCoverage = funnelSummary.stages >= 4 && funnelSummary.totalOptimizations >= 10 ? "pass" : "warn";
  const roadmapCoverage = roadmapSummary.totalPhases >= 4 && roadmapSummary.tracks >= 5 ? "pass" : "warn";
  const experienceCoverage = experienceSummary.signals >= 6 && experienceSummary.experiments >= 5 ? "pass" : "warn";
  const incidentCoverage = incidentSummary.criticalScenarios >= 2 && incidentSummary.readyDrills >= 2 ? "pass" : "warn";
  const dependencyCoverage = dependencySummary.requiredGuardrails >= 3 && dependencySummary.restrictedPolicies >= 1 ? "pass" : "warn";
  const pipelineCoverage = pipelineSummary.totalPhases >= 5 && pipelineSummary.activeCadenceItems >= 2 ? "pass" : "warn";
  const seoCoverage = seoSummary.passChecks >= 3 ? "pass" : "warn";
  const sreCoverage = sreSummary.healthySlos >= 3 && sreSummary.readyRunbooks >= 3 ? "pass" : "warn";
  const complianceCoverage = complianceSummary.compliantControls >= 3 && complianceSummary.activeCheckpoints >= 1 ? "pass" : "warn";
  const capacityCoverage = capacitySummary.riskModels <= 1 && capacitySummary.activeScalingSteps >= 1 ? "pass" : "warn";
  const researchCoverage = researchSummary.validatedSignals >= 2 && researchSummary.activeBacklogItems >= 1 ? "pass" : "warn";
  const automationCoverage = automationSummary.totalPipelines >= 4 && automationSummary.blockedPipelines <= 1 ? "pass" : "warn";
  const finopsCoverage = finopsSummary.overBudgets <= 1 && finopsSummary.activeOptimizations >= 1 ? "pass" : "warn";
  const localizationCoverage =
    localizationSummary.missingRows <= 1 && localizationSummary.activeTasks >= 1 ? "pass" : "warn";
  const securityCoverage =
    securitySummary.criticalRisks <= 1 && securitySummary.readyDrills >= 1 ? "pass" : "warn";
  const accessibilityCoverage =
    accessibilitySummary.failChecks <= 1 && accessibilitySummary.activeRemediations >= 1 ? "pass" : "warn";
  const experimentCoverage =
    experimentSummary.runningTracks >= 1 && experimentSummary.riskTracks <= 1 ? "pass" : "warn";
  const collaborationCoverage =
    collaborationSummary.blockedFlows <= 1 && collaborationSummary.passCheckpoints >= 1 ? "pass" : "warn";
  const performanceCoverage =
    performanceSummary.criticalSignals <= 1 && performanceSummary.activeTasks >= 1 ? "pass" : "warn";
  const contentOpsCoverage =
    contentOpsSummary.criticalSignals <= 1 && contentOpsSummary.activeTasks >= 1 ? "pass" : "warn";
  const aiGovernanceCoverage =
    aiGovernanceSummary.missingRules <= 1 && aiGovernanceSummary.strongProviders >= 1 ? "pass" : "warn";
  const growthAnalyticsCoverage =
    growthAnalyticsSummary.criticalStages <= 1 && growthAnalyticsSummary.validatedSegments >= 1 ? "pass" : "warn";
  const worktreeCoverage =
    worktreeSummary.criticalSignals <= 1 && worktreeSummary.activeTasks >= 1 ? "pass" : "warn";
  const designCoverage =
    designSummary.criticalSignals <= 1 && designSummary.activeTasks >= 1 ? "pass" : "warn";
  const observabilityCoverage =
    observabilitySummary.criticalSignals <= 1 && observabilitySummary.activeTasks >= 1 ? "pass" : "warn";
  const productOpsCoverage =
    productOpsSummary.criticalSignals <= 1 && productOpsSummary.activeTasks >= 1 ? "pass" : "warn";
  const monetizationCoverage =
    monetizationSummary.criticalSignals <= 1 && monetizationSummary.activeTasks >= 1 ? "pass" : "warn";
  const knowledgeCoverage =
    knowledgeSummary.criticalSignals <= 1 && knowledgeSummary.activeTasks >= 1 ? "pass" : "warn";
  const mergeCoverage =
    mergeSummary.criticalSignals <= 1 && mergeSummary.activeTasks >= 1 ? "pass" : "warn";
  const rollbackCoverage =
    rollbackSummary.criticalSignals <= 1 && rollbackSummary.activeTasks >= 1 ? "pass" : "warn";
  const connectorCoverage =
    connectorSummary.criticalSignals <= 1 && connectorSummary.activeTasks >= 1 ? "pass" : "warn";
  const agentCoverage =
    agentSummary.criticalSignals <= 1 && agentSummary.activeTasks >= 1 ? "pass" : "warn";
  const deploymentCoverage =
    deploymentSummary.criticalSignals <= 1 && deploymentSummary.activeTasks >= 1 ? "pass" : "warn";
  const testingCoverage =
    testingSummary.criticalSignals <= 1 && testingSummary.activeTasks >= 1 ? "pass" : "warn";
  const cloudCoverage =
    cloudSummary.criticalSignals <= 1 && cloudSummary.activeTasks >= 1 ? "pass" : "warn";
  const cloudCostCoverage =
    cloudCostSummary.criticalSignals <= 1 && cloudCostSummary.activeTasks >= 1 ? "pass" : "warn";
  const handoffCoverage =
    handoffSummary.criticalSignals <= 1 && handoffSummary.activeTasks >= 1 ? "pass" : "warn";
  const skillsCoverage =
    skillsSummary.criticalSignals <= 1 && skillsSummary.activeTasks >= 1 ? "pass" : "warn";
  const cloudSecurityCoverage =
    cloudSecuritySummary.criticalSignals <= 1 && cloudSecuritySummary.activeTasks >= 1 ? "pass" : "warn";
  const cloudDeployPipelineCoverage =
    cloudDeployPipelineSummary.criticalSignals <= 1 && cloudDeployPipelineSummary.activeTasks >= 1 ? "pass" : "warn";
  const cloudObservabilityPlusCoverage =
    cloudObservabilityPlusSummary.criticalSignals <= 1 && cloudObservabilityPlusSummary.activeTasks >= 1 ? "pass" : "warn";
  const siteUrlConfigured = siteConfig.url !== DEFAULT_SITE_URL;
  const contactConfigured = siteConfig.email !== DEFAULT_CONTACT_EMAIL;

  const gates: ReadinessGate[] = [
    createGate(
      "site-url",
      "Public site URL",
      siteUrlConfigured ? "pass" : "warn",
      siteUrlConfigured ? "Custom NEXT_PUBLIC_SITE_URL detected." : "Using default example.com; set real domain before production.",
      15
    ),
    createGate(
      "contact-email",
      "Contact email",
      contactConfigured ? "pass" : "warn",
      contactConfigured ? "Custom contact email configured." : "Using default contact email; configure branded sender address.",
      10
    ),
    createGate(
      "locale-coverage",
      "Multilingual coverage",
      localeCoverage,
      `${locales.length} locale(s) detected.`,
      15
    ),
    createGate(
      "content-coverage",
      "Portfolio and case depth",
      contentCoverage,
      `${worksCount} works, ${caseCount} case studies.`,
      15
    ),
    createGate(
      "insights-coverage",
      "Insights coverage",
      insightCoverage,
      `${insightCount} insights published.`,
      10
    ),
    createGate(
      "service-coverage",
      "Service architecture",
      serviceCoverage,
      `${serviceCount} service package(s) defined.`,
      10
    ),
    createGate(
      "playbook-coverage",
      "Automation playbooks",
      playbookCoverage,
      `${automationCount} automation playbook(s) ready.`,
      10
    ),
    createGate(
      "ai-workflow-coverage",
      "AI workflow orchestration",
      aiWorkflowCoverage,
      `${aiWorkflowCount} AI workflow pack(s) defined.`,
      10
    ),
    createGate(
      "governance-coverage",
      "Governance matrix depth",
      governanceCoverage,
      `${governanceCount} governance rule(s) available.`,
      8
    ),
    createGate(
      "feature-flag-coverage",
      "Feature rollout governance",
      featureFlagCoverage,
      `${featureFlagCount} feature flag(s) mapped with rollback action.`,
      6
    ),
    createGate(
      "capability-registry",
      "Bench capability registry",
      capabilityCoverage,
      `${capabilityCount} capability group(s) documented.`,
      6
    ),
    createGate(
      "risk-register-coverage",
      "Risk register coverage",
      riskCoverage,
      `${riskCount} risk item(s) tracked.`,
      6
    ),
    createGate(
      "scenario-coverage",
      "Release scenario coverage",
      scenarioCoverage,
      `${releaseScenarioCount} release scenario(s) defined.`,
      4
    ),
    createGate(
      "launch-checklist-coverage",
      "Launch checklist coverage",
      checklistCoverage,
      `${checklistTotal} launch checklist item(s) prepared.`,
      4
    ),
    createGate(
      "provider-orchestration-coverage",
      "Provider orchestration coverage",
      providerCoverage,
      `${providerSummary.readyProviders}/${providerSummary.providers} provider channel(s) ready.`,
      5
    ),
    createGate(
      "funnel-intelligence-coverage",
      "Funnel intelligence coverage",
      funnelCoverage,
      `${funnelSummary.stages} stages with ${funnelSummary.totalOptimizations} optimization vectors.`,
      4
    ),
    createGate(
      "roadmap-coverage",
      "Roadmap and execution tracks",
      roadmapCoverage,
      `${roadmapSummary.totalPhases} phase(s), ${roadmapSummary.tracks} track(s) documented.`,
      4
    ),
    createGate(
      "experience-lab-coverage",
      "Experience lab coverage",
      experienceCoverage,
      `${experienceSummary.signals} signal(s), ${experienceSummary.experiments} experiment(s), ${experienceSummary.frictions} friction point(s).`,
      4
    ),
    createGate(
      "incident-center-coverage",
      "Incident center coverage",
      incidentCoverage,
      `${incidentSummary.totalScenarios} scenario(s), ${incidentSummary.readyDrills} ready drill(s).`,
      4
    ),
    createGate(
      "dependency-governance-coverage",
      "Dependency governance coverage",
      dependencyCoverage,
      `${dependencySummary.totalPolicies} policy item(s), ${dependencySummary.requiredGuardrails} required guardrail(s).`,
      4
    ),
    createGate(
      "execution-pipeline-coverage",
      "Execution pipeline coverage",
      pipelineCoverage,
      `${pipelineSummary.totalPhases} phase(s), ${pipelineSummary.activeCadenceItems} active cadence item(s).`,
      4
    ),
    createGate(
      "seo-intelligence-coverage",
      "SEO intelligence coverage",
      seoCoverage,
      `${seoSummary.passChecks}/${seoSummary.totalChecks} checks passing.`,
      3
    ),
    createGate(
      "sre-coverage",
      "SRE coverage",
      sreCoverage,
      `${sreSummary.healthySlos}/${sreSummary.totalSlos} healthy SLO(s), ${sreSummary.readyRunbooks} ready runbook(s).`,
      3
    ),
    createGate(
      "compliance-coverage",
      "Compliance coverage",
      complianceCoverage,
      `${complianceSummary.compliantControls}/${complianceSummary.totalControls} compliant control(s).`,
      3
    ),
    createGate(
      "capacity-coverage",
      "Capacity forecast coverage",
      capacityCoverage,
      `${capacitySummary.totalModels} model(s), ${capacitySummary.riskModels} risk model(s), ${capacitySummary.activeScalingSteps} active scaling step(s).`,
      3
    ),
    createGate(
      "research-coverage",
      "Research ops coverage",
      researchCoverage,
      `${researchSummary.validatedSignals}/${researchSummary.totalSignals} validated signal(s), ${researchSummary.activeBacklogItems} active backlog item(s).`,
      3
    ),
    createGate(
      "automation-coverage",
      "Automation command coverage",
      automationCoverage,
      `${automationSummary.totalPipelines} pipeline(s), ${automationSummary.blockedPipelines} blocked pipeline(s).`,
      3
    ),
    createGate(
      "finops-coverage",
      "FinOps coverage",
      finopsCoverage,
      `${finopsSummary.totalBudgets} budget(s), ${finopsSummary.overBudgets} over-budget surface(s).`,
      3
    ),
    createGate(
      "localization-coverage",
      "Localization command coverage",
      localizationCoverage,
      `${localizationSummary.totalCoverageRows} coverage row(s), ${localizationSummary.missingRows} missing row(s).`,
      3
    ),
    createGate(
      "security-coverage",
      "Security command coverage",
      securityCoverage,
      `${securitySummary.totalRisks} risk item(s), ${securitySummary.criticalRisks} critical risk(s), ${securitySummary.readyDrills} ready drill(s).`,
      3
    ),
    createGate(
      "accessibility-coverage",
      "Accessibility command coverage",
      accessibilityCoverage,
      `${accessibilitySummary.totalChecks} check(s), ${accessibilitySummary.failChecks} fail check(s), ${accessibilitySummary.activeRemediations} active remediation(s).`,
      3
    ),
    createGate(
      "experiment-coverage",
      "Experiment command coverage",
      experimentCoverage,
      `${experimentSummary.totalTracks} experiment track(s), ${experimentSummary.riskTracks} risk track(s).`,
      3
    ),
    createGate(
      "collaboration-coverage",
      "Collaboration command coverage",
      collaborationCoverage,
      `${collaborationSummary.totalFlows} flow(s), ${collaborationSummary.blockedFlows} blocked flow(s).`,
      3
    ),
    createGate(
      "performance-coverage",
      "Performance command coverage",
      performanceCoverage,
      `${performanceSummary.totalSignals} signal(s), ${performanceSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "contentops-coverage",
      "Content ops command coverage",
      contentOpsCoverage,
      `${contentOpsSummary.totalSignals} signal(s), ${contentOpsSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "aigovernance-coverage",
      "AI governance command coverage",
      aiGovernanceCoverage,
      `${aiGovernanceSummary.totalRules} rule(s), ${aiGovernanceSummary.missingRules} missing rule(s).`,
      3
    ),
    createGate(
      "growthanalytics-coverage",
      "Growth analytics command coverage",
      growthAnalyticsCoverage,
      `${growthAnalyticsSummary.totalStages} stage(s), ${growthAnalyticsSummary.criticalStages} critical stage(s).`,
      3
    ),
    createGate(
      "worktree-coverage",
      "Worktree command coverage",
      worktreeCoverage,
      `${worktreeSummary.totalSignals} signal(s), ${worktreeSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "design-coverage",
      "Design system command coverage",
      designCoverage,
      `${designSummary.totalSignals} signal(s), ${designSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "observability-coverage",
      "Observability command coverage",
      observabilityCoverage,
      `${observabilitySummary.totalSignals} signal(s), ${observabilitySummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "productops-coverage",
      "Product ops command coverage",
      productOpsCoverage,
      `${productOpsSummary.totalSignals} signal(s), ${productOpsSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "monetization-coverage",
      "Monetization command coverage",
      monetizationCoverage,
      `${monetizationSummary.totalSignals} signal(s), ${monetizationSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "knowledge-coverage",
      "Knowledge command coverage",
      knowledgeCoverage,
      `${knowledgeSummary.totalSignals} signal(s), ${knowledgeSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "merge-coverage",
      "Merge command coverage",
      mergeCoverage,
      `${mergeSummary.totalSignals} signal(s), ${mergeSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "rollback-coverage",
      "Rollback command coverage",
      rollbackCoverage,
      `${rollbackSummary.totalSignals} signal(s), ${rollbackSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "connector-coverage",
      "Connector command coverage",
      connectorCoverage,
      `${connectorSummary.totalSignals} signal(s), ${connectorSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "agent-coverage",
      "Agent command coverage",
      agentCoverage,
      `${agentSummary.totalSignals} signal(s), ${agentSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "deployment-coverage",
      "Deployment command coverage",
      deploymentCoverage,
      `${deploymentSummary.totalSignals} signal(s), ${deploymentSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "testing-coverage",
      "Testing command coverage",
      testingCoverage,
      `${testingSummary.totalSignals} signal(s), ${testingSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "cloud-coverage",
      "Cloud command coverage",
      cloudCoverage,
      `${cloudSummary.totalSignals} signal(s), ${cloudSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "cloudcost-coverage",
      "Cloud cost command coverage",
      cloudCostCoverage,
      `${cloudCostSummary.totalSignals} signal(s), ${cloudCostSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "handoff-coverage",
      "Handoff command coverage",
      handoffCoverage,
      `${handoffSummary.totalSignals} signal(s), ${handoffSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "skills-coverage",
      "Skills command coverage",
      skillsCoverage,
      `${skillsSummary.totalSignals} signal(s), ${skillsSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "cloudsecurity-coverage",
      "Cloud security command coverage",
      cloudSecurityCoverage,
      `${cloudSecuritySummary.totalSignals} signal(s), ${cloudSecuritySummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "clouddeploy-coverage",
      "Cloud deploy pipeline command coverage",
      cloudDeployPipelineCoverage,
      `${cloudDeployPipelineSummary.totalSignals} signal(s), ${cloudDeployPipelineSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "cloudobservabilityplus-coverage",
      "Cloud observability plus command coverage",
      cloudObservabilityPlusCoverage,
      `${cloudObservabilityPlusSummary.totalSignals} signal(s), ${cloudObservabilityPlusSummary.criticalSignals} critical signal(s).`,
      3
    ),
    createGate(
      "integration-config",
      "Integration environment coverage",
      configuredIntegrations >= 2 ? "pass" : configuredIntegrations === 1 ? "warn" : "fail",
      `${configuredIntegrations}/${integrationEntries.length} integrations configured in this environment.`,
      5
    )
  ];

  const score = computeScore(gates);
  const riskLevel = score >= 85 ? "low" : score >= 65 ? "medium" : "high";
  const blockers = gates.filter((gate) => gate.status === "fail");

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    score,
    riskLevel,
    gates,
    blockers,
    summary: {
      totalGates: gates.length,
      passing: gates.filter((gate) => gate.status === "pass").length,
      warnings: gates.filter((gate) => gate.status === "warn").length,
      failures: blockers.length
    }
  });
}
