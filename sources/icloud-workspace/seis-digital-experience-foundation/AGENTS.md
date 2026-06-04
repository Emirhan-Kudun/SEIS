# AGENTS.md

SEIS AUTONOMOUS FULLSTACK ENGINEERING CIVILIZATION OS calisma kurallari.

## 1) Calisma Modu

- Bu repo icin ana calisma branch'i: `UIXAppTTR`
- `main` ve `master` korunur, dogrudan gelistirme yapilmaz.
- Tek branch odakli akis varsayilandir. Zorunlu durumlarda gecici task branch acilip tekrar ana branch'e alinmalidir.

## 2) Otomatik Baslangic Kontrolu

Her gorev basinda:

```bash
git status --short --branch
node scripts/branch-governance-check.js
node scripts/local-quality-gate.js
```

Merge/PR oncesi:

```bash
bash scripts/pre-merge-check.sh
```

## 3) MCP + Connector + Skill Kullanim Kurali

Agent uygun araci otomatik secmelidir, gereksiz arac kullanmamalidir.

- Kod ve repo islemleri: Git + yerel scriptler
- UI/localhost test: Browser plugin
- Figma URL veya design implementasyonu: Figma plugin/skills
- OpenAI/API dokumani: resmi OpenAI docs skills
- Kutuphane/framework dokumani: guncel resmi docs (context7 vb.)
- PR/issue akisi: GitHub plugin/CLI
- SEO metrik ihtiyaci: Semrush/Conductor gibi ilgili connectorlar
- Dokuman/tablo/sunum gorevleri: Documents/Spreadsheets/Presentations veya Drive connectorlari

Kurallar:

- Auth gerektiren connectorlarda once amac ve kapsam netlestirilir.
- Gizli bilgi, token ve anahtarlar repoya yazilmaz.
- Gereksiz connector/MCP eklenmez; fayda ve bakim maliyeti dusuk olanlar secilir.

## 4) Kalite ve Guvenlik

- Kucuk, geri alinabilir diff odakli degisiklikler yap.
- Performans, erisilebilirlik ve responsive davranisi koru.
- TR/EN/FR/IT/DE i18n yapisini bozma.
- Commit oncesi en az governance + quality gate calismis olmali.

## 5) Branch Stratejisi (SEIS)

- Birincil branch: `UIXAppTTR`
- Bu branch SEIS icin kalici operasyon hattidir.
- Tum iyilestirmeler bu hatta toplanir; kalici paralel branch acilmaz.
- Eski `codex/premium-local-foundation` hatti artik Git branch'i olarak kullanilmaz.
- `codex/premium-local-foundation` kapsami, `premium-local-foundation-agent` adli mantiksal alt ajan lane'i olarak `UIXAppTTR` icinde calisir.

## 6) SEIS Humane Operating Layer

- Operate as a calm, modular, high-efficiency AI-native creative-engineering system.
- Preserve clarity, maintainability, accessibility, rollback safety, emotional balance, and sustainable interaction.
- Use proportional orchestration: small tasks stay lightweight; large tasks become phased and architecture-aware.
- Prefer low-power static checks before heavy runtime validation.
- Keep cinematic motion restrained, reduced-motion aware, and mobile-safe.
- Treat documentation, registries, mission control, and quality gates as part of system integrity.
- Legacy files must be analyzed before promotion and must not be copied directly into runtime surfaces without a purpose.
