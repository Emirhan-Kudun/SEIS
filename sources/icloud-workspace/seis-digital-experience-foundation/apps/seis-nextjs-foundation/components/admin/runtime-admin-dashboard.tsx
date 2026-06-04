"use client";

import { FormEvent, useMemo, useState } from "react";

type RuntimeCollectionStats = {
  path: string;
  exists: boolean;
  bytes: number;
  updatedAt: string | null;
};

type RuntimeStoreSummary = {
  mode: string;
  root: string;
  collections: Record<string, RuntimeCollectionStats>;
};

type RuntimePayload = {
  ok: boolean;
  generatedAt: string;
  summary: {
    capabilities: number;
    modes: number;
    defaultStorage: string;
    requiredLocalServices: number;
    heavyDatabaseRequired: boolean;
    recentContacts: number;
    recentBriefs: number;
    recentReadiness: number;
    recentScopePlans: number;
    recentEvents: number;
  };
  runtimeStore: RuntimeStoreSummary;
};

type ContactRecord = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  service: string;
  message: string;
  locale: string;
  channelUsed: string;
  fallbackLevel: number;
  status: string;
  errorCode?: string;
};

type BriefRecord = {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  goals: string;
  locale: string;
  status: string;
};

type ReadinessRecord = {
  id: string;
  assessedAt: string;
  projectName: string;
  email: string;
  projectStage: string;
  contentReadiness: string;
  designReadiness: string;
  integrationReadiness: string;
  launchWindow: string;
  score: number;
  level: string;
  recommendation: string;
  locale: string;
};

type ScopePlanRecord = {
  id: string;
  plannedAt: string;
  projectName: string;
  email: string;
  primaryGoal: string;
  deliveryModel: string;
  complexity: string;
  maintenance: string;
  focusAreas: string[];
  score: number;
  level: string;
  phaseCount: number;
  recommendation: string;
  locale: string;
};

type RuntimeEventRecord = {
  id: string;
  acceptedAt: string;
  name: string;
  scope: string;
  label: string;
  locale: string;
  path: string;
  metadata?: Record<string, string | number | boolean | null>;
};

type CollectionPayload<TRecord> = {
  ok: boolean;
  generatedAt: string;
  count: number;
  runtimeStore: RuntimeStoreSummary;
} & TRecord;

type AdminSnapshot = {
  runtime: RuntimePayload;
  contacts: ContactRecord[];
  briefs: BriefRecord[];
  readiness: ReadinessRecord[];
  scopePlans: ScopePlanRecord[];
  events: RuntimeEventRecord[];
};

type ActiveView = "briefs" | "readiness" | "scopePlans" | "contacts" | "events";

type OperationalSnapshot = {
  generatedAt: string;
  totalRecords: number;
  openReviewItems: number;
  activeCollections: number;
  latestActivityAt: string | null;
  launchReadyCount: number;
  foundationCount: number;
  failedContacts: number;
  scopePlanAverageScore: number | null;
};

type AdminErrorPayload = {
  ok?: boolean;
  message?: string;
  reason?: string;
};

function isAdminErrorPayload(payload: unknown): payload is AdminErrorPayload {
  return typeof payload === "object" && payload !== null;
}

