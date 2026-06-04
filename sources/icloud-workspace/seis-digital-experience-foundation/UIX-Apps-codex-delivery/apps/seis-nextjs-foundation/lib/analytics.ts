export type AnalyticsEventInput = {
  name: string;
  scope: string;
  label?: string;
  locale?: string;
  path?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export async function trackEvent(event: AnalyticsEventInput): Promise<void> {
  if (typeof window === "undefined") return;

  const payload = {
    ...event,
    path: event.path ?? window.location.pathname
  };

  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
    return;
  }

  await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });
}
