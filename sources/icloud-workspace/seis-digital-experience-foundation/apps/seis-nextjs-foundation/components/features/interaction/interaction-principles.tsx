type InteractionPrinciplesProps = {
  title: string;
  items: string[];
};

export function InteractionPrinciples({ title, items }: InteractionPrinciplesProps) {
  return (
    <section className="rounded-xl border border-seis-line bg-seis-surface p-4">
      <h2 className="font-serif text-3xl">{title}</h2>
      <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