async function fetchAdminJson<T>(path: string, token: string): Promise<T> {
  const response = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const payload = (await response.json()) as unknown;

  if (!response.ok) {
    const message = isAdminErrorPayload(payload) && payload.message ? payload.message : `Admin request failed for ${path}.`;
    const reason = isAdminErrorPayload(payload) && payload.reason ? ` (${payload.reason})` : "";
    throw new Error(`${message}${reason}`);
  }

  return payload as T;
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function formatBytes(value: number): string {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function statusTone(value: string): string {
  if (["sent", "queued", "new", "launch-ready", "healthy"].includes(value)) {
    return "border-emerald-600/40 bg-emerald-500/10 text-emerald-200";
  }
  if (["structured", "reviewed"].includes(value)) {
    return "border-sky-600/40 bg-sky-500/10 text-sky-200";
  }
  if (["failed", "blocked"].includes(value)) {
    return "border-red-600/40 bg-red-500/10 text-red-200";
  }
  return "border-seis-line text-seis-muted";
}

function latestTimestamp(values: Array<string | null | undefined>): string | null {
  const timestamps = values
    .map((value) => (value ? new Date(value).getTime() : Number.NaN))
    .filter((value) => Number.isFinite(value));

  if (!timestamps.length) return null;
  return new Date(Math.max(...timestamps)).toISOString();
}

function averageScore(records: Array<{ score: number }>): number | null {
  if (!records.length) return null;
  const total = records.reduce((sum, record) => sum + record.score, 0);
  return Math.round(total / records.length);
}

function buildOperationalSnapshot(snapshot: AdminSnapshot): OperationalSnapshot {
  const collections = Object.values(snapshot.runtime.runtimeStore.collections);

  return {
    generatedAt: snapshot.runtime.generatedAt,
    totalRecords:
      snapshot.contacts.length +
      snapshot.briefs.length +
      snapshot.readiness.length +
      snapshot.scopePlans.length +
      snapshot.events.length,
    openReviewItems:
      snapshot.briefs.filter((record) => record.status === "new").length +
      snapshot.readiness.filter((record) => record.level === "foundation").length,
    activeCollections: collections.filter((collection) => collection.exists).length,
    latestActivityAt: latestTimestamp([
      ...snapshot.contacts.map((record) => record.receivedAt),
      ...snapshot.briefs.map((record) => record.receivedAt),
      ...snapshot.readiness.map((record) => record.assessedAt),
      ...snapshot.scopePlans.map((record) => record.plannedAt),
      ...snapshot.events.map((record) => record.acceptedAt)
    ]),
    launchReadyCount: snapshot.readiness.filter((record) => record.level === "launch-ready").length,
    foundationCount: snapshot.readiness.filter((record) => record.level === "foundation").length,
    failedContacts: snapshot.contacts.filter((record) => record.status === "failed").length,
    scopePlanAverageScore: averageScore(snapshot.scopePlans)
  };
}

export function RuntimeAdminDashboard() {
  const [token, setToken] = useState("");
  const [limit, setLimit] = useState(50);
  const [activeView, setActiveView] = useState<ActiveView>("briefs");
  const [snapshot, setSnapshot] = useState<AdminSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  async function loadSnapshot(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError(null);

    if (!token.trim()) {
      setError("Enter SEIS_ADMIN_TOKEN to review runtime records.");
      return;
    }

    setLoading(true);

    try {
      const query = `?limit=${limit}`;
      const [runtime, contactsPayload, briefsPayload, readinessPayload, scopePlansPayload, eventsPayload] = await Promise.all([
        fetchAdminJson<RuntimePayload>("/api/admin/runtime", token.trim()),
        fetchAdminJson<CollectionPayload<{ submissions: ContactRecord[] }>>(`/api/admin/submissions${query}`, token.trim()),
        fetchAdminJson<CollectionPayload<{ briefs: BriefRecord[] }>>(`/api/admin/briefs${query}`, token.trim()),
        fetchAdminJson<CollectionPayload<{ assessments: ReadinessRecord[] }>>(`/api/admin/readiness${query}`, token.trim()),
        fetchAdminJson<CollectionPayload<{ scopePlans: ScopePlanRecord[] }>>(`/api/admin/scope-plans${query}`, token.trim()),
        fetchAdminJson<CollectionPayload<{ events: RuntimeEventRecord[] }>>(`/api/admin/events${query}`, token.trim())
      ]);

      setSnapshot({
        runtime,
        contacts: contactsPayload.submissions,
        briefs: briefsPayload.briefs,
        readiness: readinessPayload.assessments,
        scopePlans: scopePlansPayload.scopePlans,
        events: eventsPayload.events
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Runtime admin review failed.");
    } finally {
      setLoading(false);
    }
  }

  const summaryItems = useMemo(() => {
    if (!snapshot) return [];

    return [
      { label: "Briefs", value: snapshot.briefs.length },
      { label: "Readiness", value: snapshot.readiness.length },
      { label: "Scope Plans", value: snapshot.scopePlans.length },
      { label: "Contacts", value: snapshot.contacts.length },
      { label: "Events", value: snapshot.events.length },
      { label: "Collections", value: Object.keys(snapshot.runtime.runtimeStore.collections).length },
      { label: "Services", value: snapshot.runtime.summary.requiredLocalServices }
    ];
  }, [snapshot]);

  const operationalSnapshot = useMemo(() => {
    return snapshot ? buildOperationalSnapshot(snapshot) : null;
  }, [snapshot]);

  async function copyOperationalSnapshot() {
    if (!operationalSnapshot) return;

    const payload = JSON.stringify(operationalSnapshot, null, 2);

    if (!navigator.clipboard) {
      setError("Clipboard API is not available in this browser context.");
      return;
    }

    await navigator.clipboard.writeText(payload);
    setCopyStatus("Snapshot copied.");
    window.setTimeout(() => setCopyStatus(""), 1800);
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={(event) => void loadSnapshot(event)} className="grid gap-4 border-y border-seis-line py-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_160px_auto] lg:items-end">
          <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
            Admin token
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              autoComplete="off"
              className="min-h-11 rounded-lg border border-seis-line bg-seis-surface px-3 text-sm text-seis-text outline-none focus:border-seis-accent"
              placeholder="SEIS_ADMIN_TOKEN"
            />
          </label>
          <label className="grid gap-2 text-xs font-medium uppercase text-seis-muted">
            Limit
            <input
              type="number"
              min={1}
              max={200}
              value={limit}
              onChange={(event) => setLimit(Math.min(200, Math.max(1, Number(event.target.value) || 50)))}
              className="min-h-11 rounded-lg border border-seis-line bg-seis-surface px-3 text-sm text-seis-text outline-none focus:border-seis-accent"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="min-h-11 rounded-lg border border-seis-accent bg-seis-accent px-4 text-xs font-medium uppercase text-[#16110c] disabled:opacity-50"
          >
            {loading ? "Loading" : "Load review"}
          </button>
        </div>
        <p className="text-sm leading-6 text-seis-muted">
          Token stays in this browser session and is sent only as a bearer header to the protected admin APIs.
        </p>
        {error ? (
          <p role="alert" className="text-sm text-red-300">
            {error}
          </p>
        ) : null}
      </form>

      {snapshot ? (
        <>
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {summaryItems.map((item) => (
              <article key={item.label} className="rounded-lg border border-seis-line bg-seis-surface p-3">
                <p className="text-xs font-medium uppercase text-seis-muted">{item.label}</p>
                <p className="mt-1 font-serif text-3xl text-seis-text">{item.value}</p>
              </article>
            ))}
          </section>

          {operationalSnapshot ? (
            <OperationalSnapshotPanel
              snapshot={operationalSnapshot}
              copyStatus={copyStatus}
              onCopy={() => void copyOperationalSnapshot()}
            />
          ) : null}

          <section className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
            <RuntimeStorePanel runtime={snapshot.runtime} />
            <RecordsPanel
              activeView={activeView}
              setActiveView={setActiveView}
              contacts={snapshot.contacts}
              briefs={snapshot.briefs}
              readiness={snapshot.readiness}
              scopePlans={snapshot.scopePlans}
              events={snapshot.events}
            />
          </section>
        </>
      ) : (
        <section className="border-y border-seis-line py-6">
          <h2 className="font-serif text-3xl">Protected runtime review</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-seis-muted">
            Load the token-protected admin APIs to inspect recent briefs, readiness assessments, contact fallback records,
            and lightweight UX events without starting a database, browser automation, or local dev server.
          </p>
        </section>
      )}
    </div>
  );
}

function OperationalSnapshotPanel({
  snapshot,
  copyStatus,
  onCopy
}: {
  snapshot: OperationalSnapshot;
  copyStatus: string;
  onCopy: () => void;
}) {
  const cards = [
    { label: "Total records", value: snapshot.totalRecords },
    { label: "Open review", value: snapshot.openReviewItems },
    { label: "Active collections", value: snapshot.activeCollections },
    { label: "Launch ready", value: snapshot.launchReadyCount },
    { label: "Foundation", value: snapshot.foundationCount },
    { label: "Failed contacts", value: snapshot.failedContacts },
    { label: "Scope avg", value: snapshot.scopePlanAverageScore ?? "n/a" }
  ];

  return (
    <section className="border-y border-seis-line py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl">Operational Snapshot</h2>
          <p className="mt-2 text-sm text-seis-muted">
            Latest activity: {formatDate(snapshot.latestActivityAt)}. Generated: {formatDate(snapshot.generatedAt)}.
          </p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg border border-seis-line px-3 py-2 text-xs font-medium uppercase text-seis-muted hover:border-seis-accent"
        >
          Copy JSON
        </button>
      </div>
      {copyStatus ? <p className="mt-2 text-sm text-seis-muted">{copyStatus}</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {cards.map((card) => (
          <article key={card.label} className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs font-medium uppercase text-seis-muted">{card.label}</p>
            <p className="mt-1 font-serif text-2xl text-seis-text">{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RuntimeStorePanel({ runtime }: { runtime: RuntimePayload }) {
  return (
    <section className="grid gap-4">
      <div>
        <h2 className="font-serif text-3xl">Runtime Store</h2>
        <p className="mt-2 break-all text-sm text-seis-muted">{runtime.runtimeStore.root}</p>
        <p className="mt-1 text-sm text-seis-muted">
          Mode: {runtime.runtimeStore.mode}. Generated: {formatDate(runtime.generatedAt)}.
        </p>
      </div>

      <div className="grid gap-2">
        {Object.entries(runtime.runtimeStore.collections).map(([key, value]) => (
          <article key={key} className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-xl text-seis-text">{key}</h3>
              <span className={`rounded-full border px-2 py-1 text-xs ${value.exists ? statusTone("healthy") : statusTone("watch")}`}>
                {value.exists ? "active" : "empty"}
              </span>
            </div>
            <p className="mt-2 text-sm text-seis-muted">{formatBytes(value.bytes)}</p>
            <p className="mt-1 break-all text-xs text-seis-muted">{value.path}</p>
            <p className="mt-1 text-xs text-seis-muted">Updated: {formatDate(value.updatedAt)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RecordsPanel({
  activeView,
  setActiveView,
  contacts,
  briefs,
  readiness,
  scopePlans,
  events
}: {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  contacts: ContactRecord[];
  briefs: BriefRecord[];
  readiness: ReadinessRecord[];
  scopePlans: ScopePlanRecord[];
  events: RuntimeEventRecord[];
}) {
  const tabs: Array<{ id: ActiveView; label: string; count: number }> = [
    { id: "briefs", label: "Briefs", count: briefs.length },
    { id: "readiness", label: "Readiness", count: readiness.length },
    { id: "scopePlans", label: "Scope", count: scopePlans.length },
    { id: "contacts", label: "Contacts", count: contacts.length },
    { id: "events", label: "Events", count: events.length }
  ];

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-3xl">Review Queue</h2>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Runtime review records">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeView === tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium uppercase ${
                activeView === tab.id ? "border-seis-accent bg-seis-accent text-[#16110c]" : "border-seis-line text-seis-muted"
              }`}
            >
              {tab.label} {tab.count}
            </button>
          ))}
        </div>
      </div>

      {activeView === "briefs" ? <BriefList records={briefs} /> : null}
      {activeView === "readiness" ? <ReadinessList records={readiness} /> : null}
      {activeView === "scopePlans" ? <ScopePlanList records={scopePlans} /> : null}
      {activeView === "contacts" ? <ContactList records={contacts} /> : null}
      {activeView === "events" ? <EventList records={events} /> : null}
    </section>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted">
      No {label} records yet.
    </div>
  );
}

function BriefList({ records }: { records: BriefRecord[] }) {
  if (!records.length) return <EmptyState label="brief" />;

  return (
    <div className="grid gap-3">
      {records.map((record) => (
        <article key={record.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif text-2xl text-seis-text">{record.name}</h3>
            <span className={`rounded-full border px-2 py-1 text-xs ${statusTone(record.status)}`}>{record.status}</span>
          </div>
          <p className="mt-1 break-all text-sm text-seis-muted">{record.email}</p>
          <div className="mt-3 grid gap-2 text-xs text-seis-muted sm:grid-cols-3">
            <span>{record.projectType}</span>
            <span>{record.budgetRange}</span>
            <span>{record.timeline}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-seis-muted">{record.goals}</p>
          <p className="mt-3 text-xs text-seis-muted">{formatDate(record.receivedAt)}</p>
        </article>
      ))}
    </div>
  );
}

function ReadinessList({ records }: { records: ReadinessRecord[] }) {
  if (!records.length) return <EmptyState label="readiness" />;

  return (
    <div className="grid gap-3">
      {records.map((record) => (
        <article key={record.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-2xl text-seis-text">{record.projectName}</h3>
              <p className="mt-1 break-all text-sm text-seis-muted">{record.email}</p>
            </div>
            <div className="text-right">
              <p className="font-serif text-3xl text-seis-text">{record.score}</p>
              <span className={`rounded-full border px-2 py-1 text-xs ${statusTone(record.level)}`}>{record.level}</span>
            </div>
          </div>
          <div className="mt-3 grid gap-2 text-xs text-seis-muted sm:grid-cols-4">
            <span>{record.projectStage}</span>
            <span>content {record.contentReadiness}</span>
            <span>design {record.designReadiness}</span>
            <span>integration {record.integrationReadiness}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-seis-muted">{record.recommendation}</p>
          <p className="mt-3 text-xs text-seis-muted">{formatDate(record.assessedAt)}</p>
        </article>
      ))}
    </div>
  );
}

function ScopePlanList({ records }: { records: ScopePlanRecord[] }) {
  if (!records.length) return <EmptyState label="scope plan" />;

  return (
    <div className="grid gap-3">
      {records.map((record) => (
        <article key={record.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-2xl text-seis-text">{record.projectName}</h3>
              <p className="mt-1 break-all text-sm text-seis-muted">{record.email}</p>
            </div>
            <div className="text-right">
              <p className="font-serif text-3xl text-seis-text">{record.score}</p>
              <span className={`rounded-full border px-2 py-1 text-xs ${statusTone(record.level)}`}>{record.level}</span>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-seis-muted">{record.primaryGoal}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-seis-muted">
            <span>{record.deliveryModel}</span>
            <span>{record.complexity}</span>
            <span>{record.maintenance}</span>
            <span>{record.phaseCount} phases</span>
            {record.focusAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-seis-muted">{record.recommendation}</p>
          <p className="mt-3 text-xs text-seis-muted">{formatDate(record.plannedAt)}</p>
        </article>
      ))}
    </div>
  );
}

function ContactList({ records }: { records: ContactRecord[] }) {
  if (!records.length) return <EmptyState label="contact" />;

  return (
    <div className="grid gap-3">
      {records.map((record) => (
        <article key={record.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif text-2xl text-seis-text">{record.name}</h3>
            <span className={`rounded-full border px-2 py-1 text-xs ${statusTone(record.status)}`}>{record.status}</span>
          </div>
          <p className="mt-1 break-all text-sm text-seis-muted">{record.email}</p>
          <p className="mt-3 text-sm leading-6 text-seis-muted">{record.message}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-seis-muted">
            <span>{record.service}</span>
            <span>{record.channelUsed}</span>
            <span>fallback {record.fallbackLevel}</span>
            {record.errorCode ? <span>{record.errorCode}</span> : null}
          </div>
          <p className="mt-3 text-xs text-seis-muted">{formatDate(record.receivedAt)}</p>
        </article>
      ))}
    </div>
  );
}

function EventList({ records }: { records: RuntimeEventRecord[] }) {
  if (!records.length) return <EmptyState label="event" />;

  return (
    <div className="grid gap-3">
      {records.map((record) => (
        <article key={record.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif text-2xl text-seis-text">{record.label}</h3>
            <span className="rounded-full border border-seis-line px-2 py-1 text-xs text-seis-muted">{record.scope}</span>
          </div>
          <p className="mt-2 text-sm text-seis-muted">{record.name}</p>
          <p className="mt-1 break-all text-xs text-seis-muted">{record.path}</p>
          {record.metadata ? (
            <pre className="mt-3 overflow-auto rounded-md border border-seis-line bg-seis-bg p-3 text-xs text-seis-muted">
              {JSON.stringify(record.metadata, null, 2)}
            </pre>
          ) : null}
          <p className="mt-3 text-xs text-seis-muted">{formatDate(record.acceptedAt)}</p>
        </article>
      ))}
    </div>
  );
}
