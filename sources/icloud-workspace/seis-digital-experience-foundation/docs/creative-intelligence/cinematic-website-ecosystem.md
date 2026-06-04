# Cinematic Website Ecosystem

This document converts the SEIS website direction into a production-safe experience architecture.

## Experience Thesis

SEIS should feel like a calm intelligence institution, not a noisy product surface. The website should create confidence through composition, pacing, content clarity, and restraint.

## Interface Principles

- Use editorial rhythm before decorative effects.
- Let whitespace create focus instead of filling every viewport.
- Make the first viewport cinematic without hiding the next section.
- Keep navigation predictable, compact, and mobile-first.
- Treat each interaction as a small continuity cue, not a spectacle.
- Preserve readable multilingual labels for TR, EN, FR, IT, and DE.

## Page System

Recommended page families:

- `home`: cinematic identity, current work, institutional signal.
- `works`: curated portfolio browser with calm filtering.
- `studio`: design doctrine, creative intelligence, operating principles.
- `services`: practical capability map without startup-style hype.
- `governance`: branch, release, observability, and quality gates.
- `insights`: editorial knowledge base, experiments, and reports.
- `contact`: direct, accessible, low-friction communication.

## Component System

Core components should remain reusable and quiet:

- `AtmosphericHero`: strong first impression, no text card wrapper.
- `EditorialSection`: constrained content grid with predictable rhythm.
- `WorkIndex`: scannable project list with image and metadata.
- `DoctrinePanel`: short principles, not long manifest blocks.
- `MetricStrip`: sparse operational signals, not dashboard overload.
- `TimelineRail`: release and research progress with low motion.
- `LanguageSwitch`: compact multilingual control with no layout shift.

## 3D And Spatial Layer

3D is allowed only when it improves atmosphere, spatial identity, or storytelling.

Rules:

- Load 3D lazily below critical content unless it is the primary hero scene.
- Always provide a static fallback image or CSS composition.
- Respect `prefers-reduced-motion`.
- Avoid constant camera motion on text-heavy pages.
- Keep geometry, materials, and textures intentionally sparse.
- Do not add React Three Fiber or Drei until the specific scene has a budget and fallback.

## Motion Layer

Approved motion:

- opacity reveal
- small transform reveal
- slow scroll continuity
- subtle image parallax only when nonessential
- short hover feedback on actionable elements

Rejected motion:

- looping attention effects
- aggressive scale changes
- bounce-heavy transitions
- motion that delays reading
- mobile motion that increases thermal pressure

## Stack Placement

Current repository signals:

- Static production surface exists at the repository root.
- Next.js foundation exists under `apps/seis-nextjs-foundation`.
- Framer Motion and GSAP are present in the Next.js foundation.
- React Three Fiber, Drei, MDX, and Contentlayer should remain planned additions until a scoped implementation needs them.

## Implementation Sequence

1. Stabilize design tokens, typography, spacing, and i18n continuity.
2. Move reusable interface patterns into the Next.js foundation.
3. Add content-driven pages only after the editorial model is agreed.
4. Add restrained motion with reduced-motion fallbacks.
5. Add one scoped 3D scene only after performance and fallback budgets exist.
6. Promote the Next.js surface after parity checks with the static site pass.

## Non-Goals

- No full website rewrite without explicit approval.
- No new heavy visual framework for decoration alone.
- No telemetry or analytics that creates alert fatigue.
- No branch policy expansion without governance script alignment.
