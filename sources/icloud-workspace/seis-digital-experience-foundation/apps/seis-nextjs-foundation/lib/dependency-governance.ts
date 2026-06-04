export type DependencyCategory = "runtime" | "dev" | "tooling" | "integration";

export type DependencyPolicyItem = {
  id: string;
  packageName: string;
  category: DependencyCategory;
  status: "approved" | "watch" | "restricted";
  rationale: string;
  upgradeCadence: string;
  rollbackPlan: string;
};

export type DependencyGuardrail = {
  id: string;
  title: string;
  level: "required" | "recommended";
  description: string;
};

const dependencyPolicies: DependencyPolicyItem[] = [
  {
    id: "dep-next-core",
    packageName: "next",
    category: "runtime",
    status: "approved",
    rationale: "Core application framework; stable long-term base for App Router architecture.",
    upgradeCadence: "minor after QA, patch weekly",
    rollbackPlan: "Pin previous minor and restore lockfile from last stable release tag."
  },
  {
    id: "dep-motion-stack",
    packageName: "framer-motion",
    category: "runtime",
    status: "watch",
    rationale: "Critical for premium motion quality; monitor bundle impact and SSR boundaries.",
    upgradeCadence: "monthly",
    rollbackPlan: "Fallback to CSS transform transitions for critical flows if regression appears."
  },
  {
    id: "dep-radix-primitives",
    packageName: "@radix-ui/*",
    category: "runtime",
    status: "approved",
    rationale: "Accessibility-first primitive layer with predictable behavior.",
    upgradeCadence: "monthly",
    rollbackPlan: "Revert to prior stable primitives release and keep existing component wrappers."
  },
  {
    id: "dep-gsap",
    packageName: "gsap",
    category: "runtime",
    status: "watch",
    rationale: "Powerful motion engine; use only for targeted high-value interactions.",
    upgradeCadence: "quarterly",
    rollbackPlan: "Disable GSAP-specific effects and use reduced motion fallback components."
  },
  {
    id: "dep-external-connectors",
    packageName: "connector ecosystem",
    category: "integration",
    status: "restricted",
    rationale: "Only add connectors with clear ROI and active maintenance evidence.",
    upgradeCadence: "on-demand after audit",
    rollbackPlan: "Disable connector entry points and route through local-first core workflows."
  }
];

const dependencyGuardrails: DependencyGuardrail[] = [
  {
    id: "guardrail-necessity",
    title: "Dependency Necessity Review",
    level: "required",
    description: "Every new package must include a concrete use-case and removal strategy."
  },
  {
    id: "guardrail-bundle-impact",
    title: "Bundle Impact Check",
    level: "required",
    description: "Assess client payload increase before accepting runtime additions."
  },
  {
    id: "guardrail-security-posture",
    title: "Security and Maintenance Posture",
    level: "required",
    description: "Reject stale packages without active maintenance or advisory transparency."
  },
  {
    id: "guardrail-rollback-proof",
    title: "Rollback Proof",
    level: "recommended",
    description: "Keep lockfile and migration notes ready for one-command recovery."
  },
  {
    id: "guardrail-vendor-neutrality",
    title: "Vendor Neutrality",
    level: "recommended",
    description: "Prefer interfaces that keep migration cost predictable over time."
  }
];

export function getDependencyPolicies(): DependencyPolicyItem[] {
  return dependencyPolicies;
}

export function getDependencyGuardrails(): DependencyGuardrail[] {
  return dependencyGuardrails;
}

export function getDependencySummary() {
  return {
    totalPolicies: dependencyPolicies.length,
    approvedPolicies: dependencyPolicies.filter((item) => item.status === "approved").length,
    watchPolicies: dependencyPolicies.filter((item) => item.status === "watch").length,
    restrictedPolicies: dependencyPolicies.filter((item) => item.status === "restricted").length,
    requiredGuardrails: dependencyGuardrails.filter((item) => item.level === "required").length,
    recommendedGuardrails: dependencyGuardrails.filter((item) => item.level === "recommended").length
  };
}
