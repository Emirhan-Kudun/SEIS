import Link from "next/link";
import { notFound } from "next/navigation";

import { getDoctrineDocument, getDoctrineStaticParams } from "@/lib/doctrine-content";

type DoctrineDetailPageProps = {
  params: { slug: string };
  searchParams?: { lang?: string };
};

export function generateStaticParams() {
  return getDoctrineStaticParams();
}

export default function DoctrineDetailPage({ params, searchParams }: DoctrineDetailPageProps) {
  const document = getDoctrineDocument(params.slug);
  if (!document) notFound();

  const lang = searchParams?.lang || "tr";

  return (
    <main className="mx-auto w-[min(860px,calc(100vw-1.5rem))] py-12">
      <Link href={`/doctrine?lang=${lang}`} className="text-xs uppercase tracking-[0.14em] text-seis-accent">
        Back to doctrine
      </Link>
      <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">{document.title}</h1>
      <p className="mt-4 text-sm leading-6 text-seis-muted">{document.summary}</p>

      <article className="mt-8 grid gap-5 rounded-xl border border-seis-line bg-seis-surface p-6 shadow-cinematic glass-panel sm:p-8">
        {document.blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2 key={`${block.type}-${index}`} className="font-serif text-3xl text-seis-text">
                {block.text}
              </h2>
            );
          }

          if (block.type === "list") {
            return (
              <ul key={`${block.type}-${index}`} className="grid gap-2 text-sm leading-6 text-seis-muted">
                {block.items.map((item) => (
                  <li key={item} className="rounded-md border border-seis-line bg-seis-card px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={`${block.type}-${index}`} className="text-sm leading-7 text-seis-muted">
              {block.text}
            </p>
          );
        })}
      </article>
    </main>
  );
}
