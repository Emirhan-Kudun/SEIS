# SEIS Motion and 3D Expansion Notes

## Scope

- Surface: `apps/site-next`
- Route: `/motion`
- Goal: add a visible 3D and animation laboratory that connects WebGL, HTML, CSS, JavaScript, JSON, Swift, Android, PHP and the existing SEIS portfolio system.

## Implementation

- Added `MotionLanguageStage` as a viewport-aware Three.js scene with low-power renderer settings.
- Added reduced-motion and WebGL fallback behavior through a static language constellation.
- Expanded software language coverage from 10 to 14 records.
- Added `navMotion`, motion copy and roadmap strings across 5 locales.
- Added `language-constellation-motion` to the runtime scene preset registry.

## Next Animation Planning Backlog

- Add visual mode controls for calm, editorial and high-motion scene pacing.
- Add screenshot/canvas pixel verification once Playwright is installed.
- Add deeper Swift, Android and PHP adapter docs before shipping native/backend examples.
- Add bundle and first-view image budget reporting to the release evidence script.

## Evidence Log

- Command: `npm run lint`
- Result: passed
- Timestamp: 2026-05-26T20:14:49Z

- Command: `npm run checks`
- Result: passed
- Timestamp: 2026-05-26T20:14:49Z

- Command: `npm run typecheck`
- Result: passed
- Timestamp: 2026-05-26T20:14:49Z

- Command: `npm run build --workspace apps/site-next`
- Result: passed
- Timestamp: 2026-05-26T20:14:49Z

- Command: `curl -I -s http://localhost:3001/tr/motion`
- Result: 200 OK
- Timestamp: 2026-05-26T20:14:49Z

- Command: `curl -I -s 'http://localhost:3001/motion?lang=en'`
- Result: 301 to `/en/motion`
- Timestamp: 2026-05-26T20:14:49Z
