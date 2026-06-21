/*
 * SEIS AI / Hermes — progressive enhancements.
 * Extends the shared EN dictionary at runtime (so seis-ai.js stays
 * untouched), then wires the mobile nav toggle and FAQ accordion.
 */
import { EN, applyLocale } from "./seis-ai.js";

Object.assign(EN, {
  "labs.label": "Built on trusted blocks:",
  "faq.eyebrow": "FAQ",
  "faq.h2": "Frequently asked questions.",
  "faq.q1": "Is Hermes a real, deployed agent?",
  "faq.a1": "The console here is an offline demo. Hermes is the SEIS orchestration concept; production runs behind the SEIS closed-code platform with explicit publish gates.",
  "faq.q2": "Which AI models power it?",
  "faq.a2": "SEIS routes OpenAI / Codex plugin families first, then delegates to the best capability per task — reasoning, code, design, retrieval, data and security.",
  "faq.q3": "Can I use my own repositories?",
  "faq.a3": "Yes. Sub-agents are repository-aware and work in small, reversible changes; publication always passes the security gate.",
  "faq.q4": "Is it bilingual?",
  "faq.a4": "Yes — Turkish-first with full English coverage, following the SEIS operating charter.",
  "nav.faq": "FAQ"
});

// Re-apply the active locale so the newly added keys take effect.
applyLocale(document.documentElement.lang === "en" ? "en" : "tr");

// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
if (toggle && nav) {
  const close = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

// FAQ accordion
document.querySelectorAll(".faq-q").forEach((q) => {
  q.addEventListener("click", () => {
    const item = q.closest(".faq-item");
    const open = item.classList.toggle("open");
    q.setAttribute("aria-expanded", String(open));
  });
});
