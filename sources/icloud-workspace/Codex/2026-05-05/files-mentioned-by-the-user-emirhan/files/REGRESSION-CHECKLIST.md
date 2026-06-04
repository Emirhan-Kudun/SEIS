# Regression Checklist

## Navigation / Hash

- [ ] `#drawings` direct jump works
- [ ] `#contact` direct jump works
- [ ] `#tech-stack` alias resolves to `#drawings`
- [ ] Active nav state is correct after hash changes
- [ ] Active nav item has correct `aria-current="page"` state
- [ ] Mobile menu open/close + ESC close works

## Behance

- [ ] Embed count is unchanged
- [ ] Embed order is unchanged
- [ ] Lazy-load triggers on viewport entry

## Drawings

- [ ] All drawings visible on first load
- [ ] Hover focus behavior works on desktop
- [ ] Filter buttons (`all`, `karakalem`, `kuru-boya`) work
- [ ] Filter buttons support keyboard navigation (`ArrowLeft/Right`, `Home`, `End`)
- [ ] Lightbox open/close/prev/next works
- [ ] Keyboard controls (`Escape`, `ArrowLeft`, `ArrowRight`) work

## Contact Form

- [ ] Inline validation works
- [ ] Quick brief insertion works
- [ ] Draft save/load/clear works
- [ ] Submit success state works
- [ ] Submit error state works

## i18n

- [ ] TR/EN/FR/IT/DE switch updates UI text
- [ ] `?lang=` param loads correct language
- [ ] Language persists after refresh

## Automation Validation

- [ ] Core orchestration order is preserved
- [ ] Connector-step audit includes `status`, `reason`, `duration_ms`, `next_action`
- [ ] Unauthorized connectors reported as `skipped_with_reason`
- [ ] Guarded write states (`suggested -> approved -> implemented`) are explicit

## Ops / Security

- [ ] Preview-first release workflow respected
- [ ] Security gate reports `high = 0` before production
