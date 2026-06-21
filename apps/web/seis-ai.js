/*
 * SEIS AI / Hermes — shared site interactions
 * Turkish-first. HTML carries the Turkish copy; this file carries the
 * English overrides keyed by [data-i18n]. No dependencies, no build step.
 */

const EN = {
  "nav.hermes": "Hermes",
  "nav.capabilities": "Capabilities",
  "nav.agents": "Sub-agents",
  "nav.plugins": "Plugins",
  "nav.pricing": "Pricing",
  "nav.about": "About",
  "nav.contact": "Contact",
  "cta.console": "Open console",

  "hero.eyebrow": "AI-native orchestration · SEIS closed-code platform",
  "hero.h1": "One agent that speaks every <span class=\"grad\">AI dialect</span>.",
  "hero.lead": "Hermes is the SEIS messenger agent: it fuses the strengths of the major AI and technology labs into a single, governed orchestrator that plans, builds, ships and reviews — across web, mobile, desktop and full-stack.",
  "hero.cta1": "Launch Hermes console",
  "hero.cta2": "Explore the stack",
  "hero.stat1l": "Curated plugins",
  "hero.stat2l": "Platform lanes",
  "hero.stat3l": "Closed-code core",

  "cap.eyebrow": "The fusion",
  "cap.h2": "Best of every lab, under one governance.",
  "cap.p": "Hermes routes each task to the right capability — reasoning, retrieval, code, design, data and security — the way the strongest AI and technology companies each do one thing exceptionally well.",
  "cap.c1t": "Deep reasoning",
  "cap.c1p": "Frontier-grade planning and tool use for architecture, risk and multi-step work.",
  "cap.c2t": "Code generation",
  "cap.c2p": "Repository-aware building, refactoring and review across the SEIS monorepo.",
  "cap.c3t": "Design intelligence",
  "cap.c3p": "Token-driven UI, accessible motion and design-to-code from Figma and Canva.",
  "cap.c4t": "Live retrieval",
  "cap.c4p": "Search, browse and ground answers in current sources instead of stale memory.",
  "cap.c5t": "Data & analytics",
  "cap.c5p": "Inventory, SEO and product analytics adapters wired to the data lane.",
  "cap.c6t": "Security gate",
  "cap.c6p": "Secret scanning, dependency and code review before anything is published.",

  "agents.eyebrow": "Sub-agents",
  "agents.h2": "A team of specialists, conducted by Hermes.",
  "agents.p": "Each SEIS lane and role is a sub-agent Hermes can delegate to and supervise. They work in parallel, then hand results back for review.",
  "agents.a1t": "Web Agent",
  "agents.a1p": "Browser product surface, dashboards and the operating cockpit.",
  "agents.a2t": "Android Agent",
  "agents.a2p": "Expo / mobile direction and Android validation.",
  "agents.a3t": "macOS Agent",
  "agents.a3p": "Local desktop tools and SwiftUI direction.",
  "agents.a4t": "Full-stack Agent",
  "agents.a4p": "Convex / Supabase / Vercel backend direction.",
  "agents.a5t": "Architect",
  "agents.a5p": "Plans systems, records ADRs and protects long-term maintainability.",
  "agents.a6t": "Reviewer",
  "agents.a6p": "Code review, quality gates and honest publish-readiness checks.",

  "plugins.eyebrow": "Plugins",
  "plugins.h2": "The OpenAI-curated plugin stack.",
  "plugins.p": "Hermes connects to a trusted, OpenAI-first plugin marketplace. Tools are curated before they are installed, published or connected live.",
  "plugins.design": "Design",
  "plugins.dev": "Developer tools",
  "plugins.prod": "Productivity",
  "plugins.research": "Research",
  "plugins.security": "Security",

  "flow.eyebrow": "How Hermes works",
  "flow.h2": "Plan, route, build, review.",
  "flow.p": "Every request flows through the same calm, governed loop.",
  "flow.s1t": "Understand",
  "flow.s1p": "Hermes reads the request, the repository context and the governance rules.",
  "flow.s2t": "Route",
  "flow.s2p": "It selects the right sub-agents and curated plugins for the job.",
  "flow.s3t": "Build",
  "flow.s3p": "Sub-agents execute in parallel with small, reversible changes.",
  "flow.s4t": "Review & gate",
  "flow.s4p": "Results pass security and quality gates before any publish.",

  "price.eyebrow": "Pricing",
  "price.h2": "Start calm. Scale when it earns it.",
  "price.p": "Transparent tiers that match the SEIS anti-bloat principle — pay for capability, not noise.",
  "price.t1": "Starter",
  "price.t1d": "For solo builders exploring Hermes.",
  "price.t1f1": "Hermes console (demo)",
  "price.t1f2": "1 platform lane",
  "price.t1f3": "Community plugins",
  "price.t1f4": "Public repos only",
  "price.t1cta": "Get started",
  "price.t2": "Pro",
  "price.t2d": "For teams shipping real products.",
  "price.t2f1": "All sub-agents",
  "price.t2f2": "All 4 platform lanes",
  "price.t2f3": "OpenAI-curated plugins",
  "price.t2f4": "Security & publish gates",
  "price.t2cta": "Choose Pro",
  "price.t2badge": "Most popular",
  "price.t3": "Enterprise",
  "price.t3d": "For closed-code organizations.",
  "price.t3f1": "Private cloud / VPN",
  "price.t3f2": "Custom governance (V14)",
  "price.t3f3": "Dedicated orchestration",
  "price.t3f4": "Priority support",
  "price.t3cta": "Contact sales",
  "price.month": "/mo",
  "price.custom": "Custom",

  "about.eyebrow": "About SEIS",
  "about.h2": "A single, governed center for an AI-native platform.",
  "about.p": "SEIS is the closed-code operating repository that coordinates Android, web, macOS and full-stack work from one center. Hermes is its public face — the agent that turns governance into shippable software.",
  "about.l1t": "Closed-code by default",
  "about.l1p": "The product core stays closed; design tokens and primitives are open modules.",
  "about.l2t": "OpenAI-first routing",
  "about.l2p": "OpenAI / Codex plugin families lead core build work.",
  "about.l3t": "No automatic deploy",
  "about.l3p": "Publication is always gated behind explicit, authenticated steps.",
  "about.l4t": "Bilingual charter",
  "about.l4p": "Turkish-first operations with full English coverage.",

  "contact.h2": "Bring Hermes to your platform.",
  "contact.p": "Tell us what you want to orchestrate. We reply from the SEIS operating center.",
  "contact.email": "Email us",
  "contact.console": "Try the console",

  "footer.tag": "SEIS AI · Hermes orchestration · closed-code platform",
  "footer.privacy": "Security",
  "footer.docs": "Docs",
  "footer.cockpit": "Cockpit",

  /* Console */
  "con.title": "Hermes Console",
  "con.rail": "Sub-agents",
  "con.placeholder": "Ask Hermes to plan, build or review…",
  "con.send": "Send",
  "con.greetwho": "Hermes",
  "con.greet": "Hello — I'm Hermes, the SEIS orchestrator. Describe a task and I'll route it to the right sub-agents and plugins. This is an offline demo.",
  "con.s1": "Build a landing page",
  "con.s2": "Review my repo for security",
  "con.s3": "Plan a mobile app",
  "con.s4": "Design a dashboard",
  "con.routing": "Routing to",
  "con.thinking": "Hermes is orchestrating"
};

function applyLocale(lang) {
  const isEN = lang === "en";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (el.dataset.tr === undefined) el.dataset.tr = el.innerHTML;
    if (isEN && EN[key] !== undefined) el.innerHTML = EN[key];
    else el.innerHTML = el.dataset.tr;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (el.dataset.trPh === undefined) el.dataset.trPh = el.getAttribute("placeholder") || "";
    el.setAttribute("placeholder", isEN && EN[key] !== undefined ? EN[key] : el.dataset.trPh);
  });
  document.querySelectorAll("[data-locale-switcher] .locale-chip").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.setAttribute("aria-pressed", String(active));
  });
  try { localStorage.setItem("hermes-lang", lang); } catch (_) {}
  document.dispatchEvent(new CustomEvent("hermes:locale", { detail: { lang } }));
}

function initLocale() {
  let lang = "tr";
  try { lang = localStorage.getItem("hermes-lang") || "tr"; } catch (_) {}
  applyLocale(lang);
  document.querySelectorAll("[data-locale-switcher] .locale-chip").forEach((btn) => {
    btn.addEventListener("click", () => applyLocale(btn.dataset.lang));
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}

function initYear() {
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initLocale();
  initReveal();
  initYear();
});

export { EN, applyLocale };
