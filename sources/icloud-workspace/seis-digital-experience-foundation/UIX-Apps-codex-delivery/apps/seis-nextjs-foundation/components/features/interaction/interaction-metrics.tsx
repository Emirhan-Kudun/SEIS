type InteractionMetricsProps = {
  hoverPatterns: number;
  motionPatterns: number;
  locales: number;
  principles: number;
};

export function InteractionMetrics({ hoverPatterns, motionPatterns, locales, principles }: InteractionMetricsProps) {
  const cards = [
    { label: "Hover", value: hoverPatterns },
    { label: "Motion", value: motionPatterns },
    { label: "Locales", value: locales },
    { label: "Principles", value: principles }
  ];

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-4">
      {cards.map((item) => (
        <article key={item.label} className="rounded-lg border border-seis-line bg-seis-surface p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">{item.label}</p>
          <p className="mt-1 font-serif text-3xl">{item.value}</p>
        </article>
      ))}
    </div>
  );
}
