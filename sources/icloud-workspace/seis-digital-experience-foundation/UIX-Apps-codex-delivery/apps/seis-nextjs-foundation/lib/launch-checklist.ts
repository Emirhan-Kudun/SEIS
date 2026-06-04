export type LaunchChecklistItem = {
  id: string;
  title: string;
  owner: string;
  status: "pending" | "in-progress" | "done";
  detail: string;
};

export type LaunchChecklistGroup = {
  id: string;
  title: string;
  items: LaunchChecklistItem[];
};

const launchChecklist: LaunchChecklistGroup[] = [
  {
    id: "group-ui",
    title: "UI and Experience",
    items: [
      {
        id: "ui-mobile-nav",
        title: "Mobile navigation verification",
        owner: "frontend",
        status: "in-progress",
        detail: "Validate overlays, focus traps, and tap targets."
      },
      {
        id: "ui-motion-fallback",
        title: "Reduced-motion fallback audit",
        owner: "frontend",
        status: "pending",
        detail: "Confirm decorative motion has accessible alternatives."
      },
      {
        id: "ui-typography-scale",
        title: "Typography scale consistency",
        owner: "design",
        status: "in-progress",
        detail: "Review hierarchy and legibility across breakpoints."
      }
    ]
  },
  {
    id: "group-content",
    title: "Content and Localization",
    items: [
      {
        id: "content-locale-parity",
        title: "TR/EN/FR/IT/DE parity check",
        owner: "content",
        status: "in-progress",
        detail: "Ensure no missing keys in active routes."
      },
      {
        id: "content-cta-clarity",
        title: "CTA clarity and trust signals",
        owner: "product",
        status: "pending",
        detail: "Refine conversion copy and supporting evidence blocks."
      },
      {
        id: "content-feed-validation",
        title: "Insights feed validation",
        owner: "content",
        status: "done",
        detail: "Verify RSS and JSON feed formats are consistent."
      }
    ]
  },
  {
    id: "group-ops",
    title: "Operations and Risk",
    items: [
      {
        id: "ops-release-readiness",
        title: "Release readiness gate review",
        owner: "operations",
        status: "in-progress",
        detail: "Review blockers and warnings before merge."
      },
      {
        id: "ops-quality-scorecard",
        title: "Quality scorecard review",
        owner: "operations",
        status: "in-progress",
        detail: "Confirm no critical cards remain unresolved."
      },
      {
        id: "ops-risk-register",
        title: "Risk register confirmation",
        owner: "governance",
        status: "pending",
        detail: "Align mitigations and rollback plans to current delta."
      }
    ]
  },
  {
    id: "group-release",
    title: "Release and Rollback",
    items: [
      {
        id: "release-commit-isolation",
        title: "Commit isolation check",
        owner: "git",
        status: "done",
        detail: "Each commit should represent one primary purpose."
      },
      {
        id: "release-pr-summary",
        title: "PR risk summary and rollback notes",
        owner: "git",
        status: "pending",
        detail: "Include impact areas, known risks, and backout steps."
      },
      {
        id: "release-deploy-hold",
        title: "Deployment hold without approval",
        owner: "operations",
        status: "done",
        detail: "Keep deployment blocked until explicit approval."
      }
    ]
  }
];

export function getLaunchChecklist(): LaunchChecklistGroup[] {
  return launchChecklist;
}

export function getLaunchChecklistSummary() {
  const all = launchChecklist.flatMap((group) => group.items);
  return {
    groups: launchChecklist.length,
    total: all.length,
    done: all.filter((item) => item.status === "done").length,
    inProgress: all.filter((item) => item.status === "in-progress").length,
    pending: all.filter((item) => item.status === "pending").length
  };
}
