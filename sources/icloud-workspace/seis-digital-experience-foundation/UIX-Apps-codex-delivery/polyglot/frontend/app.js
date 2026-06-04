(() => {
  const status = document.querySelector("#status");
  if (!status) return;

  const signal = {
    ok: true,
    languageLanes: 14,
    mode: "dependency-light"
  };

  status.dataset.state = "ready";
  status.textContent = `Ready: ${signal.languageLanes} governed language lanes, ${signal.mode}.`;
})();
