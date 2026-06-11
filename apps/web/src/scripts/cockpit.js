// Renders the SEIS cockpit panels from the generated status bundle in
// src/data/cockpit-status.js (window.SEIS_COCKPIT_STATUS).
(function () {
  "use strict";

  const status = window.SEIS_COCKPIT_STATUS;
  if (!status) {
    document.getElementById("topbar-stats").textContent =
      "cockpit-status bundle missing — run npm run automation:cockpit-status";
    return;
  }

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

  // Research panel (placeholder until docs/research lane exists)
  panel("research").append(
    el("p", {
      class: "note",
      text: "Research memory lane not started. Planned home: docs/research (build order step 7).",
    }),
  );

  // Footer gates
  document.getElementById("gate-list").append(
    ...status.gates.map((gate) =>
      el("li", {}, [
        badge(gate.state, gate.state === "enforced" ? "accent" : "ok"),
        document.createTextNode(` ${gate.label}`),
      ]),
    ),
  );
})();
