import type { Metadata } from "next";
import Link from "next/link";

import {
  ecosystemConnectionStateSummary,
  ecosystemOutputSurfaces,
  ecosystemSourceExportIndex,
  ecosystemSourceActionPackets,
  ecosystemSourceExecutionQueue,
  ecosystemSourceSignalMap,
  ecosystemSourceTotal
} from "@seis/content";

import { EcosystemSourceConsole } from "../../components/ecosystem-source-console";
import { buildPageMetadata } from "../../lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Sources Command Map",
  description: "Complete plugin source map, signal groups, output APIs and connection-safe activation evidence for the portfolio.",
  path: "/sources"
});

const sourceApiLinks = [
  "/api/source-execution-queue",
  "/api/source-action-packets",
  "/api/source-signal-map",
  "/api/source-package",
  "/api/ecosystem-sources",
  "/api/source-export-index",
  "/api/source-proof",
  "/api/source-readiness",
  "/api/source-side-panel",
  "/api/aggressive-development-plan"
];

export default function SourcesPage() {
  const outputApiCount = ecosystemOutputSurfaces.filter((surface) => surface.sourceMode === "api").length;
  const metrics = [
    { label: "Plugin sources", value: ecosystemSourceTotal, detail: "complete submitted ledger" },
    { label: "Signal groups", value: ecosystemSourceSignalMap.length, detail: "derived source families" },
    { label: "Queue items", value: ecosystemSourceExecutionQueue.length, detail: "now / next / blocked" },
    { label: "Action packets", value: ecosystemSourceActionPackets.length, detail: "agent-ready handoff" },
    { label: "Invoked", value: ecosystemConnectionStateSummary.tool_invoked, detail: "strongest platform evidence" },
    { label: "Callable or discovered", value: ecosystemConnectionStateSummary.session_available + ecosystemConnectionStateSummary.tool_discovered, detail: "task-routed next" },
    { label: "Blocked", value: ecosystemConnectionStateSummary.reauth_required + ecosystemConnectionStateSummary.missing_connection, detail: "auth/setup required" },
    { label: "Source APIs", value: outputApiCount, detail: "machine-readable outputs" }
  ];

  return (
    <main className="page-shell source-command-page" id="page-main-content">
      <a href="#sources-content" className="skip-link">Icerige gec</a>
      <nav className="top-nav" aria-label="Sources navigation">
        <Link href="/" className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/sources" aria-current="page">Sources</Link>
          <Link href="/ops">Ops</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>

      <section className="section page-hero source-command-hero" id="sources-content">
        <p className="eyebrow">Environment / complete source map</p>
        <h1>All connected, callable and cataloged sources in one command surface.</h1>
        <p className="page-lead">
          Bu sayfa platform Sources panelinde gorunen kismi, yerel portfolio mirror bilgisini ve agent-ready JSON ciktilarini tek okunabilir rotada birlestirir.
        </p>

        <div className="source-command-metrics" aria-label="Sources command metrics">
          {metrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.detail}</small>
            </article>
          ))}
        </div>

        <section className="source-execution-section" aria-label="Source execution queue">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Execution queue</p>
              <h2>Next source-family actions without unsafe bulk provider calls.</h2>
            </div>
            <p>Queue signal map ve aggressive lane bilgilerini birlestirir; her item tek ailelik, geri alinabilir bir sonraki is olarak okunur.</p>
          </div>
          <div className="source-execution-grid">
            {ecosystemSourceExecutionQueue.map((item) => (
              <article className="source-execution-card" data-priority={item.priority} key={item.id}>
                <span>{item.priority} / {item.signalState.replace(/_/g, " ")}</span>
                <strong>{item.count}</strong>
                <h3>{item.sourceFamilyLabel}</h3>
                <p>{item.action}</p>
                <small>{item.laneIds.length} lanes / {item.acceptanceCriteria.length} checks</small>
                <em>{item.guardrail}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="source-action-section" aria-label="Source action packets">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Action packets</p>
              <h2>Agent-ready handoffs for the next bounded source moves.</h2>
            </div>
            <p>Her packet bir queue itemini validasyon, evidence path ve stop condition ile paketler; dis provider cagrisi yapmaz.</p>
          </div>
          <div className="source-action-grid">
            {ecosystemSourceActionPackets.map((packet) => (
              <article className="source-action-card" data-mode={packet.packetMode} data-priority={packet.priority} key={packet.id}>
                <span>{packet.packetMode} / {packet.priority}</span>
                <strong>{packet.count}</strong>
                <h3>{packet.sourceFamilyLabel}</h3>
                <p>{packet.objective}</p>
                <small>{packet.localValidation.length} checks / {packet.evidencePaths.length} evidence paths</small>
                <em>{packet.stopCondition}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="source-signal-section" aria-label="Source signal map">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Signal map</p>
              <h2>Source families by live evidence, callable tools and blockers.</h2>
            </div>
            <p>Signal map registry verisinden turetilir; bu yuzey provider cagirmadan hangi ailenin siradaki sprinti tasiyacagini gosterir.</p>
          </div>
          <div className="source-signal-grid">
            {ecosystemSourceSignalMap.map((item) => (
              <article className="source-signal-card" data-state={item.strongestState} key={item.id}>
                <span>{item.strongestState.replace(/_/g, " ")}</span>
                <strong>{item.total}</strong>
                <h3>{item.label}</h3>
                <p>{item.strategy}</p>
                <div aria-label={`${item.label} signal counts`}>
                  <small>{item.invoked} invoked</small>
                  <small>{item.callable} callable</small>
                  <small>{item.blocked} blocked</small>
                  <small>{item.manifestOnly} manifest</small>
                </div>
                <em>{item.action}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="source-api-dock" aria-label="Source API outputs">
          <div>
            <p className="eyebrow">Outputs / Sources</p>
            <h2>{ecosystemSourceExportIndex.length} handoff surfaces, {outputApiCount} API endpoints.</h2>
            <p>Bu ciktilar Codex, GitHub incelemesi veya baska bir agent tarafindan ayni source haritasini okumak icin kullanilabilir.</p>
          </div>
          <div className="api-list">
            {sourceApiLinks.map((href) => (
              <Link className="text-link" href={href} key={href}>{href}</Link>
            ))}
          </div>
        </section>

        <EcosystemSourceConsole locale="tr" />
      </section>
    </main>
  );
}
