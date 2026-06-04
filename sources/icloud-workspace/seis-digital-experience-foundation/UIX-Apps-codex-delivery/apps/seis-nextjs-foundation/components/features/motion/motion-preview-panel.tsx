import { BlurReveal } from "@/components/features/motion/blur-reveal";
import { FloatLoop } from "@/components/features/motion/float-loop";
import { MaskWipe } from "@/components/features/motion/mask-wipe";
import { PulseBorder } from "@/components/features/motion/pulse-border";
import { ReducedMotionNote } from "@/components/features/motion/reduced-motion-note";
import { ScaleFade } from "@/components/features/motion/scale-fade";
import { TimelineStrip } from "@/components/features/motion/timeline-strip";

export function MotionPreviewPanel() {
  return (
    <section className="rounded-xl border border-seis-line bg-seis-surface p-4">
      <h2 className="font-serif text-3xl">Motion Preview</h2>
      <p className="mt-2 text-sm text-seis-muted">
        Cinematic but restrained motion behaviors tuned for readability and predictable performance.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <BlurReveal>
          <PulseBorder>Blur reveal + pulse border combo for premium state emphasis.</PulseBorder>
        </BlurReveal>
        <ScaleFade>
          <MaskWipe>
            <FloatLoop>
              <div className="rounded-lg border border-seis-line px-3 py-2 text-sm text-seis-muted">
                Float loop + mask wipe keeps the interface alive without motion overload.
              </div>
            </FloatLoop>
          </MaskWipe>
        </ScaleFade>
      </div>
      <div className="mt-3">
        <TimelineStrip />
      </div>
      <div className="mt-3">
        <ReducedMotionNote />
      </div>
    </section>
  );
}
