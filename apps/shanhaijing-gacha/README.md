# 山海拾遗 — Shan Hai Jing Gacha

A mobile-first card-drawing (gacha) game themed on the **《山海经》 Classic of Mountains and
Seas**. Single-file, vanilla JS, no build step.

## What's inside

- **16 mythical beasts** drawn from the original text — Bai Ze, the Nine-Tailed Fox, Taotie,
  Fenghuang, Yinglong, the Torch Dragon, Dijiang (Chaos), and more — each with authentic lore
  and a source quotation.
- **In-browser generated art** — every creature is rendered as an ink-wash **SVG** from a small
  set of archetype generators (beast / bird / dragon / fox / horse) parameterised by palette,
  markings, tails, wings, horns and a vermilion name-seal. No image API or network asset needed,
  so it always renders, in the woodblock-bestiary spirit.
- **Elegant draw ritual** — an altar charges, light rays burst in the pulled card's rarity
  colour, particles scatter, and a 3-D card flips to reveal the beast. Single pull (问卜一签)
  and ten-pull (灵签十连) with a per-card track and Skip/Next.
- **Lore on reveal** — name (中文 / pinyin / English), rarity, element, region, source quote
  and a paragraph of myth.
- **Bestiary (图鉴)** — a grid of all beasts; unlocked ones show art + count and open a detail
  card, locked ones show a darkened silhouette and `？`. Filter by rarity; a progress bar tracks
  completion. Unlocks persist to `localStorage`.

## Rarities

常见 Common · 珍稀 Rare · 传说 Legendary · 神话 Mythic — weighted 60 / 28 / 10 / 2.

## Design goal

Minimalist yet fantastical: aged-paper and ink palette, vermilion seals, serif typography
(Noto Serif SC + Cinzel), seamless on phones (viewport-fit, large tap targets, responsive grid).

## Run

Open `index.html`, or serve statically and visit `/apps/shanhaijing-gacha/`.
