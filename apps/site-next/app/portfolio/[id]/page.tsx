import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { siteMeta, works } from "@seis/content";

type WorkDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return works.map((work) => ({ id: work.id }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const work = works.find((item) => item.id === id);

  if (!work) {
    return {};
  }

  return {
    title: work.title,
    description: work.summary,
    alternates: {
      canonical: `/portfolio/${work.id}`
    },
    openGraph: {
      title: `${work.title} | ${siteMeta.author}`,
      description: work.summary,
      url: `/portfolio/${work.id}`
    }
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const work = works.find((item) => item.id === id);

  if (!work) {
    notFound();
  }

  return (
    <main className="page-shell detail-shell">
      <nav className="top-nav" aria-label="Project navigation">
        <Link href="/" className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/case-studies">Case studies</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
      <article className="section page-hero detail-article">
        <p className="eyebrow">{work.tag} / Project Detail</p>
        <h1>{work.title}</h1>
        <div className="detail-grid">
          <section>
            <h2>Signal</h2>
            <p>{work.summary}</p>
          </section>
          <section>
            <h2>Impact</h2>
            <p>{work.impact}</p>
          </section>
          <section>
            <h2>Execution Logic</h2>
            <p>
              This detail route turns a selected work card into a shareable project surface with metadata,
              canonical URL and enough structure for a deeper visual case page later.
            </p>
          </section>
        </div>
        <Link className="primary-link" href="/contact">Start a brief</Link>
      </article>
    </main>
  );
}
