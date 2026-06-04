export type ComplianceControl = {
  id: string;
  domain: "security" | "privacy" | "accessibility" | "governance" | "content";
  title: string;
  status: "compliant" | "watch" | "non-compliant";
  owner: string;
  evidence: string;
  nextAction: string;
};

export type AuditCheckpoint = {
  id: string;
  name: string;
  cadence: string;
  status: "active" | "planned";
  scope: string;
};

const complianceControls: ComplianceControl[] = [
  {
    id: "control-secret-hygiene",
    domain: "security",
    title: "Secret Hygiene",
    status: "compliant",
    owner: "security-ops",
    evidence: "No secrets in tracked changes; environment-based configuration retained.",
    nextAction: "Keep pre-commit secret scan in release checklist."
  },
  {
    id: "control-accessibility-focus",
    domain: "accessibility",
    title: "Keyboard and Focus Accessibility",
    status: "watch",
    owner: "frontend-ops",
    evidence: "Focus paths are mostly stable; dense new route surfaces need regression pass.",
    nextAction: "Run route-level keyboard navigation review across all lab pages."
  },
  {
    id: "control-i18n-parity",
    domain: "content",
    title: "I18n Parity (TR/EN/FR/IT/DE)",
    status: "watch",
    owner: "content-ops",
    evidence: "Core structure supports locales; newest operational labels are EN-weighted.",
    nextAction: "Complete localized copy sweep for v5 route additions."
  },
  {
    id: "control-governance-rollback",
    domain: "governance",
    title: "Rollback-Safe Governance",
    status: "compliant",
    owner: "release-ops",
    evidence: "Incremental commits and branch discipline preserved.",
    nextAction: "Keep one-purpose commit policy through next sprint."
  },
  {
    id: "control-privacy-logs",
    domain: "privacy",
    title: "Operational Log Privacy",
    status: "compliant",
    owner: "backend-ops",
    evidence: "No PII surfaces introduced in API response snapshots.",
    nextAction: "Retain redaction policy for future connector payloads."
  }
];

const auditCheckpoints: AuditCheckpoint[] = [
  {
    id: "audit-weekly-governance",
    name: "Weekly Governance Audit",
    cadence: "weekly",
    status: "active",
    scope: "Release gates, rollback paths, branch policy adherence"
  },
  {
    id: "audit-monthly-accessibility",
    name: "Monthly Accessibility Deep Audit",
    cadence: "monthly",
    status: "planned",
    scope: "Keyboard flow, focus visibility, reduced motion behavior"
  },
  {
    id: "audit-quarterly-compliance",
    name: "Quarterly Compliance Review",
    cadence: "quarterly",
    status: "planned",
    scope: "Security + privacy + operational policy maturity"
  }
];

export function getComplianceControls(): ComplianceControl[] {
  return complianceControls;
}

export function getAuditCheckpoints(): AuditCheckpoint[] {
  return auditCheckpoints;
}

export function getComplianceSummary() {
  return {
    totalControls: complianceControls.length,
    compliantControls: complianceControls.filter((item) => item.status === "compliant").length,
    watchControls: complianceControls.filter((item) => item.status === "watch").length,
    nonCompliantControls: complianceControls.filter((item) => item.status === "non-compliant").length,
    checkpoints: auditCheckpoints.length,
    activeCheckpoints: auditCheckpoints.filter((item) => item.status === "active").length,
    plannedCheckpoints: auditCheckpoints.filter((item) => item.status === "planned").length
  };
}
