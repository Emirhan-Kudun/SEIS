import type { Metadata } from "next";
import Link from "next/link";

import { designPrinciples, designTokenGroups } from "@seis/content/design-system";

export const metadata: Metadata = {
  title: "Design System",
  description: "SEIS design system principles, tokens and calm interface governance."
};

export default function DesignSystemPage() {
  return (
    <main className="page-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <Link href="/" className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/runtime">Runtime</Link>
          <Link href="/ops">Ops</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>

      <section className="section page-hero">
        <p className="eyebrow">SEIS Design System</p>
        <h1>Calm cinematic rules for a premium portfolio runtime.</h1>
        <p>
          This surface documents the visual and interaction rules that keep the website expressive without becoming noisy.
        </p>

        <div className="card-grid">
          {designPrinciples.map((principle) => (
            <article className="work-card" key={principle.id}>
              <p className="kicker">{principle.id}</p>
              <h2>{principle.title}</h2>
              <p>{principle.summary}</p>
              <span>{principle.signal}</span>
            </article>
          ))}
        </div>

        <div className="runtime-grid design-token-grid">
          {designTokenGroups.map((group) => (
            <article className="runtime-card" data-status="active" key={group.id}>
              <p className="kicker">Token group</p>
              <h2>{group.label}</h2>
              <p>{group.values.join(" / ")}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
