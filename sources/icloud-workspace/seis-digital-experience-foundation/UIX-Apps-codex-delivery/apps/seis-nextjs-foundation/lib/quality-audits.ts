export type PerformanceBudgetItem = {
  id: string;
  label: string;
  target: string;
  current: string;
  status: "healthy" | "watch" | "critical";
  note: string;
};

export type AccessibilityAuditItem = {
  id: string;
  label: string;
  status: "pass" | "check" | "fail";
  detail: string;
  rollbackHint: string;
};

export type ContentGovernanceItem = {
  id: string;
  label: string;
  status: "aligned" | "warning" | "misaligned";
  detail: string;
  owner: string;
};

const performanceBudgets: PerformanceBudgetItem[] = [
  {
    id: "budget-lcp-mobile",
    label: "LCP (mobile)",
    target: "< 2.5s",
    current: "2.1s",
    status: "healthy",
    note: "Within target range under current asset profile."
  },
  {
    id: "budget-cls",
    label: "CLS",
    target: "< 0.10",
    current: "0.05",
    status: "healthy",
    note: "Layout stability is preserved across section transitions."
  },
  {
    id: "budget-js-weight",
    label: "Initial JS weight",
    target: "< 230KB",
    current: "246KB",
    status: "watch",
    note: "Control/ops expansion increased payload; optimize low-priority client modules."
  },
  {
    id: "budget-animation-cost",
    label: "Animation paint cost",
    target: "< 12ms/frame",
    current: "13ms/frame",
    status: "watch",
    note: "High-density dashboards may trigger occasional frame cost spikes."
  },
  {
    id: "budget-third-party",
    label: "Third-party script count",
    target: "<= 3",
    current: "1",
    status: "healthy",
    note: "Third-party dependency footprint remains lean."
  }
];

const accessibilityAudits: AccessibilityAuditItem[] = [
  {
    id: "a11y-keyboard-nav",
    label: "Keyboard navigation path",
    status: "pass",
    detail: "Primary navigation, command palette, and forms retain keyboard operability.",
    rollbackHint: "Revert nav interaction changes if focus traps break."
  },
  {
    id: "a11y-focus-visibility",
    label: "Focus visibility",
    status: "check",
    detail: "Most interactive elements have visible focus; verify newest strategy/release-lab links.",
    rollbackHint: "Restore baseline focus ring tokens from prior stable commit."
  },
  {
    id: "a11y-reduced-motion",
    label: "Reduced-motion behavior",
    status: "pass",
    detail: "Core decorative motion layers have reduced-motion-compatible patterns.",
    rollbackHint: "Disable decorative motion wrappers if conflicts appear."
  },
  {
    id: "a11y-contrast",
    label: "Color contrast",
    status: "check",
    detail: "Muted text on dark surfaces is mostly compliant; verify smaller labels in dense cards.",
    rollbackHint: "Promote low-contrast labels to secondary text token."
  },
  {
    id: "a11y-semantic-structure",
    label: "Semantic heading structure",
    status: "pass",
    detail: "Page hierarchy uses stable heading rhythm across major routes.",
    rollbackHint: "Fallback to previous section heading primitives."
  }
];

const contentGovernanceChecks: ContentGovernanceItem[] = [
  {
    id: "content-tone-consistency",
    label: "Premium tone consistency",
    status: "aligned",
    detail: "Core pages maintain premium/cinematic tone without generic filler.",
    owner: "content"
  },
  {
    id: "content-locale-coverage",
    label: "TR/EN/FR/IT/DE parity",
    status: "warning",
    detail: "New ops-heavy pages are mostly English-focused; localized copy pass planned.",
    owner: "content"
  },
  {
    id: "content-cta-coherence",
    label: "CTA coherence",
    status: "aligned",
    detail: "Navigation paths align with control, ops, strategy, and release flows.",
    owner: "product"
  },
  {
    id: "content-doc-sync",
    label: "Docs and route sync",
    status: "aligned",
    detail: "README and sprint documents include newly introduced route/api modules.",
    owner: "operations"
  },
  {
    id: "content-overload-risk",
    label: "Feature overload readability",
    status: "warning",
    detail: "High module density can overwhelm first-time users; guided grouping helps.",
    owner: "ux"
  }
];

export function getPerformanceBudgets(): PerformanceBudgetItem[] {
  return performanceBudgets;
}

export function getAccessibilityAudits(): AccessibilityAuditItem[] {
  return accessibilityAudits;
}

export function getContentGovernanceChecks(): ContentGovernanceItem[] {
  return contentGovernanceChecks;
}

export function getQualityAuditSummary() {
  return {
    performance: {
      total: performanceBudgets.length,
      healthy: performanceBudgets.filter((item) => item.status === "healthy").length,
      watch: performanceBudgets.filter((item) => item.status === "watch").length,
      critical: performanceBudgets.filter((item) => item.status === "critical").length
    },
    accessibility: {
      total: accessibilityAudits.length,
      pass: accessibilityAudits.filter((item) => item.status === "pass").length,
      check: accessibilityAudits.filter((item) => item.status === "check").length,
      fail: accessibilityAudits.filter((item) => item.status === "fail").length
    },
    contentGovernance: {
      total: contentGovernanceChecks.length,
      aligned: contentGovernanceChecks.filter((item) => item.status === "aligned").length,
      warning: contentGovernanceChecks.filter((item) => item.status === "warning").length,
      misaligned: contentGovernanceChecks.filter((item) => item.status === "misaligned").length
    }
  };
}
