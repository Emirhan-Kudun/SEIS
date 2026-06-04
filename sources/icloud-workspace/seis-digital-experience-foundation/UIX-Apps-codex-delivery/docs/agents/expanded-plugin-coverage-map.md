# Expanded Plugin Coverage Map

This map captures the larger plugin list as routed capability families. It keeps
plugins useful without making all connectors always-on.

## New Coverage Added

- enterprise security and observability
- AI agent and plugin-development frameworks
- cloud SDK language specialists
- extended business and data apps
- specialized creative, learning, and framework skills
- alias normalization for duplicate plugin names
- source and mode filtering in the local runner
- report saving for repeatable connector audits

## Source Strategy

- `openai-curated`: use when Codex has a task-specific app or skill available.
- `claude-plugins-official`: keep as registry-first planning unless Claude Code execution is in scope.
- `skills`: keep SDK language cards registry-only until code needs them.
- `openai-primary-runtime`: use for local artifacts, not external account actions.
- `openai-bundled`: use for local browser and document-adjacent tooling.

## Duplicate Strategy

Some plugins appear more than once or under different names. The alias map keeps
one canonical id while preserving source metadata. Examples:

- `zoom-plugin` maps to `zoom`
- `netlify-skills` maps to `netlify`
- `huggingface-skills` maps to `hugging-face`
- duplicate `ai-plugins`, `circleback`, `twilio-developer-kit`, and `superpowers` mentions collapse to canonical entries

## Execution Strategy

Use dry-run planning first:

```bash
node seis/connector-orchestration/runner.cjs --dry-run --format markdown
```

Then narrow by group, source, or mode:

```bash
node seis/connector-orchestration/runner.cjs --dry-run --source claude-plugins-official --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --mode registry-only --format markdown
node seis/connector-orchestration/runner.cjs --dry-run --group enterprise-security-observability --format markdown
```
