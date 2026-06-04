# Codex Cloud Environment

Bu proje icin en saglikli model hibrit akistir:

- Local: tasarim preview, dosya inceleme, hizli duzenleme.
- Codex Web Cloud: PR hazirlama, branch governance, quality gate, content intake audit.

## Named Environment

The repository now carries a dedicated Codex Cloud environment contract:

```text
SEIS Cloud UIXAppTTR
```

Machine-readable files:

- `config/seis-cloud-environment.json`
- `.codex/environments/seis-cloud.toml`

This environment keeps SEIS on `UIXAppTTR`, uses `bash scripts/codex-cloud-setup.sh`,
and defaults internet access to off unless a mission explicitly needs external
documentation or package access.

## Ne Zaman Cloud Daha Iyi?

Cloud daha iyi olur:

- bilgisayar kapaliyken veya uzaktayken Codex gorevi devam etsin istiyorsan
- GitHub uzerinden PR ve review akisi kuracaksan
- ayni anda birden fazla gorev calistirmak istiyorsan
- branch governance ve quality gate gibi tekrar eden kontrolleri standartlastirmak istiyorsan

Local daha iyi olur:

- gorsel tasarimi anlik preview ile kontrol edeceksen
- dosya/asset secimi el hassasiyeti istiyorsa
- internet ve connector erisimini minimumda tutmak istiyorsan

## Codex Web Ayarlari

1. Codex Web'de GitHub reposunu bagla.
2. Environment icin default branch olarak `UIXAppTTR` sec.
3. Setup script alanina su komutu koy:

```bash
bash scripts/codex-cloud-setup.sh
```

4. Agent internet access ayari:

```text
Off
```

Bu proje statik oldugu ve dependency kurmadigi icin agent fazinda internet gerekmiyor.

## Cloud Gorevlerinde Kullanilacak Komutlar

SEIS quality gate:

```bash
npm run quality:seis
```

Fullstack quality gate:

```bash
npm run quality:fullstack
```

Publish preflight:

```bash
npm run publish:preflight
```

Deployment readiness:

```bash
npm run check:seis-deployment-readiness
```

Cloud/server environment readiness:

```bash
npm run check:seis-cloud-server-environment
```

Server/cloud deploy envelope:

```bash
npm run check:seis-deploy-envelope
```

Remote shipment gate:

```bash
npm run check:seis-remote-shipment-gate
```

Product engineering model:

```bash
npm run check:seis-product-engineering-model
```

GitHub language presence:

```bash
npm run check:seis-github-language-presence
```

Capability activation hub:

```bash
npm run check:seis-capability-activation-hub
```

Server upload dry-run:

```bash
npm run server-upload:dry-run
```

Production kalite kontrolu:

```bash
node scripts/local-quality-gate.js --strict
```

Merge oncesi tam kontrol:

```bash
bash scripts/pre-merge-check.sh
```

PR raporu:

```bash
node scripts/pr-ready-report.js
```

Behance/export/intake audit:

```bash
node scripts/content-intake-audit.js
```

## Guvenlik Notlari

- `.env` veya gizli anahtar cloud repo dosyalarina eklenmez.
- Real server upload requires `UIX_UPLOAD_HOST`, `UIX_UPLOAD_USER`, and `UIX_UPLOAD_PATH`.
- `data/seis/deployment-readiness.json` stores only readiness booleans and environment variable names, never secret values.
- Workflow-file pushes require a GitHub token with `workflow` scope.
- MCP, skill, and connector usage must go through mission routing; do not invoke every connector at once.
- Gereksiz dependency kurulmaz.
- Internet access sadece gercekten dokumantasyon veya paket kurulumu gerekiyorsa acilir.
- Main branch yerine `UIXAppTTR` branch'i ana hat olarak kullanilir.
- PR diff'i merge edilmeden once manuel kontrol edilir.

## Onerilen Ilk Cloud Prompt

```text
Run the project governance checks on branch UIXAppTTR.
Do not modify website UI files.
Run:
- bash scripts/pre-merge-check.sh
- node scripts/content-intake-audit.js
Summarize findings, risks, and whether this branch is safe to PR.
```
