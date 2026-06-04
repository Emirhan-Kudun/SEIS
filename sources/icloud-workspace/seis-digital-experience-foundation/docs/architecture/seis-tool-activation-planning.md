# SEIS Tool Activation Planning

SEIS-M005 turns the MCP, skill, and connector registry into a mission-aware activation planner.

The goal is not to use every available tool at once. The goal is to select the smallest useful set of tool surfaces for a mission, keep high-risk systems read-only first, and preserve blockers instead of hiding them.

## Inputs

- User mission text.
- `data/seis/mcp-skill-connector-registry.json`.
- `data/seis/tool-activation-rules.json`.
- Current runtime blockers recorded by SEIS.

## Planning Flow

1. Normalize the mission text.
2. Score mission intents by keyword matches.
3. Select required surfaces from the winning intent.
4. Add conditional surfaces only when the mission text asks for them.
5. Mark unrelated surfaces as blocked by default.
6. Propagate auth, transport, and risk blockers into the plan.
7. Return a bounded activation plan with validation commands.

## Operating Rule

SEIS must prefer registry-first activation over blanket activation.

This means a phrase like "use all skills, connectors, and MCPs" is interpreted as:

- use the skill runtime,
- inspect the connector and MCP registry,
- activate only mission-relevant surfaces,
- keep high-risk surfaces read-only first,
- block live writes until authentication, rollback, and validation are ready.

## CLI

```bash
npm run plan:seis-tools -- "Gelistirmeye devam edelim tum skills connectorlari kullanalim mcp leri de"
```

The command returns JSON so future automation can use it without parsing prose.

## Validation

```bash
npm run check:seis-tool-activation
npm run quality
```

