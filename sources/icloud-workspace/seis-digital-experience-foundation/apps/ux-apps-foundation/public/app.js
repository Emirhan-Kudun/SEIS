const state = {
  apps: [],
  manifest: null,
  governance: null,
  observability: null,
  cinematicProgram: null,
  archiveInsights: null,
  zipPromotionLab: null,
  decisionQueue: null,
  motionTokens: null,
  accessibilityAffordances: null,
  experienceScorecard: null,
  gapClosureRegister: null,
  developmentMode: null,
  weeklyUsageStewardship: null,
  motionIntensity: "heavy"
};

const $ = (selector) => document.querySelector(selector);
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let ambientAnimationFrame = 0;
let ambientResizeHandler = null;

function isCompactDevice() {
  return (
    window.innerWidth < 760 ||
    navigator.hardwareConcurrency <= 4 ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4)
  );
}

function readStoredMotionIntensity() {
  try {
    return window.localStorage.getItem("ux-motion-intensity");
  } catch (error) {
    return null;
  }
}

function writeStoredMotionIntensity(value) {
  try {
    window.localStorage.setItem("ux-motion-intensity", value);
  } catch (error) {
    // Storage can be unavailable in private or file-backed contexts.
  }
}

function getPreferredMotionIntensity() {
  if (motionPreference.matches) return "reduced";

  const stored = readStoredMotionIntensity();
  if (stored === "heavy" || stored === "balanced") {
    return stored;
  }

  return isCompactDevice() ? "balanced" : "heavy";
}

function applyMotionIntensity(value) {
  const intensity = motionPreference.matches ? "reduced" : value;
  state.motionIntensity = intensity;
  document.documentElement.dataset.motionIntensity = intensity;

  const button = $("#motion-intensity-toggle");
  const label = $("#motion-intensity-label");
  if (!button || !label) return;

  const heavy = intensity === "heavy";
  button.setAttribute("aria-pressed", heavy ? "true" : "false");
  label.textContent = intensity === "reduced" ? "Reduced" : heavy ? "Heavy" : "Balanced";
}

async function fetchJson(path) {
  const response = await fetch(path, { headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`${path} failed with ${response.status}`);
  }
  return response.json();
}

function text(value, fallback = "") {
  return value === undefined || value === null ? fallback : String(value);
}

