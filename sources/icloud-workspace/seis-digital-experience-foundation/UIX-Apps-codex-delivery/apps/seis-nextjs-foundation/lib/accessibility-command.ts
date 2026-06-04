export type AccessibilityCheck = {
  id: string;
  surface: string;
  check: string;
  status: "pass" | "watch" | "fail";
  note: string;
};

export type AccessibilityRemediation = {
  id: string;
  title: string;
  priority: "p1" | "p2" | "p3";
  owner: string;
  status: "planned" | "active" | "done";
};

const accessibilityChecks: AccessibilityCheck[] = [
  {
    id: "a11y-focus-flow-command-labs",
    surface: "Command lab routes",
    check: "Keyboard focus continuity",
    status: "watch",
    note: "Most routes are keyboard-safe; newer lab surfaces need full traversal audit."
  },
  {
    id: "a11y-color-contrast-dark",
    surface: "Dark UI cards",
    check: "Contrast ratio target",
    status: "pass",
    note: "Primary card typography stays within expected contrast thresholds."
  },
  {
    id: "a11y-motion-reduced",
    surface: "Motion + interaction layers",
    check: "Reduced motion fallback",
    status: "watch",
    note: "Core animations are restrained; route-level reduced-motion parity needs deeper pass."
  },
  {
    id: "a11y-landmark-coverage",
    surface: "Structural semantics",
    check: "Landmarks and heading hierarchy",
    status: "pass",
    note: "Main sectioning remains coherent in primary content flows."
  },
  {
    id: "a11y-touch-target-density",
    surface: "Mobile command navigation",
    check: "Tap target minimum size",
    status: "fail",
    note: "Dense quick-link clusters can produce tight tap regions on compact widths."
  }
];

const accessibilityRemediations: AccessibilityRemediation[] = [
  {
    id: "a11y-remediation-mobile-tap-target",
    title: "Increase tap targets for compact quick-link clusters",
    priority: "p1",
    owner: "frontend-ops",
    status: "active"
  },
  {
    id: "a11y-remediation-reduced-motion-audit",
    title: "Add explicit reduced-motion behavior matrix",
    priority: "p2",
    owner: "ux-engineering",
    status: "planned"
  },
  {
    id: "a11y-remediation-command-palette",
    title: "Run screen reader semantics pass for command palette",
    priority: "p2",
    owner: "frontend-ops",
    status: "planned"
  },
  {
    id: "a11y-remediation-route-checklist",
    title: "Automate route accessibility smoke checklist",
    priority: "p3",
    owner: "qa",
    status: "planned"
  }
];

export function getAccessibilityChecks(): AccessibilityCheck[] {
  return accessibilityChecks;
}

export function getAccessibilityRemediations(): AccessibilityRemediation[] {
  return accessibilityRemediations;
}

export function getAccessibilitySummary() {
  return {
    totalChecks: accessibilityChecks.length,
    passChecks: accessibilityChecks.filter((item) => item.status === "pass").length,
    watchChecks: accessibilityChecks.filter((item) => item.status === "watch").length,
    failChecks: accessibilityChecks.filter((item) => item.status === "fail").length,
    remediations: accessibilityRemediations.length,
    activeRemediations: accessibilityRemediations.filter((item) => item.status === "active").length,
    plannedRemediations: accessibilityRemediations.filter((item) => item.status === "planned").length
  };
}
