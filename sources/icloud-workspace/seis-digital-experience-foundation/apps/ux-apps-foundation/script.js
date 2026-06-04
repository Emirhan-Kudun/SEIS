"use strict";

const apps = Array.isArray(window.UX_APPS_DATA) ? window.UX_APPS_DATA : [];

const state = {
  filter: "all",
  query: "",
  selectedId: apps[0]?.id || ""
};

const appGrid = document.querySelector("#appGrid");
const detailTitle = document.querySelector("#detailTitle");
const detailSummary = document.querySelector("#detailSummary");
const detailAction = document.querySelector("#detailAction");
const detailMetric = document.querySelector("#detailMetric");
const detailRisk = document.querySelector("#detailRisk");
const searchInput = document.querySelector("#searchInput");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));

function matchesQuery(app, query) {
  if (!query) return true;
  const searchable = [app.title, app.stage, app.summary, app.primaryAction, app.metric, app.risk, ...(app.tags || [])]
    .join(" ")
    .toLowerCase();

  return searchable.includes(query.toLowerCase());
}

function getVisibleApps() {
  return apps.filter((app) => {
    const matchesFilter = state.filter === "all" || app.stage === state.filter;
    return matchesFilter && matchesQuery(app, state.query);
  });
}

function renderCards() {
  if (!appGrid) return;
  const visibleApps = getVisibleApps();

  if (visibleApps.length === 0) {
    appGrid.innerHTML = '<p class="empty-state">No UX app matches this filter.</p>';
    return;
  }

  appGrid.innerHTML = visibleApps
    .map(
      (app) => `
        <article class="app-card ${app.id === state.selectedId ? "is-selected" : ""}">
          <button type="button" data-app-id="${app.id}">
            <span class="stage">${app.stage}</span>
            <strong>${app.title}</strong>
            <span>${app.summary}</span>
          </button>
        </article>
      `
    )
    .join("");
}

function renderDetails() {
  const selected = apps.find((app) => app.id === state.selectedId) || getVisibleApps()[0] || apps[0];
  if (!selected) return;

  state.selectedId = selected.id;
  detailTitle.textContent = selected.title;
  detailSummary.textContent = selected.summary;
  detailAction.textContent = selected.primaryAction;
  detailMetric.textContent = selected.metric;
  detailRisk.textContent = selected.risk;
}

function render() {
  const visibleApps = getVisibleApps();
  if (visibleApps.length > 0 && !visibleApps.some((app) => app.id === state.selectedId)) {
    state.selectedId = visibleApps[0].id;
  }

  renderCards();
  renderDetails();
}

appGrid?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-app-id]");
  if (!button) return;
  state.selectedId = button.dataset.appId;
  render();
});

searchInput?.addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter || "all";
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    render();
  });
});

render();
