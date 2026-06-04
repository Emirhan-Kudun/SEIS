# SEIS Phase 2 Migration Plan

Bu plan, mevcut static premium portfolio yapisini korurken Next.js tabanina asamali gecis icin hazirlanmistir.

## Hedefler

- Static ana sayfa bozulmadan calismaya devam etmeli.
- Next.js altyapisi paralel bir klasorde gelismeli.
- UI component sistemi adim adim tasinmali.
- Motion katmani reduced-motion uyumlu kalmali.
- Performans, erisilebilirlik ve responsive kalite korunmali.

## Branch Stratejisi

- Primary branch: `codex/premium-local-foundation`

`single_branch_mode` aktif kalir; phase-2 calismalari da primary branch uzerinden kucuk ve geri alinabilir commitlerle ilerler.

## Asamalar

1. Foundation (tamamlandi)
- `apps/seis-nextjs-foundation` klasoru eklendi.
- Next.js + Tailwind + shadcn/Radix + Framer Motion + GSAP temel dosyalari olusturuldu.

2. Parallel UI Porting
- `index.html` bolumleri adim adim React componentlerine tasinacak.
- Her adimda static taraf referans davranis olarak korunacak.

3. Motion Harmonization
- Framer Motion reveal patternleri static davranisla hizalanacak.
- GSAP kullanimi sadece gerektigi noktalarda ve performans monitorlu olacak.

4. SEO ve Metadata Alignment
- Static metadata ile Next metadata esitlenecek.
- Canonical, OG, Twitter kartlari tek stratejiye alinacak.

5. Cutover Hazirligi
- UI parity checklist tamamlanacak.
- Erişilebilirlik/performance testleri tamamlanacak.
- Sonraki asamada domain routing karari alinacak.

## Kalite Kapisi

Her asama sonunda:

```bash
node scripts/branch-governance-check.js
node scripts/local-quality-gate.js --strict
bash scripts/seis-phase2-runbook.sh
```

## Riskler

- Dark-theme tokenlari static ve Next tarafinda farkli ilerleyebilir.
- Motion davranisi farkliligi UX tutarliligini bozabilir.
- Erken tam gecis denemesi rollback riskini artirir.

## Rollback

- Phase-2 degisiklikleri yalnizca migration branch commitlerinde tutulur.
- Gerekirse ilgili commitler tek tek revert edilir.
- Static root (`index.html`) rollout boyunca korunur.