function classToken(value) {
  return text(value, "unknown").toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

function createElement(tagName, options = {}, children = []) {
  const element = document.createElement(tagName);

  if (options.className) {
    element.className = options.className;
  }
  if (options.text !== undefined) {
    element.textContent = text(options.text);
  }
  if (options.tabIndex !== undefined) {
    element.tabIndex = options.tabIndex;
  }
  for (const [name, value] of Object.entries(options.attributes || {})) {
    element.setAttribute(name, text(value));
  }
  for (const child of children) {
    element.append(child);
  }

  return element;
}

function replaceContent(selector, children) {
  const target = $(selector);
  if (!target) return;
  target.replaceChildren(...children);
}

function createBadge(value) {
  return createElement("span", { className: "badge", text: value });
}

function createRichListItem(label, value) {
  return createElement("li", {}, [
    createElement("strong", { text: label }),
    createElement("span", { text: value })
  ]);
}

function createCommandListItem(command) {
  return createElement("li", { className: "command-item" }, [
    createElement("div", {}, [
      createElement("strong", { text: command.command }),
      createElement("span", { text: `${command.label}: ${command.purpose}` })
    ]),
    createElement("button", {
      className: "copy-command-button",
      text: "Copy",
      attributes: {
        type: "button",
        "data-command": command.command,
        "aria-label": `Copy command ${command.command}`
      }
    })
  ]);
}

function createCommandButton(command, label = "Copy") {
  return createElement("button", {
    className: "copy-command-button",
    text: label,
    attributes: {
      type: "button",
      "data-command": command,
      "aria-label": `Copy command ${command}`
    }
  });
}

function createCommandActions(commands = []) {
  const filteredCommands = commands.filter(Boolean);

  return createElement(
    "div",
    { className: "command-actions" },
    [
      ...filteredCommands.map((command, index) =>
        createElement("div", { className: "command-action" }, [
          createElement("span", { text: index === 0 ? "Primary" : `Step ${index + 1}` }),
          createCommandButton(command, index === 0 ? "Copy command" : "Copy step")
        ])
      ),
      filteredCommands.length > 1
        ? createElement("div", { className: "command-action command-action-sequence" }, [
            createElement("span", { text: "Sequence" }),
            createCommandButton(filteredCommands.join("\n"), "Copy all")
          ])
        : createElement("span")
    ]
  );
}

function createStatItem(label, value) {
  return createElement("div", {}, [
    createElement("span", { text: label }),
    createElement("strong", { text: value })
  ]);
}

function createDefinitionItem(term, description) {
  return createElement("div", {}, [
    createElement("dt", { text: term }),
    createElement("dd", { text: description })
  ]);
}

function renderManifest() {
  if (!state.manifest) return;

  $("#system-mode").textContent = state.manifest.mode;
  $("#system-stack").textContent = `${state.manifest.stack.runtime} / ${state.manifest.stack.frontend}`;

  replaceContent(
    "#principles-grid",
    (state.manifest.principles || []).map((principle, index) =>
      createElement("article", { className: "principle" }, [
        createElement("span", { text: `0${index + 1}` }),
        createElement("h3", { text: principle })
      ])
    )
  );
}

function renderApps() {
  replaceContent(
    "#app-grid",
    state.apps.map((app) =>
      createElement("article", { className: "app-card", tabIndex: 0 }, [
        createElement("div", {}, [
          createElement("div", { className: "status-row" }, [
            createBadge(app.category),
            createBadge(app.discipline || "UX System"),
            createBadge(`pressure: ${text(app.pressure)}`)
          ]),
          createElement("h3", { text: app.name }),
          createElement("p", { text: app.summary })
        ]),
        createElement("div", {}, [
          createElement("span", { text: app.status }),
          createElement(
            "ul",
            {},
            (app.capabilities || []).map((item) => createElement("li", { text: item }))
          )
        ])
      ])
    )
  );
}

function renderSignals() {
  const signals = state.observability?.signals || {};
  const entries = [
    ["Apps", signals.appCount],
    ["Runtime deps", signals.runtimeDependencies],
    ["Branches", signals.branchFamilies],
    ["Cinematic lanes", signals.cinematicLanes],
    ["Archive signals", signals.archiveSignals],
    ["Promotion lanes", signals.promotionLanes],
    ["Decisions", signals.decisionQueue],
    ["Ready decisions", signals.readyDecisions],
    ["Motion tokens", signals.motionTokens],
    ["Affordances", signals.accessibilityAffordances],
    ["Experience score", signals.experienceScore],
    ["Dev gate", signals.developmentGate],
    ["Dev ahead", signals.developmentAhead],
    ["Dev dirty", signals.developmentDirty],
    [
      "Dev checked",
      signals.developmentCheckedAt
        ? new Date(signals.developmentCheckedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "pending"
    ],
    ["Usage cadence", signals.weeklyUsageCadence],
    ["Preferred spend", signals.weeklyPreferredSpend],
    ["Blocked spend", signals.weeklyBlockedSpend],
    ["Next plan", signals.weeklyNextTheme],
    ["Gaps", signals.gapClosureCount],
    ["Ready gaps", signals.gapClosureReady],
    ["Watch gaps", signals.gapClosureWatch],
    ["Blocked gaps", signals.gapClosureBlocked],
    ["Motion", signals.motionPressure],
    ["Telemetry", signals.telemetryMode]
  ];

  replaceContent(
    "#signal-grid",
    entries.map(([label, value]) => createDefinitionItem(label, value ?? "pending"))
  );
}

function renderCinematicProgram() {
  if (!state.cinematicProgram) return;

  replaceContent(
    "#cinematic-program-grid",
    (state.cinematicProgram.productLanes || []).map((lane) =>
      createElement("article", { className: "program-card" }, [
        createElement("span", { text: lane.id }),
        createElement("h4", { text: lane.title }),
        createElement("p", { text: lane.summary })
      ])
    )
  );

  replaceContent(
    "#cinematic-budget-list",
    (state.cinematicProgram.qualityPresets || []).map((preset) => createRichListItem(preset.label, preset.depth))
  );

  replaceContent(
    "#cinematic-source-list",
    (state.cinematicProgram.sourceSignals || []).map((signal) => createRichListItem(signal.id, signal.usefulIdea))
  );

  replaceContent(
    "#cinematic-motion-list",
    (state.cinematicProgram.motionDepths || []).map((depth) =>
      createRichListItem(depth.label, (depth.allowed || []).join(", "))
    )
  );
}

function renderArchiveInsights() {
  if (!state.archiveInsights) return;

  const excludedCount = state.archiveInsights.noisePolicy?.excluded?.length || 0;
  const summaryItems = [
    ["Entries", state.archiveInsights.entryCount.toLocaleString("en-US")],
    ["Promoted signals", state.archiveInsights.conversionMap.length],
    ["Feature candidates", state.archiveInsights.nextFeatures.length],
    ["Filtered noise", excludedCount]
  ];

  replaceContent("#archive-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  replaceContent(
    "#archive-map",
    (state.archiveInsights.conversionMap || []).map((item) =>
      createElement("article", { className: "archive-card" }, [
        createElement("div", { className: "archive-card-header" }, [
          createElement("span", { text: item.status }),
          createElement("strong", { text: item.feature })
        ]),
        createElement("p", { text: item.signal }),
        createElement("dl", {}, [
          createDefinitionItem("Source", item.source),
          createDefinitionItem("Guardrail", item.guardrail)
        ])
      ])
    )
  );

  replaceContent(
    "#archive-next-list",
    (state.archiveInsights.nextFeatures || []).map((feature) => createRichListItem(feature.title, feature.summary))
  );

  replaceContent(
    "#archive-score-list",
    (state.archiveInsights.scorecard?.reviewAreas || []).map((area) => createElement("li", { text: area }))
  );
}

function renderZipPromotionLab() {
  if (!state.zipPromotionLab) return;

  const summaryItems = [
    ["Lanes", state.zipPromotionLab.summary.lanes],
    ["Ready", state.zipPromotionLab.summary.readyCandidates],
    ["Deferred", state.zipPromotionLab.summary.deferredCandidates],
    ["Blocked", state.zipPromotionLab.summary.blockedCandidates]
  ];

  replaceContent("#promotion-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  replaceContent(
    "#promotion-board",
    (state.zipPromotionLab.lanes || []).map((lane) =>
      createElement("article", { className: `promotion-card status-${classToken(lane.status)}` }, [
        createElement("div", {}, [
          createElement("div", { className: "promotion-meta" }, [
            createElement("span", { text: lane.status }),
            createElement("span", { text: `risk: ${text(lane.risk)}` })
          ]),
          createElement("h3", { text: lane.label }),
          createElement("p", { text: lane.value })
        ]),
        createElement("dl", {}, [
          createDefinitionItem("Source", lane.source),
          createDefinitionItem("Import strategy", lane.importStrategy),
          createDefinitionItem("Next action", lane.nextAction)
        ])
      ])
    )
  );

  replaceContent(
    "#promotion-readiness-list",
    (state.zipPromotionLab.readinessModel || []).map((item) => createRichListItem(item.label, item.definition))
  );

  replaceContent(
    "#promotion-blocked-list",
    (state.zipPromotionLab.blockedImports || []).map((item) => createElement("li", { text: item }))
  );
}

function renderDecisionQueue() {
  if (!state.decisionQueue) return;

  const summary = state.decisionQueue.summary || {};
  const summaryItems = [
    ["Decisions", summary.decisions],
    ["Ready", summary.ready],
    ["Needs evidence", summary.needsEvidence],
    ["Blocked", summary.blocked]
  ];

  replaceContent("#decision-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  replaceContent(
    "#decision-board",
    (state.decisionQueue.decisions || []).map((decision) =>
      createElement("article", { className: `decision-card status-${classToken(decision.status)}` }, [
        createElement("div", {}, [
          createElement("div", { className: "decision-meta" }, [
            createElement("span", { text: decision.status }),
            createElement("span", { text: `impact: ${text(decision.impact)}` }),
            createElement("span", { text: `effort: ${text(decision.effort)}` })
          ]),
          createElement("h3", { text: decision.title }),
          createElement("p", { text: decision.evidence })
        ]),
        createElement("dl", {}, [
          createDefinitionItem("Owner", decision.owner),
          createDefinitionItem("Next action", decision.nextAction),
          createDefinitionItem("Rollback", decision.rollback)
        ])
      ])
    )
  );

  replaceContent(
    "#decision-principles-list",
    (state.decisionQueue.principles || []).map((principle) => createElement("li", { text: principle }))
  );
}

function renderMotionTokens() {
  if (!state.motionTokens) return;

  const summary = state.motionTokens.summary || {};
  const summaryItems = [
    ["Tokens", summary.tokens],
    ["Default", summary.defaultPreset],
    ["Reduced motion", summary.reducedMotion],
    ["Max continuous", `${summary.maxContinuousAnimationMs}ms`]
  ];

  replaceContent("#motion-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  replaceContent(
    "#motion-token-grid",
    (state.motionTokens.tokens || []).map((token) =>
      createElement("article", { className: `motion-token-card pressure-${classToken(token.pressure)}` }, [
        createElement("div", {}, [
          createElement("div", { className: "motion-token-meta" }, [
            createElement("span", { text: token.pressure }),
            createElement("span", { text: `${text(token.durationMs)}ms` })
          ]),
          createElement("h3", { text: token.label }),
          createElement("p", { text: token.use })
        ]),
        createElement("dl", {}, [
          createDefinitionItem("Easing", token.easing),
          createDefinitionItem("Fallback", token.fallback)
        ])
      ])
    )
  );

  replaceContent(
    "#motion-rules-list",
    (state.motionTokens.rules || []).map((rule) => createElement("li", { text: rule }))
  );
}

function renderAccessibilityAffordances() {
  if (!state.accessibilityAffordances) return;

  const summary = state.accessibilityAffordances.summary || {};
  const summaryItems = [
    ["Affordances", summary.affordances],
    ["Mobile ready", summary.mobileReady],
    ["Reduced motion", summary.reducedMotionAware],
    ["Blocked patterns", summary.blockedPatterns]
  ];

  replaceContent("#accessibility-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  replaceContent(
    "#accessibility-grid",
    (state.accessibilityAffordances.affordances || []).map((item) =>
      createElement("article", { className: `accessibility-card status-${classToken(item.status)}` }, [
        createElement("div", {}, [
          createElement("div", { className: "accessibility-meta" }, [
            createElement("span", { text: item.status }),
            createElement("span", { text: item.surface }),
            createElement("span", { text: item.mobileReady ? "mobile-ready" : "desktop-first" })
          ]),
          createElement("h3", { text: item.label }),
          createElement("p", { text: item.evidence })
        ]),
        createElement("dl", {}, [
          createDefinitionItem("Reduced motion", item.reducedMotionAware ? "aware" : "needs fallback"),
          createDefinitionItem("Fallback", item.fallback)
        ])
      ])
    )
  );

  replaceContent(
    "#accessibility-rules-list",
    (state.accessibilityAffordances.rules || []).map((rule) => createElement("li", { text: rule }))
  );

  replaceContent(
    "#accessibility-blocked-list",
    (state.accessibilityAffordances.blockedPatterns || []).map((pattern) => createElement("li", { text: pattern }))
  );
}

function renderExperienceScorecard() {
  if (!state.experienceScorecard) return;

  const summary = state.experienceScorecard.summary || {};
  const summaryItems = [
    ["Score", summary.score],
    ["Release floor", summary.minimumReleaseScore],
    ["Dimensions", summary.dimensions],
    ["Watch items", summary.watchItems]
  ];

  replaceContent("#experience-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  replaceContent(
    "#experience-grid",
    (state.experienceScorecard.dimensions || []).map((dimension) =>
      createElement("article", { className: `experience-card status-${classToken(dimension.status)}` }, [
        createElement("div", {}, [
          createElement("div", { className: "experience-meta" }, [
            createElement("span", { text: dimension.status }),
            createElement("span", { text: `score ${text(dimension.score)}` })
          ]),
          createElement("h3", { text: dimension.label }),
          createElement("p", { text: dimension.signal })
        ]),
        createElement("dl", {}, [
          createDefinitionItem("Next action", dimension.nextAction)
        ])
      ])
    )
  );

  replaceContent(
    "#experience-watch-list",
    (state.experienceScorecard.watchItems || []).map((item) => createElement("li", { text: item }))
  );

  const releaseRule = $("#experience-release-rule");
  if (releaseRule) {
    releaseRule.textContent = text(state.experienceScorecard.releaseRule);
  }
}

function renderGapClosureRegister() {
  if (!state.gapClosureRegister) return;

  const summary = state.gapClosureRegister.summary || {};
  const summaryItems = [
    ["Gaps", summary.gaps],
    ["Ready", summary.ready],
    ["Watch", summary.watch],
    ["Blocked", summary.blocked],
    ["Mode", summary.mode]
  ];

  replaceContent("#gap-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  replaceContent(
    "#gap-board",
    (state.gapClosureRegister.gaps || []).map((gap) =>
      createElement("article", { className: `gap-card status-${classToken(gap.status)}` }, [
        createElement("div", {}, [
          createElement("div", { className: "gap-meta" }, [
            createElement("span", { text: gap.status }),
            createElement("span", { text: gap.priority }),
            createElement("span", { text: gap.surface })
          ]),
          createElement("h3", { text: gap.label }),
          createElement("p", { text: gap.impact })
        ]),
        createElement("dl", {}, [
          createDefinitionItem("Next action", gap.nextAction),
          createDefinitionItem("Closure metric", gap.closureMetric),
          createDefinitionItem("Quality commands", (gap.qualityCommands || []).join(" + ")),
          createDefinitionItem("Rollback", gap.rollback)
        ])
      ])
    )
  );

  replaceContent(
    "#gap-rules-list",
    (state.gapClosureRegister.rules || []).map((rule) => createElement("li", { text: rule }))
  );
}

function renderDevelopmentMode() {
  if (!state.developmentMode) return;

  const summary = state.developmentMode.summary || {};
  const runtime = state.developmentMode.runtime;
  const gate = runtime?.gate;
  const summaryItems = [
    ["Mode", summary.mode],
    ["Workspace", summary.workspace],
    ["Branch", runtime?.branch || summary.branch],
    ["HEAD", runtime?.localHead || "pending"],
    ["Origin", runtime?.originHead || "pending"],
    ["Ahead", runtime?.ahead ?? "pending"],
    ["Dirty", runtime?.dirty ? "yes" : "no"],
    ["Changes", runtime?.changes?.total ?? "pending"],
    ["Gate", gate?.state || "pending"],
    ["Next", gate?.command || "pending"],
    ["Checked", runtime?.checkedAt ? new Date(runtime.checkedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "pending"],
    ["Power", summary.powerProfile],
    ["Server", summary.serverTarget]
  ];

  replaceContent("#development-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  const dynamicChecks = gate
    ? [
        {
          label: "Publish gate",
          status: gate.state,
          detail: `${gate.reason} ${gate.nextAction}`,
          commands: [gate.command, ...(gate.secondaryCommands || [])]
        }
      ]
    : [];
  const developmentChecks = [...dynamicChecks, ...(state.developmentMode.checks || [])];

  replaceContent(
    "#development-checks",
    developmentChecks.map((check) =>
      createElement("article", { className: `development-card status-${classToken(check.status)}` }, [
        createElement("div", { className: "development-meta" }, [
          createElement("span", { text: check.status })
        ]),
        createElement("h3", { text: check.label }),
        createElement("p", { text: check.detail }),
        check.commands ? createCommandActions(check.commands) : createElement("span")
      ])
    )
  );

  if (runtime) {
    const changes = runtime.changes || { tracked: 0, untracked: 0 };
    const runtimeGate = runtime.gate || {};
    const checkedAt = runtime.checkedAt ? new Date(runtime.checkedAt).toLocaleString() : "unknown time";
    $("#development-copy-status").textContent =
      `Checked ${checkedAt} / HEAD ${runtime.localHead} ${runtime.localSubject || ""} / origin ${runtime.originHead} ${runtime.originSubject || ""} / ${runtime.publishState} / tracked ${changes.tracked} / untracked ${changes.untracked} / ${runtimeGate.reason || "Gate pending."} / ${runtimeGate.nextAction || ""}`;
  }

  replaceContent(
    "#development-command-list",
    (state.developmentMode.commands || []).map((command) => createCommandListItem(command))
  );

  replaceContent(
    "#development-rule-list",
    (state.developmentMode.rules || []).map((rule) => createElement("li", { text: rule }))
  );
}

function renderWeeklyUsageStewardship() {
  if (!state.weeklyUsageStewardship) return;

  const summary = state.weeklyUsageStewardship.summary || {};
  const summaryItems = [
    ["Cadence", summary.cadence],
    ["Mode", summary.mode],
    ["Power", summary.localPower],
    ["Next", summary.nextPlanningTheme],
    ["Commit style", summary.commitStyle]
  ];

  replaceContent("#stewardship-summary", summaryItems.map(([label, value]) => createStatItem(label, value)));

  replaceContent(
    "#stewardship-preferred-list",
    (state.weeklyUsageStewardship.preferredSpend || []).map((item) =>
      createElement("article", { className: "stewardship-card" }, [
        createElement("div", { className: "stewardship-meta" }, [
          createElement("span", { text: item.id })
        ]),
        createElement("h3", { text: item.label }),
        createElement("p", { text: item.value })
      ])
    )
  );

  replaceContent(
    "#stewardship-blocked-list",
    (state.weeklyUsageStewardship.blockedSpend || []).map((item) => createElement("li", { text: item }))
  );

  replaceContent(
    "#stewardship-rules-list",
    (state.weeklyUsageStewardship.rules || []).map((rule) => createElement("li", { text: rule }))
  );

  const stopCondition = $("#stewardship-stop-condition");
  if (stopCondition) {
    stopCondition.textContent = text(state.weeklyUsageStewardship.stopCondition);
  }
}

async function refreshDevelopmentMode() {
  const status = $("#development-copy-status");
  if (status) status.textContent = "Refreshing development status...";

  try {
    state.developmentMode = await fetchJson("/api/development-mode");
    renderDevelopmentMode();
  } catch (error) {
    if (status) status.textContent = "Development status refresh failed.";
  }
}

function renderGovernance() {
  if (!state.governance) return;

  replaceContent(
    "#branch-list",
    (state.governance.branchFamilies || []).map((branch) => createElement("li", { text: branch }))
  );

  replaceContent(
    "#gate-list",
    (state.governance.releaseGates || []).map((gate) => createElement("li", { text: gate }))
  );
}

function setupContactForm() {
  const form = $("#contact-form");
  const status = $("#form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending...";

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok) {
        status.textContent = result.errors?.join(" ") || "Request failed.";
        return;
      }

      form.reset();
      status.textContent = result.message;
    } catch (error) {
      status.textContent = "Network error. Try again when the local server is running.";
    }
  });
}

function setupDevelopmentCommandCopy() {
  const commandSurfaces = ["#development-command-list", "#development-checks"]
    .map((selector) => $(selector))
    .filter(Boolean);
  const status = $("#development-copy-status");

  if (commandSurfaces.length === 0 || !status) return;

  for (const surface of commandSurfaces) {
    surface.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-command]");
      if (!button) return;

      const command = button.getAttribute("data-command");
      if (!command) return;

      try {
        await navigator.clipboard.writeText(command);
        status.textContent = `Copied: ${command}`;
      } catch (error) {
        status.textContent = command;
      }
    });
  }
}

