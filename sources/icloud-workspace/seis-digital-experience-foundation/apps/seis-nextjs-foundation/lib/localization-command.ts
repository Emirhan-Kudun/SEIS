export type LocaleCoverage = {
  id: string;
  locale: "tr" | "en" | "fr" | "it" | "de";
  section: string;
  coverage: string;
  status: "complete" | "partial" | "missing";
  note: string;
};

export type LocalizationTask = {
  id: string;
  title: string;
  priority: "p1" | "p2" | "p3";
  owner: string;
  status: "planned" | "active" | "done";
};

const localeCoverage: LocaleCoverage[] = [
  {
    id: "loc-home-core",
    locale: "tr",
    section: "Homepage core narrative",
    coverage: "100%",
    status: "complete",
    note: "Primary narrative and CTA flow are localized."
  },
  {
    id: "loc-control-ops-en",
    locale: "en",
    section: "Control + Ops command surfaces",
    coverage: "100%",
    status: "complete",
    note: "Operational labels are canonical in EN."
  },
  {
    id: "loc-command-fr",
    locale: "fr",
    section: "New command lab modules",
    coverage: "72%",
    status: "partial",
    note: "Latest v5-v6 module labels still require localization pass."
  },
  {
    id: "loc-command-it",
    locale: "it",
    section: "New command lab modules",
    coverage: "69%",
    status: "partial",
    note: "Command-panel microcopy parity is in progress."
  },
  {
    id: "loc-command-de",
    locale: "de",
    section: "New command lab modules",
    coverage: "64%",
    status: "missing",
    note: "Deep operational microcopy has not been fully ported yet."
  }
];

const localizationTasks: LocalizationTask[] = [
  {
    id: "loc-task-command-v6",
    title: "Complete localization for v6 command modules",
    priority: "p1",
    owner: "content-ops",
    status: "active"
  },
  {
    id: "loc-task-metadata-alts",
    title: "Add localized metadata variants for lab routes",
    priority: "p2",
    owner: "seo-ops",
    status: "planned"
  },
  {
    id: "loc-task-copy-review",
    title: "Run UX copy clarity review for TR/FR/IT/DE",
    priority: "p2",
    owner: "ux-writing",
    status: "planned"
  },
  {
    id: "loc-task-regression-suite",
    title: "Automate locale regression check for critical routes",
    priority: "p3",
    owner: "qa",
    status: "planned"
  }
];

export function getLocaleCoverage(): LocaleCoverage[] {
  return localeCoverage;
}

export function getLocalizationTasks(): LocalizationTask[] {
  return localizationTasks;
}

export function getLocalizationSummary() {
  return {
    totalCoverageRows: localeCoverage.length,
    completeRows: localeCoverage.filter((item) => item.status === "complete").length,
    partialRows: localeCoverage.filter((item) => item.status === "partial").length,
    missingRows: localeCoverage.filter((item) => item.status === "missing").length,
    tasks: localizationTasks.length,
    activeTasks: localizationTasks.filter((item) => item.status === "active").length,
    plannedTasks: localizationTasks.filter((item) => item.status === "planned").length
  };
}
