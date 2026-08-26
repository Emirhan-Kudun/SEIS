# Icon System Research Notes

Bounded design research done before building `packages/design-tokens/icons/`
and the `apps/desktop` shell contract (2026-08-01). Three searches, real
sources, real conclusions — not a claim of exhaustive market research.

## What was asked

1. How do current (2025) geometric / dark-mode app icon systems avoid looking
   generic, and what makes them legible at small sizes?
2. How do real cross-platform desktop projects share one UI/design contract
   across macOS, Windows, and Linux instead of building three unrelated apps?
3. How do icon systems stay in sync with design tokens instead of drifting?

## Findings and sources

**Icon design (one shape, two colors, no decoration).** 2025 practice favors
legibility over decoration: "communicate the design with one shape and two
colors, rather than adding gradients, shadows, textures, highlights" ([App Icon
Design Trends 2025](https://iconmaker.studio/blog/app-icon-design-trends-2025)).
Monochrome/limited-palette SVGs that hold up from 1024px down to ~29px are the
baseline ([App icon design tips](https://www.apptweak.com/en/aso-blog/how-to-design-an-app-icon),
[App Icon: Trends and Best Practices 2025](https://asomobile.net/en/blog/app-icon-trends-and-best-practices-2025/)).
For dark surfaces specifically, avoid pure-white fills and keep a restrained,
token-driven palette ([Dark Mode UI best practices](https://www.onething.design/post/best-practices-for-dark-mode-ui-design)).

  → **Decision:** keep the existing SEIS mark (ring + bars, gold + teal on
  near-black) rather than redesigning it from scratch — it already matches
  this brief. Extend it into a small icon *family* using the same two-color,
  single-dominant-shape rule instead of inventing a new visual language.

**Cross-platform shared contracts.** Real cross-platform desktop projects
(Avalonia, Uno Platform, .NET MAUI) succeed by sharing one logic/design
contract and letting each OS render it with a platform-appropriate shell,
not by forcing pixel-identical UI everywhere ([Avalonia UI](https://avaloniaui.net/),
[Cross-Platform Development for Windows, Linux, macOS](https://codefinity.com/blog/Cross-Platform-Development-or-Building-Applications-for-Windows-Linux-and-macOS)).
The common failure mode is three unrelated native apps that quietly diverge.

  → **Decision:** stop treating macOS as its own island. Add one shared
  `apps/desktop/shell-contract.json` (views, entities, icons) that macOS
  already satisfies (`apps/macos/SEISInspector`) and that Windows/Linux will
  satisfy next — by wrapping the already-working `apps/web` cockpit (same
  entities, same views) in a native shell, rather than rewriting three UIs.
  See `docs/architecture/desktop-shell-unification.md`.

**Icon/token drift prevention.** Design-token tooling literature is explicit
that "using more tokens creates drift" and that CI validation of generated
icon/token output against the canonical source is what actually prevents
regressions, not manual review ([Design Token Management Tools 2025](https://cssauthor.com/design-token-management-tools/),
[Icons, done in the Design Tokens way](https://bootcamp.uxdesign.cc/icons-in-the-design-tokens-way-24c39cdcbc6a)).
Inconsistent `viewBox` values across an icon set are called out as a recurring
real-world bug.

  → **Decision:** every icon is registered in
  `packages/design-tokens/icons/icon-manifest.json` with its expected
  `viewBox`, and `npm run check:icon-system` fails CI if a file's actual
  `viewBox` drifts from the manifest, if any hex color falls outside the
  canonical `--seis-*` token palette, or if an icon contains a `<text>`
  element (the concrete, permanent enforcement of "icons and logos are
  visual, never text").

## Non-goals

- No new visual language, no gradients/3D/mascot — out of scope per the
  research above and V14's anti-bloat rule (§44).
- No claim that a Windows app is shipped or working — the shell contract
  records `platforms.windows.status` honestly as
  `shell_scaffolded_build_pending` (source exists, entirely unverified; no
  Windows toolchain available in this environment). Linux is
  `reference_implementation`, on real evidence: compiled, run, and
  screenshot-verified under Ubuntu 24.04 — see
  `apps/desktop/native/README.md`.