function setupDevelopmentRefresh() {
  const button = $("#development-refresh");
  if (!button) return;

  button.addEventListener("click", () => {
    refreshDevelopmentMode();
  });
}

function setupMotionIntensityControl() {
  applyMotionIntensity(getPreferredMotionIntensity());

  const button = $("#motion-intensity-toggle");
  if (button) {
    button.addEventListener("click", () => {
      const next = state.motionIntensity === "heavy" ? "balanced" : "heavy";
      writeStoredMotionIntensity(next);
      applyMotionIntensity(next);
      setupAmbientCanvas();
      updateCinematicParallax();
    });
  }

  const handleMotionPreferenceChange = () => {
    applyMotionIntensity(getPreferredMotionIntensity());
    setupAmbientCanvas();
    updateCinematicParallax();
  };

  if (motionPreference.addEventListener) {
    motionPreference.addEventListener("change", handleMotionPreferenceChange);
  } else if (motionPreference.addListener) {
    motionPreference.addListener(handleMotionPreferenceChange);
  }
}

function stopAmbientCanvas() {
  if (ambientAnimationFrame) {
    window.cancelAnimationFrame(ambientAnimationFrame);
    ambientAnimationFrame = 0;
  }

  if (ambientResizeHandler) {
    window.removeEventListener("resize", ambientResizeHandler);
    ambientResizeHandler = null;
  }
}

