# Repository And Deployment Readiness

## Current Blocker

`/Users/emirhan/Documents/New project` is not currently a Git repository.

## Required GitHub Flow

1. Clone or open the real GitHub repo.
2. Copy or sync this foundation into that repo.
3. Create a non-main branch:

```bash
git checkout -b chore/seis-foundation-audit
```

4. Run:

```bash
npm run check:foundation
npm run check:js
```

5. Commit only the intended foundation files.

## Static Hosting Readiness

The `apps/web` surface is static and can be hosted as plain files.

For framework migration:

- keep `apps/web` as the reference shell
- create `apps/site` for Next.js or Astro
- move tokens/content/asset registry into shared packages

## Do Not Deploy Yet

Do not deploy publicly until:

- canonical domain is confirmed
- robots policy is changed
- artwork alt text is reviewed
- image derivatives are optimized
- 3D direction is approved

