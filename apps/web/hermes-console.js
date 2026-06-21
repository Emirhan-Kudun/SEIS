/*
 * Hermes console — offline orchestration demo.
 * No network calls. Routes a prompt to mock sub-agents and streams a
 * canned, bilingual summary. Reads the current locale from <html lang>.
 */

const thread = document.getElementById("thread");
const form = document.getElementById("form");
const input = document.getElementById("input");
const suggest = document.getElementById("suggest");
const agentItems = Array.from(document.querySelectorAll(".agent-item"));

const lang = () => (document.documentElement.lang === "en" ? "en" : "tr");

const T = {
  greetWho: { tr: "Hermes", en: "Hermes" },
  greet: {
    tr: "Merhaba — ben Hermes, SEIS orkestratörü. Bir görev tarif et, onu doğru alt ajanlara ve eklentilere yönlendireyim. Bu çevrimdışı bir demodur.",
    en: "Hello — I'm Hermes, the SEIS orchestrator. Describe a task and I'll route it to the right sub-agents and plugins. This is an offline demo."
  },
  routing: { tr: "Yönlendiriliyor", en: "Routing to" },
  done: {
    tr: "Plan hazır. Alt ajanlar küçük, geri alınabilir adımlarla çalışacak ve sonuçlar yayından önce güvenlik kapısından geçecek.",
    en: "Plan ready. Sub-agents will work in small, reversible steps and results pass the security gate before any publish."
  }
};

const RULES = [
  { k: ["landing", "site", "web", "page", "sayfa", "açılış", "pano", "dashboard"], agents: ["web", "architect"], plugins: ["Figma", "Build Web Apps", "Vercel"] },
  { k: ["security", "güvenlik", "scan", "audit", "denet"], agents: ["security", "architect"], plugins: ["Codex Security", "CodeRabbit", "Sentry"] },
  { k: ["mobile", "mobil", "android", "app", "uygulama"], agents: ["android", "architect"], plugins: ["GitHub", "Supabase"] },
  { k: ["mac", "desktop", "masaüstü", "swift"], agents: ["macos", "architect"], plugins: ["GitHub"] },
  { k: ["data", "veri", "backend", "api", "supabase", "database"], agents: ["fullstack", "architect"], plugins: ["Supabase", "Convex", "Neon Postgres"] }
];

function pick(text) {
  const t = text.toLowerCase();
  const hit = RULES.find((r) => r.k.some((w) => t.includes(w)));
  return hit || { agents: ["architect", "web"], plugins: ["GitHub", "Build Web Apps"] };
}

function scrollDown() {
  thread.scrollTop = thread.scrollHeight;
}

function addUser(text) {
  const el = document.createElement("div");
  el.className = "msg user";
  el.textContent = text;
  thread.appendChild(el);
  scrollDown();
}

function lightAgents(ids) {
  agentItems.forEach((it) => it.classList.toggle("active", ids.includes(it.dataset.agent)));
}

function typing() {
  const el = document.createElement("div");
  el.className = "msg bot";
  el.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
  thread.appendChild(el);
  scrollDown();
  return el;
}

function respond(text) {
  const route = pick(text);
  lightAgents(route.agents);
  const bubble = typing();
  setTimeout(() => {
    const l = lang();
    const chips = [...route.agents.map((a) => `#${a}`), ...route.plugins]
      .map((c) => `<span class="tag">${c}</span>`)
      .join("");
    bubble.innerHTML =
      `<span class="who">${T.greetWho[l]}</span>` +
      `<strong>${T.routing[l]}:</strong> ${route.agents.join(", ")}.<br>${T.done[l]}` +
      `<div class="route">${chips}</div>`;
    scrollDown();
  }, 850);
}

function greet() {
  const l = lang();
  const el = document.createElement("div");
  el.className = "msg bot";
  el.innerHTML = `<span class="who">${T.greetWho[l]}</span>${T.greet[l]}`;
  thread.appendChild(el);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addUser(text);
  input.value = "";
  respond(text);
});

suggest.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const text = btn.textContent.trim();
  addUser(text);
  respond(text);
});

// Re-greet when locale changes and the thread is empty.
document.addEventListener("hermes:locale", () => {
  if (thread.children.length === 1 && thread.firstElementChild.classList.contains("bot")) {
    thread.innerHTML = "";
    greet();
  }
});

greet();
