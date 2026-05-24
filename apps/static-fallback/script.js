(() => {
  const runtime = document.querySelector(".runtime");
  if (!runtime) return;
  runtime.dataset.checkedAt = new Date().toISOString();
})();
