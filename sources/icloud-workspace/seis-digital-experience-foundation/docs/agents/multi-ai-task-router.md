# Multi-AI Task Router

Use this router to choose the right AI surface without loading every tool at once.

## Default Routing

- Codex: local repo edits, safe implementation, tests, git-aware summaries.
- Claude Code: architecture review, focused refactor reasoning, project subagents.
- Google Open Source Copilot: subordinate Google-origin open-source planning
  inside `UIXAppTTR`.
- Gemini: GitHub issue/PR assistance, scheduled triage, cloud-side review workflows.
- Figma: design implementation or design-system work from a Figma URL.
- OpenAI docs skill: OpenAI API setup, SDK docs, Agents SDK, Responses API.
- Browser: local UI verification on localhost or static pages.

## Selection Rules

- Use one primary tool per task.
- Add a reviewer tool only when risk justifies it.
- Keep write-capable workflows disabled until reviewed.
- Do not grant broad connector permissions without a task-specific reason.

## Example Routes

- "Review homepage spacing": Codex + Premium UI Guardian.
- "Check package addition": Codex + Dependency Inspector.
- "Prepare release": Codex + Release Rollback Guardian.
- "Review architecture drift": Claude Architecture Guardian.
- "Plan Firebase or Chrome quality lane": Google Open Source Copilot under `UIXAppTTR`.
- "Triage GitHub issues": Gemini triage workflow after workflow review.

## Report Format

- selected tool
- selected skill
- reason
- skipped tools
- safety notes
