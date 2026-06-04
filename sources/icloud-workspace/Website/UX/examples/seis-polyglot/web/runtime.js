const card = document.querySelector(".seis-card");
const output = document.querySelector("output");
const button = document.querySelector("[data-action='summarize']");

const state = {
  github: "pushed",
  icloud: "exported",
  cloud: "watch",
  server: "blocked_until_credentials"
};

button?.addEventListener("click", () => {
  const readySignals = Object.values(state).filter((value) => value === "pushed" || value === "exported");
  card?.setAttribute("data-status", readySignals.length >= 2 ? "ready" : "watch");
  if (output) {
    output.textContent = `Ready signals: ${readySignals.length}. Cloud remains ${state.cloud}.`;
  }
});
