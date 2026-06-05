# UI-UX Digital Lab Workspace

This workspace is the operational core for a low-pressure, high-efficiency UI/UX
development loop.

## What Is Included

- governance-first automation scripts
- a lightweight cinematic web foundation
- a gap closure register
- provider-neutral cloud environment contracts
- connector and MCP capability registry
- trusted marketplace intake for GitHub, MCP, Copilot, and model sources
- local SEIS Trusted Marketplace plugin bridge for the `UIXAppTTR` branch
- release refresh support without dependency bloat

---

## 🎯 SEIS Hub - Tüm Projeler

SEIS, aşağıdaki tüm projelerin merkezi deposu ve yönetim hub'ıdır.

### 🤖 AI & Yapay Zeka Araçları
- **[gemini-cli](https://github.com/emirhankudun-ux/gemini-cli)** - Gemini AI'ı doğrudan terminalinizde kullanın
- **[claude-code](https://github.com/emirhankudun-ux/claude-code)** - Claude Code ile hızlı kod yazımı ve refactoring

### 🎨 UI & Uygulamalar  
- **[UIX-Apps](https://github.com/emirhankudun-ux/UIX-Apps)** - Kullanıcı arayüzü uygulamaları ve bileşenleri
- **[emirhan-kudun-portfolio](https://github.com/emirhankudun-ux/emirhan-kudun-portfolio)** - Premium UX portföy sistemi

### 📚 Belgeler & Kaynaklar
- **[docs](https://github.com/emirhankudun-ux/docs)** - SEIS ve tüm projeler için belgelendirme
- **[github-unified-source](https://github.com/emirhankudun-ux/github-unified-source)** - Unified GitHub kaynak envanteri

### 🛠️ Governance & Plugin
- **[seis-trusted-marketplace-plugin](https://github.com/emirhankudun-ux/seis-trusted-marketplace-plugin)** - Codex marketplace yönetimi

### 📦 Model & Koleksiyonlar
- **[DeepSeek-Coder](https://github.com/emirhankudun-ux/DeepSeek-Coder)** - DeepSeek kod modeli (Arşiv)
- **[awesome-deepseek-agent](https://github.com/emirhankudun-ux/awesome-deepseek-agent)** - DeepSeek agent koleksiyonu (Arşiv)

📖 **Detaylı liste için:** [`PROJECTS.md`](./PROJECTS.md)

---

## Quick Start

```bash
npm run automation:develop
```

## Core Commands

```bash
npm run check:workspace
npm run check:release-sync
npm run check:ai-stack
npm run check:cloud-environment
npm run check:monthly-branch-hardening
npm run check:trusted-marketplace-intake
npm run check:seis-trusted-marketplace-plugin
npm run automation:code-plan
npm run automation:server-cloud-report
npm run automation:refresh-release
npm run automation:publish-readiness
```

Cloud and connector contracts live in `deploy/cloud-environment.json` and
`content/development/connector-capability-registry.json`. The trusted
marketplace intake lives in
`content/development/trusted-marketplace-intake.json`. Together they keep
GitHub, server upload, cloud provider selection, MCP/connector usage,
marketplace curation, and rollback rules explicit before any credentialed
remote action.

The local Codex plugin bridge is documented in
`content/development/seis-trusted-marketplace-plugin.json` and
`docs/development/seis-trusted-marketplace-plugin.md`. It binds the personal
`seis-trusted-marketplace` plugin to the `UIXAppTTR` repo workflow without
turning local plugin readiness into an automatic public publish.

The current monthly hardening plan lives in
`content/development/monthly-branch-hardening.json` and
`docs/development/monthly-branch-hardening.md`. It keeps the active strategy
explicit: strengthen the `UIXAppTTR` repo and branch first, then expand the
plugin on top of validated repo contracts.

## AI CLI Router

Use one workspace command to switch between installed AI tools:

```bash
npm run ai -- list
npm run ai -- auto "local coding assistant"
npm run ai -- auto "local coding assistant" :: --version
npm run ai -- codex
npm run ai -- claude
npm run ai -- gemini
npm run ai -- ollama
npm run ai -- kimi
npm run ai -- aider
npm run ai -- interpreter
```

Reference: `docs/development/ai-cli-stack.md` and `scripts/ai-routing-policy.cjs`

## Safety Rules

- no automatic push
- no automatic deploy
- no heavy local process by default
- reduced-motion support is mandatory
