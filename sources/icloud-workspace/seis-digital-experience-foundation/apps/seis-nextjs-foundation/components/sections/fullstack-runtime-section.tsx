import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { runtimeCapabilities, runtimeModes } from "@/lib/fullstack-runtime";

export function FullStackRuntimeSection() {
  return (
    <section id="fullstack-runtime" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-surface p-6 shadow-cinematic glass-panel sm:p-8" delay={0.16}>
        <SectionHeading eyebrow="Full-stack runtime" title="Light backend, clear contracts, no local machine pressure." />

        <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {runtimeCapabilities.map((item) => (
              <article key={item.id} className="rounded-lg border border-seis-line bg-seis-card/70 p-4">
                <p className="font-serif text-xl text-seis-text">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-seis-muted">{item.detail}</p>
                <code className="mt-3 block rounded-md border border-seis-line bg-seis-bg px-3 py-2 text-xs text-seis-accent">
                  {item.endpoint}
                </code>
              </article>
            ))}
          </div>

          <aside className="rounded-lg border border-seis-line bg-seis-bg p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">Runtime modes</p>
            <div className="mt-4 grid gap-3">
              {runtimeModes.map((mode) => (
                <div key={mode.id} className="rounded-md border border-seis-line bg-seis-card/60 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-seis-text">{mode.label}</p>
                    <span className="rounded-full border border-seis-line px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-seis-muted">
                      {mode.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-seis-muted">{mode.detail}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </FadeIn>
    </section>
  );
}
