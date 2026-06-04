# Static-Next Parity Checklist

## i18n
- [ ] `tr/en/fr/it/de` locales available
- [ ] `lang.trigger.aria` and `lang.menu.aria` present in all locales
- [ ] locale switch labels render as native names
- [ ] URL `?lang=` updates consistently

## UX and Navigation
- [ ] nav anchors map to valid sections in static runtime
- [ ] language menu is keyboard accessible (Enter, ArrowDown, Escape)
- [ ] focus return behavior works after language selection

## Content Contracts
- [ ] Behance embeds: 37 total, first 9 eager
- [ ] drawings filters and lightbox remain functional
- [ ] contact chain contract preserved

## Quality Gates
- [ ] local-quality-gate pass
- [ ] infrastructure-check pass
- [ ] semantic-seo-check pass
- [ ] regression-smoke pass

## Next Secondary Smoke
- [ ] `npm --prefix apps/seis-nextjs-foundation run lint` pass or documented blocker
- [ ] `npm --prefix apps/seis-nextjs-foundation run build` pass or documented blocker
