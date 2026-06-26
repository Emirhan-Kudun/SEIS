# Material Films — Video Hero Showcase

Four full-screen **video-hero** showcase pages behind one URL, built for product showcases and
brand-story openers. Single-file, vanilla JS, no build step.

## The four themes

1. **Nature** — Forest & Ocean: volumetric god-rays, ocean caustics, drifting particulate.
2. **Still Life** — Ceramics & Glassware: a specular highlight orbits implied vessels in a
   single shaft of window light, with dust motes.
3. **Materials** — Leather & Fabric: a moving raking light crosses a procedural weave so the
   surface relief lifts into view as the light passes — texture you can almost touch.
4. **Metal Parts** — Mechanical Gears: interlocking gears mesh against brushed steel while an
   anisotropic sheen band sweeps the teeth, with specular glints.

Each page pairs its motion with **minimalist titles + CTA buttons** and a theme-specific type
treatment (Cormorant Garamond, Inter, Space Grotesk), unified by a cinematic grade
(scrim + vignette + film grain).

## Backgrounds: robust by default, real footage optional

The looping backgrounds are rendered **procedurally on `<canvas>`** — seamless loops, zero
asset weight, instant first paint, and genuine light-shadow / material-texture motion. This is
deliberate: it removes all loading and network risk while still reading as cinematic footage.

To use real footage in production, set `video:'https://…/clip.mp4'` on a hero in the `HEROES`
array. It then **lazy-loads only for the active page**, shows the canvas as an instant poster
until `canplay`, crossfades to the video, and falls back to the canvas on error — the loading
optimisation the brief calls for.

## Navigation & performance

Scroll / swipe / arrow keys / number keys / side-nav dots move between pages with a crossfade.
Only the **active** page's animation loop runs (`requestAnimationFrame` is gated to the current
hero), keeping it light on the CPU/GPU. CTAs advance to the next film or open an info panel.

## Run

Open `index.html`, or serve statically and visit `/apps/video-hero/`.
