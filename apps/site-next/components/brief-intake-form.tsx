"use client";

import { type FormEvent, useState } from "react";

import type { LocalizedDictionary, ServiceItem } from "@seis/content";

type BriefState = "idle" | "sending" | "sent" | "error";

export function BriefIntakeForm({
  dictionary,
  services
}: {
  dictionary: LocalizedDictionary;
  services: ServiceItem[];
}) {
  const [briefState, setBriefState] = useState<BriefState>("idle");

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setBriefState("sending");
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    const response = await fetch("/api/briefs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => null);

    setBriefState(response?.ok ? "sent" : "error");
    if (response?.ok) {
      formElement.reset();
    }
  }

  return (
    <form className="brief-form" id="brief-form" onSubmit={submitBrief}>
      <h3>{dictionary.briefTitle}</h3>
      <div className="form-grid">
        <label>
          <span>{dictionary.briefName}</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span>{dictionary.briefEmail}</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span>{dictionary.briefService}</span>
          <select name="service" defaultValue="ui-ux">
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.title}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{dictionary.briefTimeline}</span>
          <input name="timeline" placeholder="2-6 weeks" />
        </label>
        <label>
          <span>{dictionary.briefBudget}</span>
          <input name="budget" placeholder="Discovery / scoped / open" />
        </label>
        <label>
          <span>{dictionary.briefPriority}</span>
          <select name="priority" defaultValue="calm">
            <option value="calm">Calm planning</option>
            <option value="near">Near-term launch</option>
            <option value="urgent">Urgent repair</option>
          </select>
        </label>
      </div>
      <label>
        <span>{dictionary.briefScope}</span>
        <input name="scope" placeholder="Brand, website, Behance, drawings, 3D..." />
      </label>
      <label>
        <span>{dictionary.briefMessage}</span>
        <textarea name="goal" required minLength={12} rows={5} />
      </label>
      <button className="primary-link" type="submit" disabled={briefState === "sending"}>
        {briefState === "sending" ? dictionary.briefSending : dictionary.briefSubmit}
      </button>
      <p className="form-status" role="status">
        {briefState === "sent" && dictionary.briefAccepted}
        {briefState === "error" && dictionary.briefError}
      </p>
    </form>
  );
}
