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

  // Wears the @seis/ui badge primitive; tones map to its modifiers.
  const badgeMod = { ok: "seis-badge--ok", warn: "seis-badge--warn", accent: "seis-badge--accent" };
  const badge = (text, tone = "") =>
    el("span", { class: badgeMod[tone] ? `seis-badge ${badgeMod[tone]}` : "seis-badge", text });

  const statusTable = (rows) =>
    el(
      "table",
      { class: "seis-table" },
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

  // Technology registry panel
  const maturityTone = (maturity) =>
    ["Stable", "LTS"].includes(maturity) ? "ok" : ["Beta", "Alpha"].includes(maturity) ? "accent" : "warn";
  panel("technology").append(
    el(
      "ul",
      { class: "lane-list" },
      status.technology.entries.map((entry) =>
        el("li", {}, [
          el("span", {}, [
            el("span", { class: "mono", text: entry.name }),
            document.createTextNode(` — ${entry.domain}`),
          ]),
          badge(entry.maturity, maturityTone(entry.maturity)),
        ]),
      ),
    ),
    el("p", {
      class: "note",
      text: `${status.technology.domainsCovered} of ${status.technology.domainsTotal} technology domains have real, registered entries. ${status.technology.scopeNote}`,
    }),
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

  // Search: client-side filter over the rows this page already rendered
  // above. Scoped honestly to "this cockpit's panels" — it does not search
  // anything outside this page (no live index, no cross-repo search).
  const searchInput = document.getElementById("cockpit-search-input");
  const searchCount = document.getElementById("cockpit-search-count");
  if (searchInput && searchCount) {
    const rowSelector = ".cockpit-grid .seis-table tr, .cockpit-grid .lane-list li, .cockpit-grid .link-list li";
    const applyFilter = () => {
      const query = searchInput.value.trim().toLowerCase();
      const rows = document.querySelectorAll(rowSelector);
      let total = 0;
      let visible = 0;
      for (const row of rows) {
        total += 1;
        const matches = !query || row.textContent.toLowerCase().includes(query);
        row.classList.toggle("search-hidden", !matches);
        if (matches) visible += 1;
      }
      searchCount.textContent = query ? `${visible} of ${total} rows match` : "";
    };
    searchInput.addEventListener("input", applyFilter);
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInput.focus();
        searchInput.select();
      } else if (event.key === "Escape" && document.activeElement === searchInput) {
        searchInput.value = "";
        applyFilter();
        searchInput.blur();
      }
    });
  }
})();
