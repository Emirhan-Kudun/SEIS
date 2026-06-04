"use client";

import { FormEvent, useMemo, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { HomeDictionary, Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { siteConfig } from "@/lib/site-config";
import { getUiDictionary } from "@/lib/site-i18n";

type ContactSectionProps = {
  dict: HomeDictionary;
  locale: Locale;
};

type FormState = {
  name: string;
  email: string;
  service: string;
  message: string;
  website: string;
  turnstileToken: string;
  hcaptchaToken: string;
};

type ContactApiResponse = {
  ok: boolean;
  request_id: string;
  channel_used: "resend" | "api" | "mailto" | "php";
  fallback_level: 0 | 1 | 2 | 3;
  message: string;
  error_code?: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  service: "cinematic-portfolio-os",
  message: "",
  website: "",
  turnstileToken: "",
  hcaptchaToken: ""
};

function buildMailto(email: string, form: FormState) {
  const subject = encodeURIComponent(`Portfolio request • ${form.service}`);
  const body = encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      "",
      "Message:",
      form.message
    ].join("\n")
  );

  return `mailto:${email}?subject=${subject}&body=${body}`;
}

async function fallbackToPhp(form: FormState): Promise<{ ok: boolean; message: string }> {
  try {
    const data = new URLSearchParams();
    data.set("name", form.name);
    data.set("email", form.email);
    data.set("service", form.service);
    data.set("message", form.message);
    data.set("_gotcha", form.website);

    const response = await fetch("/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      keepalive: true
    });

    const payload = (await response.json()) as { ok?: boolean; message?: string };
    return { ok: Boolean(payload.ok), message: payload.message || "PHP fallback completed." };
  } catch {
    return { ok: false, message: "PHP fallback failed." };
  }
}

export function ContactSection({ dict, locale }: ContactSectionProps) {
  const ui = getUiDictionary(locale);
  const creative = getCreativeDictionary(locale);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "warn" | "error"; message: string }>({
    type: "idle",
    message: ""
  });

  const mailtoHref = useMemo(() => buildMailto(siteConfig.email, form), [form]);

  async function submitViaApi(payload: FormState): Promise<ContactApiResponse> {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...payload,
        locale
      })
    });

    const body = (await response.json()) as ContactApiResponse;
    if (!response.ok || !body.ok) {
      throw new Error(body.message || creative.contactFormError);
    }

    return body;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const result = await submitViaApi(form);
      const nextType = result.channel_used === "resend" ? "success" : "warn";
      const nextMessage =
        result.channel_used === "resend"
          ? creative.contactFormSuccess
          : "Primary provider was unavailable. API fallback accepted your request.";

      setForm(initialFormState);
      setStatus({ type: nextType, message: nextMessage });
      void trackEvent({
        name: "contact_request_submitted",
        scope: "contact-form",
        label: `${form.service}:${result.channel_used}`,
        locale
      });
      return;
    } catch {
      window.location.href = mailtoHref;

      const phpFallback = await fallbackToPhp(form);
      if (phpFallback.ok) {
        setStatus({
          type: "warn",
          message:
            "API failed. Mail client opened and PHP fallback also delivered your request successfully."
        });
      } else {
        setStatus({
          type: "error",
          message:
            "API failed. Mail client opened for manual send, and PHP fallback was unavailable."
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-surface p-6 shadow-cinematic glass-panel sm:p-8" delay={0.21}>
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{dict.sectionContact}</p>
        <h2 className="mt-2 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">{dict.contactTitle}</h2>
        <p className="mt-3 max-w-2xl text-sm text-seis-muted sm:text-base">{dict.contactCopy}</p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
            {creative.contactFormName}
            <input
              required
              minLength={2}
              maxLength={80}
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
            />
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
            {creative.contactFormEmail}
            <input
              required
              type="email"
              maxLength={160}
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
            />
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted sm:col-span-2">
            {creative.contactFormService}
            <select
              value={form.service}
              onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
              className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
            >
              <option value="cinematic-portfolio-os">Cinematic Portfolio OS</option>
              <option value="saas-product-experience">SaaS Product Experience</option>
              <option value="ai-integration-readiness">AI Integration Readiness</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted sm:col-span-2">
            {creative.contactFormMessage}
            <textarea
              required
              minLength={24}
              maxLength={2000}
              rows={5}
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              className="rounded-lg border border-seis-line bg-seis-bg px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
            />
          </label>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
            className="hidden"
            aria-hidden="true"
          />
          <input
            type="hidden"
            name="turnstileToken"
            value={form.turnstileToken}
            onChange={(event) => setForm((prev) => ({ ...prev, turnstileToken: event.target.value }))}
          />
          <input
            type="hidden"
            name="hcaptchaToken"
            value={form.hcaptchaToken}
            onChange={(event) => setForm((prev) => ({ ...prev, hcaptchaToken: event.target.value }))}
          />

          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : creative.contactFormSubmit}
            </Button>
            <Button asChild variant="ghost">
              <a href={mailtoHref}>Mailto fallback</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="/contact.html" target="_self">
                PHP fallback
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href={`/services?lang=${locale}`}>{ui.navServices}</a>
            </Button>
          </div>
        </form>

        {status.type !== "idle" ? (
          <p
            className={`mt-4 text-sm ${
              status.type === "success"
                ? "text-emerald-300"
                : status.type === "warn"
                  ? "text-amber-300"
                  : "text-red-300"
            }`}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        ) : null}
      </FadeIn>
    </section>
  );
}
