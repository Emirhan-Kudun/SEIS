# Unified i18n Mapping Policy (Static <-> Next)

## Goal
Keep language behavior identical between static runtime and Next secondary runtime.

## Locales
- tr
- en
- fr
- it
- de

## Key Rules
1. All `data-i18n*` keys in static HTML must exist for all locales in `translations.json`.
2. Locale switcher labels remain native for all runtimes:
   - Türkçe
   - English
   - Français
   - Italiano
   - Deutsch
3. Accessibility i18n keys are mandatory:
   - `lang.trigger.aria`
   - `lang.menu.aria`
4. Missing-key fallback order:
   - active locale -> default locale (`tr`) -> hardcoded fallback
5. URL contract stays stable:
   - `?lang=tr|en|fr|it|de`
6. Locale state persistence:
   - localStorage key: `ek_site_lang`

## Next Alignment Contract
- Next route-level localization must use the same locale IDs (`tr/en/fr/it/de`).
- Any new localized copy introduced in Next must be mirrored in static translation policy review.
