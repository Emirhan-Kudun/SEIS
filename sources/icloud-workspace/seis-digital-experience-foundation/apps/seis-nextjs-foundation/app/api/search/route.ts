import { NextResponse } from "next/server";

import { getAccessibilityChecks } from "@/lib/accessibility-command";
import { getAiWorkflowPacks } from "@/lib/ai-workflows";
import { getAiGovernanceRules } from "@/lib/ai-governance-command";
import { getAutomationPipelines } from "@/lib/automation-command";
import { automationPlaybooks } from "@/lib/automation-content";
import { getBenchCapabilityGroups } from "@/lib/bench-capabilities";
import { getCollaborationFlows } from "@/lib/collaboration-command";
import { getConnectorSignals } from "@/lib/connector-command";
import { getContentOpsSignals } from "@/lib/content-ops-command";
import { getDesignSignals } from "@/lib/design-system-command";
import { getCaseStudies, resolveLocale } from "@/lib/content";
import { getWorkItems } from "@/lib/creative-content";
import { getExperimentTracks } from "@/lib/experiment-command";
import { getFeatureFlags } from "@/lib/feature-flags";
import { getFinopsBudgets } from "@/lib/finops-command";
import { getFunnelHealth } from "@/lib/growth-analytics-command";
import { getExperienceSignals } from "@/lib/experience-lab";
import { getGovernanceRules } from "@/lib/governance-content";
import { getIncidentScenarios } from "@/lib/incident-center";
import { getFunnelStages } from "@/lib/funnel-strategy";
import { searchInsights } from "@/lib/insights-content";
import { getKnowledgeSignals } from "@/lib/knowledge-command";
import { getLaunchChecklist } from "@/lib/launch-checklist";
import { getLocaleCoverage } from "@/lib/localization-command";
import { getMonetizationSignals } from "@/lib/monetization-command";
import { getObservabilitySignals } from "@/lib/observability-command";
import { getPerformanceSignals } from "@/lib/performance-command";
import { getProductOpsSignals } from "@/lib/product-ops-command";
import { getProviderChannels } from "@/lib/provider-orchestration";
import { getPerformanceBudgets } from "@/lib/quality-audits";
import { getReleaseScenarios } from "@/lib/release-scenarios";
import { getRiskRegister } from "@/lib/risk-register";
import { getCapacityModels } from "@/lib/capacity-forecast";
import { getComplianceControls } from "@/lib/compliance-matrix";
import { getDependencyPolicies } from "@/lib/dependency-governance";
import { getPipelinePhases } from "@/lib/execution-pipeline";
import { getResearchSignals } from "@/lib/research-ops";
import { getRollbackSignals } from "@/lib/rollback-command";
import { getSecurityRisks } from "@/lib/security-command";
import { getSeoChecks } from "@/lib/seo-intelligence";
import { getSloMetrics } from "@/lib/sre-command";
import { getSystemRoadmapPhases } from "@/lib/system-roadmap";
import { getWorktreeSignals } from "@/lib/worktree-command";
import { getMergeSignals } from "@/lib/merge-command";
import { getAgentSignals } from "@/lib/agent-command";
import { getDeploymentSignals } from "@/lib/deployment-command";
import { getTestingSignals } from "@/lib/testing-command";
import { getCloudSignals } from "@/lib/cloud-command";
import { getCloudCostSignals } from "@/lib/cloud-cost-command";
import { getHandoffSignals } from "@/lib/handoff-command";
import { getSkillsSignals } from "@/lib/skills-command";
import { getCloudSecuritySignals } from "@/lib/cloud-security-command";
import { getCloudDeployPipelineSignals } from "@/lib/cloud-deploy-pipeline-command";
import { getCloudObservabilityPlusSignals } from "@/lib/cloud-observability-plus-command";
import { getInteractionLabContent } from "@/lib/interaction-lab-content";

type SearchDomain = "all" | "works" | "insights" | "cases" | "playbooks" | "ops" | "strategy" | "intelligence" | "resilience" | "command";

function normalizeDomain(value: string | null): SearchDomain {
  if (value === "works" || value === "insights" || value === "cases" || value === "playbooks" || value === "ops" || value === "strategy" || value === "intelligence" || value === "resilience" || value === "command") return value;
  return "all";
}

