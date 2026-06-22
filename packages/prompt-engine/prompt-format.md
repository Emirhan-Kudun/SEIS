# Prompt Format

Every SEIS prompt template is a Markdown file with a small, explicit structure so
templates stay reusable and reviewable.

## Structure

```md
# <Prompt name>

- id: <stable-id>
- version: <n>
- intent: <one sentence>

## Inputs
<named placeholders the caller must fill, e.g. {{repo_path}}>

## Instructions
<the actual task guidance — clear, ordered, original>

## Output
<the expected output shape>
```

## Rules

- Placeholders use `{{snake_case}}` and are listed under **Inputs**.
- No secrets, private data, or proprietary/leaked prompt text.
- Keep instructions specific and ordered; avoid vague prose.
- A template change that alters behaviour bumps its `version` (see
  [versioning](./prompt-versioning.md)).
