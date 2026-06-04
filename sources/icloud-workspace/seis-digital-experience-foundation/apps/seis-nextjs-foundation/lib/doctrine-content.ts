import { readFileSync } from "node:fs";
import path from "node:path";

export type DoctrineBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type DoctrineDocument = {
  slug: string;
  title: string;
  summary: string;
  blocks: DoctrineBlock[];
};

type DoctrineMeta = {
  slug: string;
  file: string;
  title: string;
  summary: string;
};

const doctrineDirectory = path.join(process.cwd(), "content", "doctrine");

const doctrineRegistry: DoctrineMeta[] = [
  {
    slug: "design-civilization",
    file: "design-civilization.mdx",
    title: "Design Civilization Doctrine",
    summary: "The website behaves like a calm creative institution, not a noisy product shell."
  },
  {
    slug: "fullstack-runtime",
    file: "fullstack-runtime.mdx",
    title: "Full-Stack Runtime Doctrine",
    summary: "The backend stays useful, observable, and light enough for local machines."
  },
  {
    slug: "branch-governance",
    file: "branch-governance.mdx",
    title: "Branch Governance Doctrine",
    summary: "Future branch families are documented as policy while the active line remains stable."
  },
  {
    slug: "observability",
    file: "observability.mdx",
    title: "Humane Observability Doctrine",
    summary: "Monitoring should reduce operational anxiety, not create dashboard pressure."
  }
];

function stripFrontmatter(source: string): string {
  return source.replace(/^---[\s\S]*?---\s*/, "").trim();
}

function parseDoctrineBlocks(source: string): DoctrineBlock[] {
  const lines = stripFrontmatter(source).split(/\r?\n/);
  const blocks: DoctrineBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", text: line.slice(2).trim() });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2).trim());
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export function getDoctrineIndex() {
  return doctrineRegistry.map(({ slug, title, summary }) => ({ slug, title, summary }));
}

export function getDoctrineDocument(slug: string): DoctrineDocument | null {
  const meta = doctrineRegistry.find((item) => item.slug === slug);
  if (!meta) return null;

  const source = readFileSync(path.join(doctrineDirectory, meta.file), "utf8");

  return {
    slug: meta.slug,
    title: meta.title,
    summary: meta.summary,
    blocks: parseDoctrineBlocks(source)
  };
}

export function getDoctrineDocuments(): DoctrineDocument[] {
  return doctrineRegistry.flatMap((item) => {
    const document = getDoctrineDocument(item.slug);
    return document ? [document] : [];
  });
}

export function getDoctrineStaticParams() {
  return doctrineRegistry.map((item) => ({ slug: item.slug }));
}
