type HoverChipProps = {
  label: string;
};

export function HoverChip({ label }: HoverChipProps) {
  return (
    <span className="inline-flex rounded-full border border-seis-line px-3 py-1 text-xs uppercase tracking-[0.08em] text-seis-muted transition-colors duration-200 hover:border-seis-accent hover:text-seis-accent">
      {label}
    </span>
  );
}
