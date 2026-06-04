# SEIS Website Sprint Plan - 2026-05-15

Bu plan, `codex/premium-local-foundation` hattinda website kickoff gunu icin operasyonel akis verir.

## 1) UI Direction Lock (09:30-11:00)

- Hero ve section hierarchy son kontrolu
- Typography scale + spacing token freeze
- Mobile-first readability duzeltmeleri

## 2) Content + Route Stabilization (11:15-13:00)

- `/works`, `/insights`, `/services`, `/playbooks`, `/control`, `/ops`, `/governance`, `/bench`
- TR/EN/FR/IT/DE metin ve route parametre kontrolu
- Yuksek etkili CTA ve microcopy rafinesi

## 3) Ops + Governance QA (14:00-16:00)

- `/api/release-readiness`
- `/api/quality-scorecard`
- `/api/governance-matrix`
- `/api/feature-flags`
- `/api/bench-capabilities`
- `/api/system-manifest`

## 4) Final Integration Pass (16:15-18:00)

- Onayli patchlerin branch'e alinmasi
- PR summary + testing checklist hazirlanmasi
- Deploy yok (explicit approval olmadan production cikis yapilmaz)

## Risk Notes

- Auth/remote push engeli devam ederse once kimliklendirme cozulmeli.
- Lint/build runtime eksikse tooling dogrulamasi icin lokal node/npm ortami aktif edilmeli.
- Gorevler tek amacli commitlere bolunerek rollback kolayligi korunmali.