function setupAmbientCanvas() {
  stopAmbientCanvas();

  const canvas = $("#ambient-canvas");
  const context = canvas?.getContext("2d");

  if (!canvas || !context || motionPreference.matches) return;

  const lowPower = isCompactDevice();
  const heavy = state.motionIntensity === "heavy" && !lowPower;
  const particleCount = heavy ? 108 : lowPower ? 26 : 58;
  const connectionDepth = heavy ? 3 : 1;
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random(),
    y: Math.random(),
    z: Math.random() * 0.8 + 0.2,
    drift: Math.random() * (heavy ? 0.0012 : 0.0006) + 0.0002,
    phase: Math.random() * Math.PI * 2
  }));

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, heavy ? 1.8 : lowPower ? 1.25 : 1.6);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function frame(time = 0) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pulse = (Math.sin(time * 0.0012) + 1) / 2;

    context.clearRect(0, 0, width, height);

    if (heavy) {
      const glow = context.createLinearGradient(0, 0, width, height);
      glow.addColorStop(0, `rgba(134, 209, 200, ${0.04 + pulse * 0.04})`);
      glow.addColorStop(0.45, "rgba(245, 240, 232, 0.015)");
      glow.addColorStop(1, `rgba(216, 182, 108, ${0.035 + pulse * 0.035})`);
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    }

    for (const particle of particles) {
      particle.x = (particle.x + particle.drift * particle.z) % 1;
      const wave = heavy ? Math.sin(time * 0.001 + particle.phase) * 18 * particle.z : 0;
      const x = particle.x * width;
      const y = particle.y * height + wave;
      const radius = (heavy ? 1.8 : 1.2) + particle.z * (heavy ? 3.4 : 2.4);

      context.beginPath();
      context.fillStyle = `rgba(134, 209, 200, ${heavy ? 0.16 + particle.z * 0.26 : 0.12 + particle.z * 0.2})`;
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    for (let index = 0; index < particles.length - 1; index += 1) {
      for (let offset = 1; offset <= connectionDepth && index + offset < particles.length; offset += 1) {
        const a = particles[index];
        const b = particles[index + offset];
        const ax = a.x * width;
        const ay = a.y * height;
        const bx = b.x * width;
        const by = b.y * height;
        const distance = Math.hypot(ax - bx, ay - by);
        const range = heavy ? 280 : 220;

        if (distance >= range) continue;
        context.beginPath();
        context.strokeStyle = `rgba(216, 182, 108, ${(heavy ? 0.16 : 0.12) * (1 - distance / range)})`;
        context.lineWidth = 1;
        context.moveTo(ax, ay);
        context.lineTo(bx, by);
        context.stroke();
      }
    }

    ambientAnimationFrame = window.requestAnimationFrame(frame);
  }

  resize();
  ambientAnimationFrame = window.requestAnimationFrame(frame);
  ambientResizeHandler = resize;
  window.addEventListener("resize", ambientResizeHandler, { passive: true });
}

