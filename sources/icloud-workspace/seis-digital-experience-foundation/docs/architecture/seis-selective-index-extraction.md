# SEIS Selective Index Extraction

Status: active architecture  
Mission: `SEIS-M003`

SEIS-M003 extracts only small routing, index, registry, manifest, README, and constitution-style files from high-priority SEIS archive packs.

## Purpose

SEIS-M002 created a manifest for the full `SEIS.zip` archive. SEIS-M003 turns the highest-value structural pack entries into a compact index extract that can be used by future missions without opening the full archive.

## Extraction Rules

- Extract only packs marked `high` in `data/seis/knowledge-intake-manifest.json`.
- Ignore `__MACOSX` and `._*` archive metadata.
- Prefer filenames containing `index`, `registry`, `manifest`, `routing`, `start`, `readme`, `constitution`, `law`, `domain`, `workflow`, or `token`.
- Limit each pack to a small number of extracted entries.
- Truncate large file bodies and preserve metadata about truncation.
- Do not extract giant knowledge packs.

## Output

The generated extract lives at:

`data/seis/selective-index-extracts.json`

This file is an active context bridge, not a full knowledge import.

## Next Use

Future missions can use this extract to decide which small source documents deserve promotion into first-class SEIS docs or registries.
