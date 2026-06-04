# UX Apps

UX Apps is a low-power full-stack foundation for a calm, cinematic, humane UX application ecosystem.

This iCloud Drive checkout is the lightweight UX Apps repository. Larger SEIS portfolio work can be linked into this repo through documented handoff records instead of copying generated caches, framework output, or archive metadata directly into the foundation.

The first release intentionally avoids dependency bloat. It uses:

- native Node.js HTTP APIs
- static HTML/CSS/JavaScript frontend
- JSON-backed application/governance manifests
- built-in Node test runner
- lightweight local quality checks

The previous static catalog files at the repository root are kept as a rollback-friendly baseline. The full-stack runtime serves the newer app from `public/`.

## Run

```bash
npm run dev
```

Open `http://127.0.0.1:3000`.

To serve the older static root directly:

```bash
npm run serve:static
```

## Quality

```bash
npm run quality
```

## GitHub Handoff

Current prepared SEIS source package:

- source checkout: `/Users/emirhan/Documents/Github a gönderilecekler/New project`
- source commit: `4e8fb380 chore(repo): prepare ux apps github handoff`
- integration record: `docs/github-handoff.md`
- long-term program: `docs/long-term-development-program.md`

The handoff keeps this UX Apps repo dependency-free while documenting how the larger static portfolio, Next.js foundation, and SEIS governance layer should be reviewed before any future merge.

The original zip at `/Users/emirhan/Downloads/Github a gönderilecekler.zip` is treated as a source inventory, not a folder to mirror. Future work should promote useful UI, UX, cinematic, 3D, data, API, and governance ideas from that archive in small reviewed steps.

## API

- `GET /api/health`
- `GET /api/apps`
- `GET /api/manifest`
- `GET /api/governance`
- `GET /api/cinematic-program`
- `GET /api/archive-insights`
- `GET /api/zip-promotion-lab`
- `GET /api/observability`
- `POST /api/contact`

## Design Direction

The interface is cinematic but restrained: a lightweight canvas atmosphere, semantic content, reduced-motion support, and API-driven cards. Heavy framework and 3D dependencies can be added later behind budget notes.

The current cinematic layer is dependency-free. It adapts ideas from the SEIS zip source into quality presets, motion depths, source signals, and a CSS/canvas spatial program before any Three.js-level dependency is considered.

The archive intelligence layer turns zip analysis into a source-to-feature map. It records which SEIS files informed each candidate, what guardrail applies, and which ideas should become reviewed UX features next.

The zip promotion lab adds the decision layer for future imports. It keeps design, quality, accessibility, branch maturity, and publish readiness candidates visible while blocking wholesale imports of Next.js output, dependency folders, or repository metadata.
