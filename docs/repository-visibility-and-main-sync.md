# Repository Visibility And Main Sync

Date: 2026-06-05

## What Is Visible

GitHub connector visibility shows these repositories as currently accessible:

- `emirhankudun-ux/SEIS`
- `emirhankudun-ux/docs`
- `emirhankudun-ux/emirhan-kudun-portfolio`
- `emirhankudun-ux/github-unified-source`
- `emirhankudun-ux/seis-trusted-marketplace-plugin`

These repositories returned `404` or were not visible through connector lookup:

- `emirhankudun-ux/UIX-Apps`
- `emirhankudun-ux/gemini-cli`
- `emirhankudun-ux/DeepSeek-Coder`
- `emirhankudun-ux/claude-code`
- `emirhankudun-ux/awesome-deepseek-agent`

Full audit: [`data/repository-visibility-audit-2026-06-05.json`](../data/repository-visibility-audit-2026-06-05.json)

## SEIS Branch Visibility

SEIS still shows `26` source tracking branches under `sources/<repo>/<branch>`. These keep the visible branch index for old repositories, even when a source repository is no longer visible separately.

## Main Branch Decision

`main` and `UIXAppTTR` were divergent. To make GitHub easier to understand as a single center, `main` should mirror the current canonical SEIS branch.

Before sync:

```text
UIXAppTTR cc027b6eebbe00cb788484a4480c30f0b849bb32
main      c9566327e4a52492f590def3f59f6788a9a1568f
```

Decision:

- keep `UIXAppTTR` as the configured default branch for now
- force-update `main` to the latest canonical SEIS commit after this audit/plugin update
- keep `sources/*` branch refs visible as recovery/index refs
- do not delete branch refs or repositories as part of this sync

## Deletion Rule

Deletion is still gated. A repository being absent from normal listing is not enough to assume its content is safely imported. SEIS must show branch refs, file snapshots, plugin source mirror, and zip/archive records before local or remote cleanup.
