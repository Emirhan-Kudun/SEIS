import type { RuntimeStatus } from "./index";

export type ActivationPolicy = {
  status: RuntimeStatus;
  visitorMeaning: string;
  implementationRule: string;
  escalation: string;
};

export const activationPolicies: ActivationPolicy[] = [
  {
    status: "active",
    visitorMeaning: "This capability works locally without secrets or external service calls.",
    implementationRule: "It can render in public UI and API responses by default.",
    escalation: "Keep it covered by low-power checks."
  },
  {
    status: "configured",
    visitorMeaning: "Credentials are present and the connector may be enabled in controlled flows.",
    implementationRule: "Never expose secret values; only expose capability status and safe metadata.",
    escalation: "Use explicit runbooks before calling external services."
  },
  {
    status: "needs_credentials",
    visitorMeaning: "The capability is modeled but not connected to a live account yet.",
    implementationRule: "Render setup guidance instead of throwing runtime errors.",
    escalation: "Add environment variables through the deployment platform, not source files."
  },
  {
    status: "unavailable",
    visitorMeaning: "The capability is intentionally blocked or missing required platform setup.",
    implementationRule: "Keep it visible as a known limitation with a clear reason.",
    escalation: "Reassess only after credentials, tokens, or service access are explicitly configured."
  },
  {
    status: "skipped_with_reason",
    visitorMeaning: "The capability was discovered but intentionally not probed because the safe preconditions are missing.",
    implementationRule: "Report the blocker instead of calling write-capable, account-scoped or destructive tools.",
    escalation: "Run only after a concrete target and explicit approval are available."
  }
];
