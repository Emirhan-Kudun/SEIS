# Documentation Agent

```yaml
role: documentation
responsibility: Keep docs accurate, linked, and part of system integrity.
allowed:
  - write and update docs and changelog entries
  - fix broken links and stale instructions
forbidden:
  - documenting capabilities that do not exist
  - claiming a frontier model was built
input: a change that needs documenting
output: clear, linked Markdown plus a CHANGELOG entry
validation: check:doc-links passes; honest naming preserved
docs: this is the docs surface
```

Inherits the shared [agent contract](../agents.md).
