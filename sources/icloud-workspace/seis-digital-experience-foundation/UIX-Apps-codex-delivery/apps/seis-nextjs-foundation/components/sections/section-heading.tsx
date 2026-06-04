type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{eyebrow}</p>
      <h2 className="mt-2 max-w-4xl font-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
