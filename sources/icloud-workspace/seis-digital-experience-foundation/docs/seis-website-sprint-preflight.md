# SEIS Website Sprint Preflight

Bu belge, `UIXAppTTR` branch'i uzerinde yarin website sprintine baslarken tek kaynak runbook olarak kullanilmak uzere hazirlandi.

## 0) Sprint Scope

- Branch: `UIXAppTTR`
- Source of truth: GitHub repository history + PR flow
- Non-goals:
  - `main` branch'e dogrudan merge/push yok
  - approval olmadan deploy yok

## 1) Preflight Checklist (Start Before Coding)

### Git + Workspace

- [ ] `git status --short --branch` temiz mi (sadece beklenen dosyalar var mi)
- [ ] `index.html` gibi root static dosyalardaki local degisiklikler izole mi
- [ ] Calisma branch'i `UIXAppTTR` mi
- [ ] Son commitler okunup bugunku hedefle tutarli mi

### Environment + Config

- [ ] `NEXT_PUBLIC_SITE_URL` dogru domain ile ayarlandi mi
- [ ] Contact adresi (`siteConfig.email`) production degeri ile guncellendi mi
- [ ] Entegrasyon env anahtarlari (varsa) belgelendi mi

### Product + Content

- [ ] TR/EN/FR/IT/DE iceriklerinde kritik metin tutarliligi var mi
- [ ] Works/Case/Services metinleri gercek proje dili ile hizalandi mi
- [ ] Social linkler placeholder degil gercek hedeflere baglandi mi

### Quality Gates

- [ ] Responsive (mobile/tablet/desktop) kritik breakpoint kontrolu
- [ ] Keyboard/focus/reduced-motion davranisi kontrolu
- [ ] Metadata/OG/Twitter/Sitemap/Robots tekrar dogrulandi mi
- [ ] Contact API ve events endpoint payload dogrulamalari test edildi mi

## 2) Page-Based Implementation Order (Tomorrow)

### Phase 1 - Homepage Premium Finalization

Hedef: ana sayfayi final brand diliyle production kalitesine getirmek.

Primary files:

- `apps/seis-nextjs-foundation/components/home-client.tsx`
- `apps/seis-nextjs-foundation/components/navigation/main-nav.tsx`
- `apps/seis-nextjs-foundation/components/sections/*`
- `apps/seis-nextjs-foundation/app/globals.css`

Checklist:

- [ ] Hero copy + CTA'lar final product mesajina cekildi
- [ ] Section sirasi ve narrative akis son kez optimize edildi
- [ ] Theme mode gecisleri (obsidian/aurora/graphite) gorsel olarak dengelendi

### Phase 2 - Works System Deepening

Hedef: portfolio/works yapisini launch-grade hale getirmek.

Primary files:

- `apps/seis-nextjs-foundation/app/works/page.tsx`
- `apps/seis-nextjs-foundation/app/works/[slug]/page.tsx`
- `apps/seis-nextjs-foundation/lib/creative-content.ts`
- `apps/seis-nextjs-foundation/components/sections/selected-works-section.tsx`

Checklist:

- [ ] Tum work item'lar gercek proje verileriyle degistirildi
- [ ] Metrics ve stack alanlari dogrulandi
- [ ] Filter + click analytics olaylari gozden gecirildi

### Phase 3 - Services + Studio Ops Layer

Hedef: service conversion + operasyon gorunurlugunu netlestirmek.

Primary files:

- `apps/seis-nextjs-foundation/app/services/page.tsx`
- `apps/seis-nextjs-foundation/app/studio/page.tsx`
- `apps/seis-nextjs-foundation/app/api/health/route.ts`
- `apps/seis-nextjs-foundation/app/api/integrations/route.ts`

Checklist:

- [ ] Service paketleri net fiyat/teslim beklentisiyle hizalandi
- [ ] Studio board uzerinde env/integration sinyalleri kontrol edildi
- [ ] Health endpoint production readiness sinyali veriyor mu dogrulandi

### Phase 4 - Contact + Conversion Hardening

Hedef: talep toplama akisinin guvenilir hale getirilmesi.

Primary files:

- `apps/seis-nextjs-foundation/components/sections/contact-section.tsx`
- `apps/seis-nextjs-foundation/app/api/contact/route.ts`
- `apps/seis-nextjs-foundation/app/api/events/route.ts`

Checklist:

- [ ] Form validation edge-case testleri (kisa/uzun/metin/email)
- [ ] Basarili/basarisiz durum mesajlari i18n tutarliligi
- [ ] Event payload'lari anlamsal olarak yeterli mi

### Phase 5 - SEO + Release Readiness Pass

Hedef: deploy oncesi son teknik kalite turu.

Primary files:

- `apps/seis-nextjs-foundation/app/layout.tsx`
- `apps/seis-nextjs-foundation/app/sitemap.ts`
- `apps/seis-nextjs-foundation/app/robots.ts`
- `apps/seis-nextjs-foundation/app/opengraph-image.tsx`
- `apps/seis-nextjs-foundation/app/twitter-image.tsx`

Checklist:

- [ ] Canonical/alternates dogrulandi
- [ ] Sitemap route kapsaminda `/works` ve `/studio` var
- [ ] OG/Twitter onizleme metinleri nihai markaya uygun

## 3) Validation Commands (When Package Manager Is Available)

```bash
cd apps/seis-nextjs-foundation
npm install
npm run lint
npm run build
npm run dev
```

## 4) Rollback Safety

- Her phase sonunda ayri commit
- Mixed-purpose commit yok
- Riskli degisiklikte kucuk adim + erken commit
- Gerektiginde son guvenli commit'e branch icinde geri donus planli

## 5) Suggested Commit Sequence (Tomorrow)

1. `feat: finalize homepage cinematic polish`
2. `feat: enrich works content and analytics flow`
3. `feat: harden services and studio readiness board`
4. `fix: strengthen contact validation and event capture`
5. `seo: finalize metadata and sitemap coverage`

## 6) Done Definition

- UI premium ve tutarli
- Mobile-first davranis sorunsuz
- Accessibility ve reduced-motion bozulmamis
- SEO route/meta butun
- Contact + events + health endpoint'leri stabil
- Branch review-ready ve rollback-safe
