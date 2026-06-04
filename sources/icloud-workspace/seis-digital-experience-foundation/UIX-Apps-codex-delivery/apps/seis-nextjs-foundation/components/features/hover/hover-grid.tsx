import { HoverCard } from "@/components/features/hover/hover-card";
import { HoverChip } from "@/components/features/hover/hover-chip";
import { HoverLift } from "@/components/features/hover/hover-lift";
import { HoverOutline } from "@/components/features/hover/hover-outline";
import { HoverSpotlight } from "@/components/features/hover/hover-spotlight";

export function HoverGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <HoverCard title="Hover Lift" subtitle="feedback">
        <HoverLift>Subtle spatial response for premium card feedback.</HoverLift>
      </HoverCard>
      <HoverCard title="Outline Focus" subtitle="clarity">
        <HoverOutline>Border emphasis for predictable interaction discovery.</HoverOutline>
      </HoverCard>
      <HoverCard title="Spotlight" subtitle="mood">
        <HoverSpotlight>Light atmospheric highlight without layout shift.</HoverSpotlight>
      </HoverCard>
      <HoverCard title="Chip Language" subtitle="i18n">
        <div className="flex flex-wrap gap-2">
          <HoverChip label="TR" />
          <HoverChip label="EN" />
          <HoverChip label="FR" />
          <HoverChip label="IT" />
          <HoverChip label="DE" />
        </div>
      </HoverCard>
    </div>
  );
}