function setupSectionReveals() {
  const sections = Array.from(document.querySelectorAll("main > section"));
  sections.forEach((section, index) => {
    section.classList.add("section-reveal");
    section.style.setProperty("--reveal-index", String(index % 5));
    if (index === 0) {
      section.classList.add("is-visible");
    }
  });

  if (motionPreference.matches || !("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
  );

  sections.filter((section) => !section.classList.contains("is-visible")).forEach((section) => observer.observe(section));
}

function updateCinematicParallax() {
  const root = document.documentElement;
  const disabled = motionPreference.matches || state.motionIntensity === "reduced";
  const progress = disabled ? 0 : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.4);
  const multiplier = state.motionIntensity === "heavy" ? 1 : 0.45;

  root.style.setProperty("--hero-lift", `${-34 * progress * multiplier}px`);
  root.style.setProperty("--panel-drop", `${28 * progress * multiplier}px`);
  root.style.setProperty("--canvas-drift", `${18 * progress * multiplier}px`);
  root.style.setProperty("--stage-tilt", `${2.8 * progress * multiplier}deg`);
}

function setupCinematicParallax() {
  let ticking = false;
  const schedule = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateCinematicParallax();
      ticking = false;
    });
  };

  updateCinematicParallax();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

async function boot() {
  setupMotionIntensityControl();
  setupAmbientCanvas();
  setupSectionReveals();
  setupCinematicParallax();
  setupContactForm();
  setupDevelopmentCommandCopy();
  setupDevelopmentRefresh();

  const [
    apps,
    manifest,
    governance,
    observability,
    cinematicProgram,
    archiveInsights,
    zipPromotionLab,
    decisionQueue,
    motionTokens,
    accessibilityAffordances,
    experienceScorecard,
    gapClosureRegister,
    developmentMode,
    weeklyUsageStewardship
  ] = await Promise.all([
    fetchJson("/api/apps"),
    fetchJson("/api/manifest"),
    fetchJson("/api/governance"),
    fetchJson("/api/observability"),
    fetchJson("/api/cinematic-program"),
    fetchJson("/api/archive-insights"),
    fetchJson("/api/zip-promotion-lab"),
    fetchJson("/api/decision-queue"),
    fetchJson("/api/motion-tokens"),
    fetchJson("/api/accessibility-affordances"),
    fetchJson("/api/experience-scorecard"),
    fetchJson("/api/gap-closure-register"),
    fetchJson("/api/development-mode"),
    fetchJson("/api/weekly-usage-stewardship")
  ]);

  state.apps = apps.apps;
  state.manifest = manifest;
  state.governance = governance;
  state.observability = observability;
  state.cinematicProgram = cinematicProgram;
  state.archiveInsights = archiveInsights;
  state.zipPromotionLab = zipPromotionLab;
  state.decisionQueue = decisionQueue;
  state.motionTokens = motionTokens;
  state.accessibilityAffordances = accessibilityAffordances;
  state.experienceScorecard = experienceScorecard;
  state.gapClosureRegister = gapClosureRegister;
  state.developmentMode = developmentMode;
  state.weeklyUsageStewardship = weeklyUsageStewardship;

  renderManifest();
  renderApps();
  renderSignals();
  renderCinematicProgram();
  renderArchiveInsights();
  renderZipPromotionLab();
  renderDecisionQueue();
  renderMotionTokens();
  renderAccessibilityAffordances();
  renderExperienceScorecard();
  renderGapClosureRegister();
  renderDevelopmentMode();
  renderWeeklyUsageStewardship();
  renderGovernance();
}

boot().catch((error) => {
  $("#system-mode").textContent = "API unavailable";
  $("#system-stack").textContent = error.message;
});
