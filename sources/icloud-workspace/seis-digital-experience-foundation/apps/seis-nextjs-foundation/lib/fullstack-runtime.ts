export type RuntimeCapability = {
  id: string;
  label: string;
  detail: string;
  endpoint: string;
};

export const runtimeCapabilities: RuntimeCapability[] = [
  {
    id: "contact-queue",
    label: "Contact API + local queue",
    detail: "Validates contact requests, tries the primary mail provider, then stores fallback records in JSONL.",
    endpoint: "/api/contact"
  },
  {
    id: "runtime-events",
    label: "Event intake",
    detail: "Accepts lightweight UX events without a heavy analytics service or local database daemon.",
    endpoint: "/api/events"
  },
  {
    id: "project-briefs",
    label: "Project brief intake",
    detail: "Stores structured project briefs in the same lightweight runtime queue.",
    endpoint: "/api/briefs"
  },
  {
    id: "readiness-check",
    label: "Readiness check",
    detail: "Scores launch readiness and stores the result without a database service.",
    endpoint: "/api/readiness"
  },
  {
    id: "scope-plan",
    label: "Scope plan builder",
    detail: "Generates phased release plans and stores them in the same JSONL runtime.",
    endpoint: "/api/scope-plans"
  },
  {
    id: "admin-submissions",
    label: "Admin submissions",
    detail: "Reads local contact submissions only when SEIS_ADMIN_TOKEN is configured.",
    endpoint: "/api/admin/submissions"
  },
  {
    id: "admin-events",
    label: "Admin event stream",
    detail: "Reads recent runtime events for debugging, QA, and calm operational review.",
    endpoint: "/api/admin/events"
  },
  {
    id: "admin-briefs",
    label: "Admin brief review",
    detail: "Reads recent project briefs through token-protected admin access.",
    endpoint: "/api/admin/briefs"
  },
  {
    id: "admin-readiness",
    label: "Admin readiness review",
    detail: "Reads recent readiness assessments through token-protected admin access.",
    endpoint: "/api/admin/readiness"
  },
  {
    id: "admin-scope-plans",
    label: "Admin scope plan review",
    detail: "Reads recent scope plans through token-protected admin access.",
    endpoint: "/api/admin/scope-plans"
  },
  {
    id: "admin-runtime",
    label: "Admin runtime summary",
    detail: "Summarizes runtime collections and enabled full-stack capabilities.",
    endpoint: "/api/admin/runtime"
  },
  {
    id: "runtime-admin-dashboard",
    label: "Runtime admin dashboard",
    detail: "Reviews briefs, readiness, scope plans, contact records, and events through token-protected APIs.",
    endpoint: "/runtime-admin"
  },
  {
    id: "content-api",
    label: "Content APIs",
    detail: "Exposes projects, skills, site metadata, governance, design-system, and observability data.",
    endpoint: "/api/projects"
  },
  {
    id: "multilingual-planning-api",
    label: "Multilingual planning API",
    detail: "Publishes locale readiness, content model gates, and manual spatial policy as typed JSON.",
    endpoint: "/api/multilingual-planning"
  },
  {
    id: "runtime-health",
    label: "Health + metrics",
    detail: "Keeps production checks small, explainable, and compatible with root aliases.",
    endpoint: "/api/health"
  }
];

export const runtimeModes = [
  {
    id: "local-jsonl",
    label: "Local JSONL",
    status: "default",
    detail: "Zero-service runtime storage for local development and small deployments."
  },
  {
    id: "provider-mail",
    label: "Provider mail",
    status: "optional",
    detail: "RESEND_API_KEY enables primary email delivery without changing the frontend contract."
  },
  {
    id: "admin-token",
    label: "Admin token",
    status: "optional",
    detail: "SEIS_ADMIN_TOKEN activates protected read APIs for submissions, briefs, readiness, and event review."
  },
  {
    id: "manual-spatial",
    label: "Manual spatial",
    status: "optional",
    detail: "3D preview stays disabled until a user explicitly activates it."
  }
] as const;

export function getFullStackRuntimeSummary() {
  return {
    capabilities: runtimeCapabilities.length,
    modes: runtimeModes.length,
    defaultStorage: "jsonl",
    requiredLocalServices: 0,
    heavyDatabaseRequired: false
  };
}
