export type SecurityRisk = {
  id: string;
  domain: "auth" | "api" | "secrets" | "infra" | "compliance";
  title: string;
  status: "mitigated" | "watch" | "critical";
  owner: string;
  evidence: string;
  action: string;
};

export type SecurityDrill = {
  id: string;
  title: string;
  cadence: string;
  status: "ready" | "planned" | "blocked";
  owner: string;
};

const securityRisks: SecurityRisk[] = [
  {
    id: "security-auth-session-ttl",
    domain: "auth",
    title: "Session TTL drift",
    status: "watch",
    owner: "security-ops",
    evidence: "Session windows are stable but high-load test matrix is incomplete.",
    action: "Run high-concurrency session expiry validation before next release gate."
  },
  {
    id: "security-api-input-hardening",
    domain: "api",
    title: "API input hardening coverage",
    status: "mitigated",
    owner: "backend-ops",
    evidence: "Core command endpoints use typed structures and bounded payloads.",
    action: "Keep schema fuzz checks in weekly resilience run."
  },
  {
    id: "security-secret-rotation",
    domain: "secrets",
    title: "Credential rotation cadence",
    status: "watch",
    owner: "infra-ops",
    evidence: "Rotation policy exists; audit trace visibility needs better centralization.",
    action: "Publish rotation proof artifacts to secure ops board."
  },
  {
    id: "security-csp-coverage",
    domain: "infra",
    title: "CSP route coverage",
    status: "mitigated",
    owner: "platform",
    evidence: "Security headers are active in Next.js config and route surfaces.",
    action: "Add monthly CSP regression sweep with route inventory diffs."
  },
  {
    id: "security-third-party-connector",
    domain: "compliance",
    title: "Connector governance traceability",
    status: "critical",
    owner: "compliance-ops",
    evidence: "Some connectors are planned but still missing validated lifecycle evidence.",
    action: "Attach per-connector owner and review cadence before production enablement."
  }
];

const securityDrills: SecurityDrill[] = [
  {
    id: "drill-credential-leak-sim",
    title: "Credential leak simulation",
    cadence: "monthly",
    status: "ready",
    owner: "security-ops"
  },
  {
    id: "drill-api-abuse",
    title: "API abuse and rate-limit drill",
    cadence: "bi-weekly",
    status: "planned",
    owner: "backend-ops"
  },
  {
    id: "drill-connector-audit",
    title: "Connector trust boundary audit",
    cadence: "quarterly",
    status: "blocked",
    owner: "compliance-ops"
  }
];

export function getSecurityRisks(): SecurityRisk[] {
  return securityRisks;
}

export function getSecurityDrills(): SecurityDrill[] {
  return securityDrills;
}

export function getSecuritySummary() {
  return {
    totalRisks: securityRisks.length,
    mitigatedRisks: securityRisks.filter((item) => item.status === "mitigated").length,
    watchRisks: securityRisks.filter((item) => item.status === "watch").length,
    criticalRisks: securityRisks.filter((item) => item.status === "critical").length,
    drills: securityDrills.length,
    readyDrills: securityDrills.filter((item) => item.status === "ready").length,
    blockedDrills: securityDrills.filter((item) => item.status === "blocked").length
  };
}
