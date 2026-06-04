# SEIS Foundation Blueprint

Status: foundation architecture  
Mission: `SEIS-M001`

SEIS is organized as a layered operating system rather than a single application.

## Core Layers

### 1. Source Of Truth Layer

GitHub stores code, documentation, workflows, registries, prompts, governance records, and architecture decisions.

### 2. Archive Layer

iCloud and Google Drive store large creative and knowledge assets such as ZIP, PSD, AI, INDD, MP4, MOV, exports, and backups.

### 3. Mission Control Layer

Mission Control tracks the single active mission, status, owner agents, validation, documentation outputs, and rollback path.

### 4. Agent Role Layer

Agent roles are permanent and model-independent. Execution engines can change, but role responsibilities stay stable.

### 5. Domain Map Layer

Domains route work into creative, product, engineering, AI, data, security, documentation, and governance contexts.

### 6. Knowledge Intake Layer

Large archives are indexed before use. The system imports manifests and selected indexes first, not full knowledge packs.

### 7. Context Routing Layer

Context routing maps missions to only the files needed for that mission. This protects token efficiency and keeps decisions local.

### 8. Implementation Surface Layer

Implementation surfaces include:

- web interface
- documentation system
- automation scripts
- polyglot engineering contracts
- future mobile and cloud surfaces

## Architecture Principles

- Start with registries before automation.
- Keep large archives outside Git history.
- Prefer small mission-scoped commits.
- Make every file operationally useful.
- Activate languages and frameworks only when the mission needs them.
- Preserve accessibility, performance, and rollback safety.

## Current Foundation Decision

The iCloud Drive repository at:

`/Users/emirhan/Library/Mobile Documents/com~apple~CloudDocs/Github/seis-digital-experience-foundation`

is the canonical local SEIS/UIXApps foundation workspace.

The large `SEIS.zip` archive belongs in the iCloud archive layer, with only manifest and intake metadata tracked in Git.
