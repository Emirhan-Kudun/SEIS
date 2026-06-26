# SEIS Code — Web IDE replica

A single-file, single-URL **VS Code Web** replica. Vanilla JS, no build step. Open
`index.html` in any modern browser (or serve the folder statically).

## What's inside

- **Monaco editor** — real typing, multi-tab editing, 20+ language syntax highlighting
  (auto-detected by file extension). Falls back to a lightweight textarea editor if the
  Monaco CDN is unreachable, so typing and saving always work.
- **5 activity-bar views** — Explorer (file tree), Search (across files), Source Control
  (live diff vs. last commit + commit box), Run & Debug (executes JS in a sandbox), and
  Extensions (install/uninstall, persisted).
- **8 top menus** — File, Edit, Selection, View, Go, Run, Terminal, Help — every item runs
  a real action. Plus a fuzzy **Command Palette** (`⌘/Ctrl ⇧ P`) and Go-to-File (`⌘/Ctrl P`).
- **Terminal** — a real mini-shell over the virtual file system with 16+ commands:
  `help, ls, cd, pwd, cat, echo (+ > redirect), touch, mkdir, rm, open, run, grep, wc, tree,
  history, date, whoami, neofetch, cowsay, clear`. Arrow-key history and tab completion.
- **`claude` REPL** — type `claude` in the terminal to enter an in-browser Claude Code REPL:
  streaming token-by-token replies, animated **tool calls** (Read / Write / Bash) that
  actually modify the workspace, and **slash commands** (`/help /clear /model /init /review
  /cost /exit`). Ask it to *“create a file utils.js”*, *“read /src/main.py”*, *“run”*, or
  *“review”*.
- **IndexedDB persistence** — files, open tabs, installed extensions and terminal history all
  survive a reload. *Reset Workspace* (in the Command Palette) clears it.

## Design goal

**Interactivity ≥ 80%** — every clickable affordance (menus, activity icons, side-bar action
buttons, status-bar items, tabs, panel tabs, palette) performs a real action. There is no
decorative-only UI.

## Run

```bash
# any static server works, e.g.
python3 -m http.server 8000   # then open http://localhost:8000/apps/vscode-web/
```
