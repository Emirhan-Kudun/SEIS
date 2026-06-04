"use client";

import { FormEvent, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";

type NewsletterFormProps = {
  locale: Locale;
};

export function NewsletterForm({ locale }: NewsletterFormProps) {
  const dict = getCreativeDictionary(locale);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: ""
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          locale,
          source: "social-section"
        })
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? dict.newsletterError);
      }

      setEmail("");
      setStatus({ type: "success", message: dict.newsletterSuccess });
      void trackEvent({
        name: "newsletter_subscribed",
        scope: "newsletter-form",
        label: "social-section",
        locale
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : dict.newsletterError;
      setStatus({ type: "error", message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
      <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
        {dict.newsletterEmail}
        <input
          required
          type="email"
          maxLength={160}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-lg border border-seis-line bg-[#120f0c] px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
        />
      </label>
      <div className="flex items-end">
        <button
          type="submit"
          disabled={submitting}
          className="min-h-10 rounded-full border border-seis-accent bg-seis-accent px-4 text-xs uppercase tracking-[0.1em] text-[#16110c] transition-colors hover:bg-seis-accentSoft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : dict.newsletterSubmit}
        </button>
      </div>
      {status.type !== "idle" ? (
        <p
          className={`sm:col-span-2 text-sm ${status.type === "success" ? "text-emerald-300" : "text-red-300"}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
