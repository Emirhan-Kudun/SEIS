import Link from "next/link";

import { getDoctrineIndex } from "@/lib/doctrine-content";

type DoctrinePageProps = {
  searchParams?: { lang?: string };
};

export default function DoctrinePage({ searchParams }: DoctrinePageProps) {
  const lang = searchParams?.lang || "tr";
  const documents = getDoctrineIndex();

  return (
    <main className="mx-auto w-[min(1040px,calc(100vw-1.5rem))] py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-seis-accent">SEIS doctrine</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Calm full-stack civilization rules.</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-seis-muted">
        These MDX-backed notes define the production constraints behind the cinematic website, runtime APIs,
        governance model, and observability posture.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {documents.map((item) => (
          <Link
            key={item.slug}
            href={`/doctrine/${item.slug}?lang=${lang}`}
            className="rounded-lg border border-seis-line bg-seis-surface p-5 transition-colors hover:border-seis-accent"
          >
            <h2 className="font-serif text-2xl text-seis-text">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-seis-muted">{item.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
