export type SecurityPostureStatus = "passing" | "watch" | "blocked";

export type SecurityPostureSignal = {
  id: "branch-protection" | "signed-commits" | "code-scanning" | "dependency-alerts" | "secret-hygiene";
  label: string;
  status: SecurityPostureStatus;
  signal: string;
  action: string;
  evidence: string[];
};

export const securityPostureSignals: SecurityPostureSignal[] = [
  {
    id: "branch-protection",
    label: "Branch protection",
    status: "watch",
    signal: "GitHub accepts the Codex branch but reports protected-ref and PR-flow bypass warnings.",
    action: "Keep feature work on codex/* branches and open PRs before production merge.",
    evidence: ["git push output", "PR required", "protected ref"]
  },
  {
    id: "signed-commits",
    label: "Verified signatures",
    status: "watch",
    signal: "GitHub reports unsigned commit violations for local Codex commits.",
    action: "Enable local signing before protected production branches require verified commits without bypass.",
    evidence: ["verified signatures", "local git config", "branch rules"]
  },
  {
    id: "code-scanning",
    label: "Code scanning",
    status: "watch",
    signal: "GitHub is waiting for code scanning or cannot verify scanning status on the target branch.",
    action: "Add or verify a lightweight code scanning workflow only after runtime cost and repository policy are accepted.",
    evidence: ["GitHub code scanning", "workflow policy", "security budget"]
  },
  {
    id: "dependency-alerts",
    label: "Dependency alerts",
    status: "watch",
    signal: "GitHub reports Dependabot vulnerabilities on the default branch, separate from this feature branch build result.",
    action: "Triage critical and high alerts in a dedicated dependency maintenance pass, not mixed with UI feature work.",
    evidence: ["Dependabot", "critical/high triage", "separate PR"]
  },
  {
    id: "secret-hygiene",
    label: "Secret hygiene",
    status: "passing",
    signal: "Runtime routes keep credentials server-side and public APIs expose summaries, not tokens.",
    action: "Continue using server-only keys, non-interactive push checks and credential-aware publishing surfaces.",
    evidence: ["source boundaries", "API contracts", "publishing console"]
  }
];
