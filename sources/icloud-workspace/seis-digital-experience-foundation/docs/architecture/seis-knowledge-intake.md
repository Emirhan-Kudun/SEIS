# SEIS Knowledge Intake Architecture

Status: active architecture  
Mission: `SEIS-M002`

SEIS knowledge intake converts large external archives into small, reviewable, token-efficient maps before any content is imported into Git.

## Purpose

The current SEIS source archive is stored outside Git history:

`/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/_SEIS_ARCHIVE/2026-05-31/SEIS.zip`

The archive contains nested SEIS packs. Some packs are small and structural. Others contain thousands of markdown files and must remain archive-only until a focused mission needs them.

## Intake Principles

- Keep ZIP files outside Git history.
- Generate a manifest before extracting content.
- Import indexes and registries before full documents.
- Route each pack to domains and owner agents.
- Defer huge markdown packs by default.
- Keep the active context small.

## Pack Decisions

High-priority structural packs may be inspected first:

- `SEIS_Agent_Ecosystem_Pack.zip`
- `SEIS_Foundation_Pack_v1.zip`
- `SEIS_Token_Efficient_Universal_Pack.zip`
- `SEIS_Multi_Language_Engineering_Pack.zip`
- `SEIS_Master_Archive_Unified_v1.zip`
- `SEIS_Constitution_Pack.zip`

Huge knowledge packs remain deferred unless a mission needs a precise domain:

- `SEIS_V12_300Domain_20000Markdown.zip`
- `SEIS_Mega_Versioned_Ecosystem.zip`
- other large expansion packs

## Workflow

1. Run `npm run generate:seis-knowledge-manifest`.
2. Review `data/seis/knowledge-intake-manifest.json`.
3. Run `npm run check:seis-knowledge-intake`.
4. Open only the high-priority pack indexes required by the current mission.
5. Create a separate mission before importing any extracted content.

## Non-Goals

This mission does not import the full SEIS knowledge base. It only gives the system a stable routing map for future selective intake.

## Follow-Up Mission

`SEIS-M003` performs selective index extraction from high-priority packs. It should not import full knowledge packs; it only creates a compact active-context bridge.
