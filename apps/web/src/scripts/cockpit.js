// Renders the SEIS cockpit panels from the resolved data source
// (src/data/cockpit-source.js): the static bundle today, a live Convex source
// after provisioning. Both return one status object with the same shapes.
(function () {
  "use strict";

  const source = window.SEIS_COCKPIT_SOURCE || null;
  const resolveStatus = () =>
    source ? source.resolve() : window.SEIS_COCKPIT_STATUS || null;

  const el = (tag, attrs = {}, children = []) => {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === "text") node.textContent = value;
      else node.setAttribute(key, value);
    }
    for (const child of children) node.append(child);
    return node;
  };

  const badge = (text, tone = "") => el("span", { class: `badge ${tone}`.trim(), text });

  const statusTable = (rows) =>
    el(
      "table",
      { class: "status-table" },
      rows.map(([label, value]) =>
        el("tr", {}, [
          el("th", { scope: "row", text: label }),
          el("td", {}, [value instanceof Node ? value : document.createTextNode(String(value))]),
        ]),
      ),
    );

  const panel = (name) => document.querySelector(`[data-panel="${name}"]`);

  const MUTABLE_PANELS = [
    "repository",
    "plugins",
    "build",
    "workspace",
    "security",
    "research",
    "roadmap",
  ];
  const clearSurfaces = () => {
    document.getElementById("topbar-stats").replaceChildren();
    document.getElementById("gate-list").replaceChildren();
    for (const name of MUTABLE_PANELS) {
      const node = panel(name);
      if (node) node.replaceChildren();
    }
  };

  function render(status) {
    if (!status) {
      document.getElementById("topbar-stats").textContent =
        "cockpit-status bundle missing — run npm run automation:cockpit-status";
      return;
    }
    clearSurfaces();

  // Top status bar
  const topbar = document.getElementById("topbar-stats");
  topbar.append(
    el("span", {}, [
      document.createTextNode("repo "),
      el("strong", { text: status.branch.canonicalRepository }),
    ]),
    el("span", {}, [
      document.createTextNode("branch "),
      el("strong", { text: status.branch.defaultBranch }),
      document.createTextNode(` ↔ ${status.branch.mirrorBranch}`),
    ]),
    el("span", {}, [
      document.createTextNode("plugins "),
      el("strong", { class: "ok", text: String(status.plugins.installedEnabled) }),
      document.createTextNode(` active / ${status.plugins.notInstalled} missing`),
    ]),
    el("span", {}, [
      document.createTextNode("sources "),
      el("strong", { text: String(status.safety.consolidatedSources.length) }),
      document.createTextNode(" consolidated"),
    ]),
    el("span", {}, [
      document.createTextNode("source "),
      el("strong", { text: source ? source.mode : "static" }),
    ]),
  );

  // Repository panel
  panel("repository").append(
    statusTable([
      ["Canonical", el("span", { class: "mono", text: status.branch.canonicalRepository })],
      ["Default branch", el("span", { class: "mono", text: status.branch.defaultBranch })],
      ["Mirror", el("span", { class: "mono", text: status.branch.mirrorBranch })],
      ["Branches", String(status.branch.seisBranchCount)],
      ["Source refs", `${status.safety.fullHistoryBranches} full-history sources/<repo>/<branch>`],
    ]),
    el("p", { class: "note", text: status.branch.decision }),
  );

  // Plugins panel
  const lanes = el(
    "ul",
    { class: "lane-list" },
    status.plugins.lanes.map((lane) =>
      el("li", {}, [
        el("span", { text: lane.label }),
        el("span", { class: "count", text: lane.missing ? `${lane.active} (+${lane.missing} missing)` : String(lane.active) }),
      ]),
    ),
  );
  panel("plugins").append(lanes, el("p", { class: "note", text: status.plugins.policy }));

  // Build workbench panel
  const moduleTone = (state) =>
    state === "first_milestone_shipped" ? "ok" : state === "active" ? "accent" : "";
  panel("build").append(
    statusTable(
      status.workbench.buildOrder.map((id, index) => {
        const moduleInfo = status.workbench.modules.find((m) => m.id === id);
        return [
          `${index + 1}. ${id.replace(/_/g, " ")}`,
          el("span", {}, [
            badge(moduleInfo ? moduleInfo.status.replace(/_/g, " ") : "unknown", moduleTone(moduleInfo?.status)),
            document.createTextNode(moduleInfo ? ` ${moduleInfo.path}` : ""),
          ]),
        ];
      }),
    ),
    el("p", { class: "note", text: status.workbench.goal }),
  );

  // Workspace panel
  panel("workspace").append(
    el(
      "ul",
      { class: "link-list" },
      [
        ...status.workspace.drive.map((doc) =>
          el("li", {}, [el("a", { href: doc.url, rel: "noopener", target: "_blank", text: doc.title })]),
        ),
        el("li", {}, [
          el("a", {
            href: status.workspace.calendar.url,
            rel: "noopener",
            target: "_blank",
            text: `${status.workspace.calendar.title} (${status.workspace.calendar.recurrence})`,
          }),
        ]),
      ],
    ),
  );

  // Source safety panel
  const zipGb = (status.safety.zipImport.sizeBytes / 1024 ** 3).toFixed(2);
  panel("security").append(
    statusTable([
      [
        "Consolidated",
        el("span", { class: "mono", text: status.safety.consolidatedSources.join(", ") }),
      ],
      ["History refs", `${status.safety.fullHistoryBranches} branches preserved in SEIS`],
      [
        "Zip import",
        el("span", {}, [
          badge(status.safety.zipImport.status.replace(/_/g, " "), "warn"),
          document.createTextNode(
            ` ${zipGb} GB, ${status.safety.zipImport.entryCount.toLocaleString("en-US")} entries`,
          ),
        ]),
      ],
      ["Deletion gate", el("span", {}, [badge("open", "ok")])],
    ]),
    el("p", { class: "note", text: status.safety.deletionGate }),
  );

  // Research panel
  panel("research").append(
    statusTable([
      ["Lane", el("span", { class: "mono", text: status.research.lane })],
      ["Notes", String(status.research.notes.length)],
    ]),
    el(
      "ul",
      { class: "link-list" },
      status.research.notes.map((note) =>
        el("li", {}, [el("span", { class: "mono", text: note })]),
      ),
    ),
    el("p", {
      class: "note",
      text: "Source-backed notes only; decision-affecting notes link a record in docs/decisions.",
    }),
  );

  // Roadmap panel
  const roadmapTone = { shipped: "ok", decided: "ok", active: "accent", in_progress: "accent", scaffolded: "warn" };
  panel("roadmap").append(
    el("p", { class: "note", text: `Active sprint: ${status.roadmap.sprint}` }),
    el(
      "ul",
      { class: "lane-list" },
      status.roadmap.lanes.map((lane) =>
        el("li", {}, [
          el("span", {}, [
            el("strong", { text: lane.title }),
            document.createTextNode(` — next: ${lane.next}`),
          ]),
          badge(lane.status.replace(/_/g, " "), roadmapTone[lane.status] ?? ""),
        ]),
      ),
    ),
    statusTable([
      ["P1 open", String(status.roadmap.tiers.p1)],
      ["P2 open", String(status.roadmap.tiers.p2)],
      ["Done", String(status.roadmap.tiers.done)],
    ]),
  );

  // Footer gates
  const gateTone = { enforced: "accent", open: "ok", blocked: "warn" };
  document.getElementById("gate-list").append(
    ...status.gates.map((gate) =>
      el("li", {}, [
        badge(gate.state, gateTone[gate.state] ?? ""),
        document.createTextNode(` ${gate.label}`),
      ]),
    ),
  );
  }

  // Initial paint, plus a refresh hook a live provider can call after it
  // supplies same-shaped data via SEIS_COCKPIT_SOURCE.provideLive().
  window.SEIS_COCKPIT_REFRESH = () => render(resolveStatus());
  render(resolveStatus());

  // Scroll-spy: highlight the nav link for the panel currently in view.
  const navLinks = new Map(
    [...document.querySelectorAll(".cockpit-nav a")].map((link) => [
      link.getAttribute("href").slice(1),
      link,
    ]),
  );
  if ("IntersectionObserver" in window && navLinks.size) {
    const setActive = (id) => {
      for (const [linkId, link] of navLinks) {
        link.classList.toggle("active", linkId === id);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-104px 0px -55% 0px", threshold: [0.1, 0.5, 1] },
    );
    for (const id of navLinks.keys()) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
  }
})();
