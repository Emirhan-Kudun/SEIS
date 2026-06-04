const state = {
  apps: [],
  manifest: null,
  governance: null,
  observability: null,
  cinematicProgram: null,
  archiveInsights: null,
  zipPromotionLab: null
};

const $ = (selector) => document.querySelector(selector);

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

function setupAmbientCanvas() {
  const canvas = $("#ambient-canvas");
  const context = canvas?.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canvas || !context || reduceMotion) return;

  const lowPower =
    window.innerWidth < 760 ||
    navigator.hardwareConcurrency <= 4 ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);
  const particleCount = lowPower ? 24 : 54;
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random(),
    y: Math.random(),
    z: Math.random() * 0.8 + 0.2,
    drift: Math.random() * 0.0006 + 0.0002
  }));

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.6);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function frame() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    context.clearRect(0, 0, width, height);

    for (const particle of particles) {
      particle.x = (particle.x + particle.drift * particle.z) % 1;
      const x = particle.x * width;
      const y = particle.y * height;
      const radius = 1.2 + particle.z * 2.4;

      context.beginPath();
      context.fillStyle = `rgba(134, 209, 200, ${0.12 + particle.z * 0.2})`;
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    for (let index = 0; index < particles.length - 1; index += 1) {
      const a = particles[index];
      const b = particles[index + 1];
      const ax = a.x * width;
      const ay = a.y * height;
      const bx = b.x * width;
      const by = b.y * height;
      const distance = Math.hypot(ax - bx, ay - by);

      if (distance < 220) {
        context.beginPath();
        context.strokeStyle = `rgba(216, 182, 108, ${0.12 * (1 - distance / 220)})`;
        context.lineWidth = 1;
        context.moveTo(ax, ay);
        context.lineTo(bx, by);
        context.stroke();
      }
    }

    window.requestAnimationFrame(frame);
  }

  resize();
  frame();
  window.addEventListener("resize", resize, { passive: true });
}

async function boot() {
  setupAmbientCanvas();
  setupContactForm();

  const [apps, manifest, governance, observability, cinematicProgram, archiveInsights, zipPromotionLab] = await Promise.all([
    fetchJson("/api/apps"),
    fetchJson("/api/manifest"),
    fetchJson("/api/governance"),
    fetchJson("/api/observability"),
    fetchJson("/api/cinematic-program"),
    fetchJson("/api/archive-insights"),
    fetchJson("/api/zip-promotion-lab")
  ]);

  state.apps = apps.apps;
  state.manifest = manifest;
  state.governance = governance;
  state.observability = observability;
  state.cinematicProgram = cinematicProgram;
  state.archiveInsights = archiveInsights;
  state.zipPromotionLab = zipPromotionLab;

  renderManifest();
  renderApps();
  renderSignals();
  renderCinematicProgram();
  renderArchiveInsights();
  renderZipPromotionLab();
  renderGovernance();
}

boot().catch((error) => {
  $("#system-mode").textContent = "API unavailable";
  $("#system-stack").textContent = error.message;
});
