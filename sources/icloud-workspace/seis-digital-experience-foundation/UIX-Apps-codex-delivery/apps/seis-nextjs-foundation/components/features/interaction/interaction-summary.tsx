import type { InteractionDictionary } from "@/lib/features/i18n/interaction-dictionary";

type InteractionSummaryProps = {
  dict: InteractionDictionary;
};

export function InteractionSummary({ dict }: InteractionSummaryProps) {
  return (
    <header>
      <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{dict.eyebrow}</p>
      <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{dict.title}</h1>
      <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">{dict.lead}</p>
    </header>
  );
}
