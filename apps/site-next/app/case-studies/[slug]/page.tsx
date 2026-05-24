import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { caseStudies, siteMeta } from "@seis/content";

type CaseStudyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return {};
  }

  return {
    title: study.title,
    description: study.challenge,
    alternates: {
      canonical: `/case-studies/${study.slug}`
    },
    openGraph: {
      title: `${study.title} | ${siteMeta.author}`,
      description: study.challenge,
      url: `/case-studies/${study.slug}`
    }
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="page-shell detail-shell">
      <nav className="top-nav" aria-label="Case study navigation">
        <Link href="/" className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href="/case-studies">Case studies</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/runtime">Runtime</Link>
        </div>
      </nav>
      <article className="section page-hero detail-article">
        <p className="eyebrow">{study.year} / {study.role}</p>
        <h1>{study.title}</h1>
        <div className="detail-grid">
          <section>
            <h2>Challenge</h2>
            <p>{study.challenge}</p>
          </section>
          <section>
            <h2>Process</h2>
            <ol>
              {study.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section>
            <h2>Solution</h2>
            <p>{study.solution}</p>
          </section>
          <section>
            <h2>Outcome</h2>
            <p>{study.outcome}</p>
          </section>
        </div>
        <Link className="primary-link" href="/contact">Discuss a similar system</Link>
      </article>
    </main>
  );
}