function normalizeLimit(value: string | null): number {
  if (!value) return 20;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 20;
  return Math.min(100, Math.max(1, Math.floor(parsed)));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = resolveLocale(url.searchParams.get("lang") ?? undefined);
  const domain = normalizeDomain(url.searchParams.get("domain"));
  const query = (url.searchParams.get("q") ?? "").trim();
  const limit = normalizeLimit(url.searchParams.get("limit"));

  const normalized = query.toLowerCase();

  const works = domain === "all" || domain === "works"
    ? getWorkItems(locale)
        .filter(
          (item) =>
            !normalized ||
            item.title.toLowerCase().includes(normalized) ||
            item.summary.toLowerCase().includes(normalized) ||
            item.client.toLowerCase().includes(normalized)
        )
        .map((item) => ({
          type: "work",
          slug: item.slug,
          title: item.title,
          subtitle: item.summary,
          href: `/works/${item.slug}?lang=${locale}`
        }))
    : [];

  const insights = domain === "all" || domain === "insights"
    ? searchInsights(locale, query, null).map((item) => ({
        type: "insight",
        slug: item.slug,
        title: item.title,
        subtitle: item.summary,
        href: `/insights/${item.slug}?lang=${locale}`
      }))
    : [];

  const cases = domain === "all" || domain === "cases"
    ? getCaseStudies(locale)
        .filter(
          (item) =>
            !normalized ||
            item.title.toLowerCase().includes(normalized) ||
            item.summary.toLowerCase().includes(normalized)
        )
        .map((item) => ({
          type: "case",
          slug: item.slug,
          title: item.title,
          subtitle: item.summary,
          href: `/case-studies/${item.slug}?lang=${locale}`
        }))
    : [];

  const playbooks = domain === "all" || domain === "playbooks"
    ? [
        ...automationPlaybooks
          .filter(
            (item) =>
              !normalized ||
              item.name.toLowerCase().includes(normalized) ||
              item.goal.toLowerCase().includes(normalized) ||
              item.tools.some((tool) => tool.toLowerCase().includes(normalized))
          )
          .map((item) => ({
            type: "playbook",
            slug: item.id,
            title: item.name,
            subtitle: item.goal,
            href: `/playbooks?lang=${locale}`
          })),
        ...getAiWorkflowPacks()
          .filter(
            (item) =>
              !normalized ||
              item.name.toLowerCase().includes(normalized) ||
              item.goal.toLowerCase().includes(normalized) ||
              item.provider.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "workflow",
            slug: item.id,
            title: item.name,
            subtitle: item.goal,
            href: `/playbooks?lang=${locale}`
          }))
      ]
    : [];

  const ops = domain === "all" || domain === "ops"
    ? [
        ...getGovernanceRules()
          .filter(
            (rule) =>
              !normalized ||
              rule.title.toLowerCase().includes(normalized) ||
              rule.domain.toLowerCase().includes(normalized) ||
              rule.description.toLowerCase().includes(normalized)
          )
          .map((rule) => ({
            type: "governance",
            slug: rule.id,
            title: rule.title,
            subtitle: rule.description,
            href: `/governance?lang=${locale}`
          })),
        ...getFeatureFlags()
          .filter(
            (flag) =>
              !normalized ||
              flag.name.toLowerCase().includes(normalized) ||
              flag.status.toLowerCase().includes(normalized) ||
              flag.description.toLowerCase().includes(normalized)
          )
          .map((flag) => ({
            type: "flag",
            slug: flag.id,
            title: flag.name,
            subtitle: flag.description,
            href: `/ops?lang=${locale}`
          })),
        ...getBenchCapabilityGroups()
          .filter(
            (group) =>
              !normalized ||
              group.title.toLowerCase().includes(normalized) ||
              group.areas.some((area) => area.toLowerCase().includes(normalized))
          )
          .map((group) => ({
            type: "capability",
            slug: group.id,
            title: group.title,
            subtitle: `${group.areas.length} capability area(s)`,
            href: `/bench?lang=${locale}`
          }))
      ]
    : [];

  const strategy = domain === "all" || domain === "strategy"
    ? [
        ...getRiskRegister()
          .filter(
            (risk) =>
              !normalized ||
              risk.title.toLowerCase().includes(normalized) ||
              risk.domain.toLowerCase().includes(normalized) ||
              risk.impact.toLowerCase().includes(normalized)
          )
          .map((risk) => ({
            type: "risk",
            slug: risk.id,
            title: risk.title,
            subtitle: `${risk.level} risk - ${risk.domain}`,
            href: `/risk?lang=${locale}`
          })),
        ...getReleaseScenarios()
          .filter(
            (scenario) =>
              !normalized ||
              scenario.name.toLowerCase().includes(normalized) ||
              scenario.profile.toLowerCase().includes(normalized) ||
              scenario.description.toLowerCase().includes(normalized)
          )
          .map((scenario) => ({
            type: "scenario",
            slug: scenario.id,
            title: scenario.name,
            subtitle: scenario.description,
            href: `/release-lab?lang=${locale}`
          })),
        ...getLaunchChecklist()
          .flatMap((group) => group.items)
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.owner.toLowerCase().includes(normalized) ||
              item.detail.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "checklist",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.owner}`,
            href: `/strategy?lang=${locale}`
          }))
      ]
    : [];

  const intelligence = domain === "all" || domain === "intelligence"
    ? [
        ...getProviderChannels()
          .filter(
            (item) =>
              !normalized ||
              item.provider.toLowerCase().includes(normalized) ||
              item.role.toLowerCase().includes(normalized) ||
              item.strengths.some((area) => area.toLowerCase().includes(normalized))
          )
          .map((item) => ({
            type: "provider",
            slug: item.id,
            title: `${item.provider.toUpperCase()} provider channel`,
            subtitle: item.role,
            href: `/provider-hub?lang=${locale}`
          })),
        ...getFunnelStages()
          .filter(
            (item) =>
              !normalized ||
              item.name.toLowerCase().includes(normalized) ||
              item.objective.toLowerCase().includes(normalized) ||
              item.optimizations.some((area) => area.toLowerCase().includes(normalized))
          )
          .map((item) => ({
            type: "funnel",
            slug: item.id,
            title: item.name,
            subtitle: item.objective,
            href: `/growth-lab?lang=${locale}`
          })),
        ...getSystemRoadmapPhases()
          .filter(
            (item) =>
              !normalized ||
              item.name.toLowerCase().includes(normalized) ||
              item.objective.toLowerCase().includes(normalized) ||
              item.workstreams.some((area) => area.toLowerCase().includes(normalized))
          )
          .map((item) => ({
            type: "roadmap",
            slug: item.id,
            title: item.name,
            subtitle: item.objective,
            href: `/orchestration?lang=${locale}`
          })),
        ...getExperienceSignals()
          .filter(
            (item) =>
              !normalized ||
              item.area.toLowerCase().includes(normalized) ||
              item.note.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "experience",
            slug: item.id,
            title: item.area,
            subtitle: item.note,
            href: `/experience-lab?lang=${locale}`
          })),
        ...getPerformanceBudgets()
          .filter(
            (item) =>
              !normalized ||
              item.label.toLowerCase().includes(normalized) ||
              item.note.toLowerCase().includes(normalized) ||
              item.target.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "quality",
            slug: item.id,
            title: item.label,
            subtitle: `${item.target} target - ${item.current} current`,
            href: `/quality-lab?lang=${locale}`
          }))
      ]
    : [];

  const resilience = domain === "all" || domain === "resilience"
    ? [
        ...getIncidentScenarios()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.domain.toLowerCase().includes(normalized) ||
              item.firstResponse.some((step) => step.toLowerCase().includes(normalized))
          )
          .map((item) => ({
            type: "incident",
            slug: item.id,
            title: item.title,
            subtitle: `${item.severity} - ${item.domain} - sla ${item.slaMinutes}m`,
            href: `/incident-center?lang=${locale}`
          })),
        ...getDependencyPolicies()
          .filter(
            (item) =>
              !normalized ||
              item.packageName.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.rationale.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "dependency",
            slug: item.id,
            title: item.packageName,
            subtitle: `${item.status} - ${item.category}`,
            href: `/dependency-lab?lang=${locale}`
          })),
        ...getPipelinePhases()
          .filter(
            (item) =>
              !normalized ||
              item.name.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.objective.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "pipeline",
            slug: item.id,
            title: item.name,
            subtitle: `${item.status} - owner: ${item.owner}`,
            href: `/execution-lab?lang=${locale}`
          })),
        ...getSeoChecks()
          .filter(
            (item) =>
              !normalized ||
              item.label.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.detail.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "seo",
            slug: item.id,
            title: item.label,
            subtitle: `${item.status} - owner: ${item.owner}`,
            href: `/seo-lab?lang=${locale}`
          }))
      ]
    : [];

  const command = domain === "all" || domain === "command"
    ? [
        ...getSloMetrics()
          .filter(
            (item) =>
              !normalized ||
              item.service.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.note.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "sre",
            slug: item.id,
            title: item.service,
            subtitle: `${item.status} - ${item.objective}`,
            href: `/sre-lab?lang=${locale}`
          })),
        ...getComplianceControls()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.domain.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "compliance",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.domain}`,
            href: `/compliance-lab?lang=${locale}`
          })),
        ...getCapacityModels()
          .filter(
            (item) =>
              !normalized ||
              item.surface.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.bottleneck.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "capacity",
            slug: item.id,
            title: item.surface,
            subtitle: `${item.status} - forecast: ${item.forecast}`,
            href: `/capacity-lab?lang=${locale}`
          })),
        ...getResearchSignals()
          .filter(
            (item) =>
              !normalized ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.insight.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "research",
            slug: item.id,
            title: item.area,
            subtitle: `${item.status} - confidence: ${item.confidence}`,
            href: `/research-lab?lang=${locale}`
          })),
        ...getAutomationPipelines()
          .filter(
            (item) =>
              !normalized ||
              item.name.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.note.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "automation",
            slug: item.id,
            title: item.name,
            subtitle: `${item.status} - ${item.trigger}`,
            href: `/automation-lab?lang=${locale}`
          })),
        ...getFinopsBudgets()
          .filter(
            (item) =>
              !normalized ||
              item.scope.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.action.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "finops",
            slug: item.id,
            title: item.scope,
            subtitle: `${item.status} - budget ${item.monthlyBudget}`,
            href: `/finops-lab?lang=${locale}`
          })),
        ...getLocaleCoverage()
          .filter(
            (item) =>
              !normalized ||
              item.locale.toLowerCase().includes(normalized) ||
              item.section.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "localization",
            slug: item.id,
            title: `${item.locale.toUpperCase()} ${item.section}`,
            subtitle: `${item.status} - coverage ${item.coverage}`,
            href: `/localization-lab?lang=${locale}`
          })),
        ...getSecurityRisks()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.domain.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "security",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.domain}`,
            href: `/security-lab?lang=${locale}`
          })),
        ...getAccessibilityChecks()
          .filter(
            (item) =>
              !normalized ||
              item.surface.toLowerCase().includes(normalized) ||
              item.check.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "accessibility",
            slug: item.id,
            title: item.check,
            subtitle: `${item.status} - ${item.surface}`,
            href: `/accessibility-lab?lang=${locale}`
          })),
        ...getExperimentTracks()
          .filter(
            (item) =>
              !normalized ||
              item.hypothesis.toLowerCase().includes(normalized) ||
              item.metric.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "experiment",
            slug: item.id,
            title: item.hypothesis,
            subtitle: `${item.status} - metric: ${item.metric}`,
            href: `/experiment-lab?lang=${locale}`
          })),
        ...getCollaborationFlows()
          .filter(
            (item) =>
              !normalized ||
              item.system.toLowerCase().includes(normalized) ||
              item.workflow.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "collaboration",
            slug: item.id,
            title: item.workflow,
            subtitle: `${item.status} - ${item.system}`,
            href: `/collaboration-lab?lang=${locale}`
          })),
        ...getPerformanceSignals()
          .filter(
            (item) =>
              !normalized ||
              item.surface.toLowerCase().includes(normalized) ||
              item.metric.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "performance",
            slug: item.id,
            title: item.surface,
            subtitle: `${item.status} - ${item.metric}`,
            href: `/performance-lab?lang=${locale}`
          })),
        ...getContentOpsSignals()
          .filter(
            (item) =>
              !normalized ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.detail.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "contentops",
            slug: item.id,
            title: item.area,
            subtitle: `${item.status} - ${item.owner}`,
            href: `/content-ops-lab?lang=${locale}`
          })),
        ...getAiGovernanceRules()
          .filter(
            (item) =>
              !normalized ||
              item.policy.toLowerCase().includes(normalized) ||
              item.domain.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "aigovernance",
            slug: item.id,
            title: item.policy,
            subtitle: `${item.status} - ${item.domain}`,
            href: `/ai-governance-lab?lang=${locale}`
          })),
        ...getFunnelHealth()
          .filter(
            (item) =>
              !normalized ||
              item.stage.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized) ||
              item.action.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "growthanalytics",
            slug: item.id,
            title: item.stage,
            subtitle: `${item.status} - ${item.conversion}`,
            href: `/growth-analytics-lab?lang=${locale}`
          })),
        ...getWorktreeSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.lane.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "worktree",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.lane}`,
            href: `/worktree-lab?lang=${locale}`
          })),
        ...getDesignSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "design",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.area}`,
            href: `/design-lab?lang=${locale}`
          })),
        ...getObservabilitySignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.surface.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "observability",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.surface}`,
            href: `/observability-lab?lang=${locale}`
          })),
        ...getProductOpsSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.lane.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "productops",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.lane}`,
            href: `/product-ops-lab?lang=${locale}`
          })),
        ...getMonetizationSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.stream.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "monetization",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.stream}`,
            href: `/monetization-lab?lang=${locale}`
          })),
        ...getKnowledgeSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "knowledge",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.area}`,
            href: `/knowledge-lab?lang=${locale}`
          })),
        ...getMergeSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.lane.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "merge",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.lane}`,
            href: `/merge-lab?lang=${locale}`
          })),
        ...getRollbackSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.surface.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "rollback",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.surface}`,
            href: `/rollback-lab?lang=${locale}`
          })),
        ...getConnectorSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "connector",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.area}`,
            href: `/connector-lab?lang=${locale}`
          })),
        ...getAgentSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "agent",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.area}`,
            href: `/agent-lab?lang=${locale}`
          })),
        ...getDeploymentSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.stage.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "deployment",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.stage}`,
            href: `/deployment-lab?lang=${locale}`
          })),
        ...getTestingSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "testing",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.area}`,
            href: `/testing-lab?lang=${locale}`
          })),
        ...getCloudSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.lane.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "cloud",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.lane}`,
            href: `/cloud-lab?lang=${locale}`
          })),
        ...getCloudCostSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "cloudcost",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.area}`,
            href: `/cloud-cost-lab?lang=${locale}`
          })),
        ...getHandoffSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "handoff",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.area}`,
            href: `/handoff-lab?lang=${locale}`
          })),
        ...getSkillsSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.lane.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "skills",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.lane}`,
            href: `/skills-lab?lang=${locale}`
          })),
        ...getCloudSecuritySignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.area.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "cloudsecurity",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.area}`,
            href: `/cloud-security-lab?lang=${locale}`
          })),
        ...getCloudDeployPipelineSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.stage.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "clouddeploy",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.stage}`,
            href: `/cloud-deploy-pipeline-lab?lang=${locale}`
          })),
        ...getCloudObservabilityPlusSignals()
          .filter(
            (item) =>
              !normalized ||
              item.title.toLowerCase().includes(normalized) ||
              item.lane.toLowerCase().includes(normalized) ||
              item.status.toLowerCase().includes(normalized)
          )
          .map((item) => ({
            type: "cloudobservabilityplus",
            slug: item.id,
            title: item.title,
            subtitle: `${item.status} - ${item.lane}`,
            href: `/cloud-observability-plus-lab?lang=${locale}`
          }))
      ]
    : [];

  const interaction = domain === "all" || domain === "command" || domain === "ops"
    ? [
        {
          type: "lab",
          slug: "interaction-lab",
          title: getInteractionLabContent(locale).dictionary.title,
          subtitle: "multilingual + hover + motion",
          href: `/interaction-lab?lang=${locale}`
        }
      ].filter(
        (item) =>
          !normalized ||
          item.title.toLowerCase().includes(normalized) ||
          item.subtitle.toLowerCase().includes(normalized) ||
          item.slug.includes(normalized)
      )
    : [];

  const results = [...works, ...insights, ...cases, ...playbooks, ...ops, ...strategy, ...intelligence, ...resilience, ...command, ...interaction].slice(0, limit);

  return NextResponse.json({
    ok: true,
    locale,
    domain,
    query,
    total: results.length,
    results
  });
}
