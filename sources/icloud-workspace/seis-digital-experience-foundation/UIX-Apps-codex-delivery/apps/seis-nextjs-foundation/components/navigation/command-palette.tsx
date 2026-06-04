"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { getCaseStudies, Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getInsights } from "@/lib/insights-content";
import { getWorkItems } from "@/lib/creative-content";

type CommandPaletteProps = {
  locale: Locale;
};

type CommandItem = {
  id: string;
  label: string;
  description: string;
  href: string;
};

const LAB_COMMANDS: Array<{ id: string; label: string; description: string; route: string }> = [
  { id: "studio", label: "Studio", description: "Hybrid dual migration control plane", route: "/studio" },
  { id: "control", label: "Control Center", description: "Release/search signal center", route: "/control" },
  { id: "ops", label: "Ops Console", description: "Operational quality and governance signals", route: "/ops" },
  { id: "orchestration", label: "Orchestration", description: "Cross-system orchestration board", route: "/orchestration" },
  { id: "risk", label: "Risk Register", description: "Risk posture and rollout safety", route: "/risk" },
  { id: "quality-lab", label: "Quality Lab", description: "Performance/accessibility audit board", route: "/quality-lab" },
  { id: "provider-hub", label: "Provider Hub", description: "Provider and connector orchestration", route: "/provider-hub" },
  { id: "security-lab", label: "Security Lab", description: "Security checks and response drills", route: "/security-lab" },
  { id: "automation", label: "Automation", description: "Automation and playbook surface", route: "/automation" },
  { id: "playbooks", label: "Playbooks", description: "AI + ops execution playbooks", route: "/playbooks" },
  { id: "interaction-lab", label: "Interaction Lab", description: "Multilingual hover and motion interaction systems", route: "/interaction-lab" },
  { id: "cloud-lab", label: "Cloud Lab", description: "Cloud runtime and resilience controls", route: "/cloud-lab" },
  { id: "cloud-cost-lab", label: "Cloud Cost Lab", description: "Cloud cost and finops controls", route: "/cloud-cost-lab" },
  { id: "handoff-lab", label: "Handoff Lab", description: "Worktree handoff safety controls", route: "/handoff-lab" },
  { id: "skills-lab", label: "Skills Lab", description: "MCP and connector governance controls", route: "/skills-lab" },
  { id: "cloud-security-lab", label: "Cloud Security Lab", description: "Identity, secrets, and supply-chain controls", route: "/cloud-security-lab" },
  { id: "cloud-deploy-pipeline-lab", label: "Cloud Deploy Pipeline Lab", description: "Release gate and rollback pipeline controls", route: "/cloud-deploy-pipeline-lab" },
  { id: "cloud-observability-plus-lab", label: "Cloud Observability Plus Lab", description: "Trace, alert, and incident observability controls", route: "/cloud-observability-plus-lab" }
];

export function CommandPalette({ locale }: CommandPaletteProps) {
  const dict = getCreativeDictionary(locale);
  const works = useMemo(() => getWorkItems(locale).slice(0, 5), [locale]);
  const cases = useMemo(() => getCaseStudies(locale).slice(0, 4), [locale]);
  const insights = useMemo(() => getInsights(locale).slice(0, 4), [locale]);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands = useMemo<CommandItem[]>(
    () => [
      { id: "home", label: "Home", description: "Return to cinematic hero", href: `/?lang=${locale}#home` },
      { id: "about", label: dict.navAbout, description: "Open about section", href: `/?lang=${locale}#about` },
      { id: "works", label: dict.navWorks, description: "Open works index", href: `/works?lang=${locale}` },
      { id: "case-studies", label: "Case Studies", description: "Open case study index", href: `/case-studies?lang=${locale}` },
      { id: "insights", label: dict.navInsights, description: "Open insights index", href: `/insights?lang=${locale}` },
      { id: "services", label: "Services", description: "Open service systems", href: `/services?lang=${locale}` },
      { id: "cloud-deck", label: "Cloud Deck", description: "Jump to cloud and handoff command deck", href: `/?lang=${locale}#cloud-readiness` },
      { id: "portfolio", label: "Portfolio Route", description: "Open portfolio route layer", href: `/portfolio?lang=${locale}` },
      ...LAB_COMMANDS.map((item) => ({
        id: `lab-${item.id}`,
        label: item.label,
        description: item.description,
        href: `${item.route}?lang=${locale}`
      })),
      ...works.map((item) => ({
        id: `work-${item.slug}`,
        label: item.title,
        description: `Work · ${item.client}`,
        href: `/works/${item.slug}?lang=${locale}`
      })),
      ...cases.map((item) => ({
        id: `case-${item.slug}`,
        label: item.title,
        description: "Case Study",
        href: `/case-studies/${item.slug}?lang=${locale}`
      })),
      ...insights.map((item) => ({
        id: `insight-${item.slug}`,
        label: item.title,
        description: "Insight",
        href: `/insights/${item.slug}?lang=${locale}`
      }))
    ],
    [cases, dict.navAbout, dict.navInsights, dict.navWorks, insights, locale, works]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;

    return commands.filter(
      (item) => item.label.toLowerCase().includes(normalized) || item.description.toLowerCase().includes(normalized)
    );
  }, [commands, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-seis-line px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-seis-muted hover:border-seis-accent"
      >
        Command (Cmd/Ctrl + K)
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-3 py-14" role="dialog" aria-modal="true">
          <div className="w-full max-w-2xl rounded-xl border border-seis-line bg-seis-surface p-4 shadow-cinematic">
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages, routes, works, insights..."
                className="w-full rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-seis-line px-3 py-2 text-xs uppercase tracking-[0.1em] text-seis-muted"
              >
                Close
              </button>
            </div>

            <div className="mt-3 max-h-[56vh] overflow-auto rounded-lg border border-seis-line">
              {filtered.length === 0 ? (
                <p className="px-3 py-4 text-sm text-seis-muted">No matching command.</p>
              ) : (
                <ul className="grid gap-px bg-seis-line">
                  {filtered.map((item) => (
                    <li key={item.id} className="bg-seis-surface">
                      <Link
                        href={item.href}
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                          void trackEvent({
                            name: "command_item_selected",
                            scope: "command-palette",
                            label: item.id,
                            locale
                          });
                        }}
                        className="block px-3 py-3 hover:bg-seis-card"
                      >
                        <p className="text-sm text-seis-text">{item.label}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">{item.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
