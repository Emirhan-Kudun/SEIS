export function initPwaSystem() {
  if (!("serviceWorker" in navigator)) return;
  if (!isSafeRegistrationContext()) return;

  const workerUrl = new URL("../../service-worker.js", import.meta.url);
  const scopeUrl = new URL("../../", import.meta.url);

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(workerUrl, { scope: scopeUrl.pathname }).catch(() => {
      /* PWA is progressive enhancement; registration failure must not block the page. */
    });
  }, { once: true });
}

function isSafeRegistrationContext() {
  return window.location.protocol === "https:" || window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
}

