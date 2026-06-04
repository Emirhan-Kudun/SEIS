# SEIS MCP, Skill, And Connector Governance

Status: active architecture  
Mission: `SEIS-M004`

SEIS can use many skills, connectors, and MCP servers, but it must not activate every tool at once. The correct operating model is registry-first activation.

## Purpose

Skills, connectors, and MCP servers expand SEIS into a multi-tool operating system. Without governance they can also create noise, auth failures, dependency drift, privacy risk, and unnecessary execution cost.

SEIS-M004 defines the policy layer for tool use:

- detect the mission
- route to the correct domain
- select the owner agent
- activate only the required tool surface
- prefer read-only checks first
- document blockers and auth state

## Activation Rules

1. Never use every tool just because it exists.
2. Prefer local static checks before remote or authenticated tools.
3. Use read-only MCP calls before write-capable calls.
4. Use connector tools only when the mission needs that external system.
5. Use design tools only when there is a design artifact, design system, or UI sync mission.
6. Use cloud tools only when target, rollback, and cost boundaries are explicit.
7. Use payment/business tools only when the business domain is explicit.
8. Record startup, auth, or transport failures as blockers instead of retrying blindly.

## Current Runtime Notes

- `codex mcp list` confirms many MCP servers are configured.
- GitHub publication through local CLI is available after `publish:preflight`; the current requirement is to preserve branch, sync, and workflow-scope checks.
- The GitHub app connector was attempted in read-only mode and returned a transport handshake failure.
- Output.ai guidance is available, but Output workflow creation must use the Output planning command instead of manual workflow scaffolding.
- Figma is available for design work, but Figma write operations require the relevant Figma skill and a valid file context.

## SEIS Interpretation

SEIS should treat tools as capability surfaces, not permanent dependencies.

The registry at `data/seis/mcp-skill-connector-registry.json` defines which agent owns each surface, when it can activate, and which guardrails apply.
