import { HoverGlow } from "@/components/features/hover/hover-glow";
import { HoverGrid } from "@/components/features/hover/hover-grid";
import { HoverTilt } from "@/components/features/hover/hover-tilt";
import { HoverUnderline } from "@/components/features/hover/hover-underline";

export function HoverPreviewPanel() {
  return (
    <section className="rounded-xl border border-seis-line bg-seis-surface p-4">
      <h2 className="font-serif text-3xl">Hover Preview</h2>
      <p className="mt-2 text-sm text-seis-muted">
        Premium hover behaviors with low-jank transitions and readable visual hierarchy.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <HoverGlow>
          <HoverUnderline>Accent underline for key interactive labels.</HoverUnderline>
        </HoverGlow>
        <HoverTilt>Pointer-aware tilt for high-value preview blocks.</HoverTilt>
      </div>
      <div className="mt-3">
        <HoverGrid />
      </div>
    </section>
  );
}
