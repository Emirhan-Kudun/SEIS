# Preservation Snapshot

This layer answers a practical question while GitHub auth is blocked:

Which source files are currently protected in the iCloud canonical repo, and can the server expose their integrity signals?

## Runtime Endpoint

```text
GET /api/preservation-snapshot
```

The endpoint returns:

- canonical branch
- configured source paths
- polyglot starter source paths
- file sizes
- SHA-256 hashes
- missing path count

## Validation

```bash
npm run check:preservation-snapshot
```

The check validates the snapshot config, source paths, forbidden local artifacts, endpoint wiring, docs, runtime module registration, and hash generation.

## Boundary

This is not a replacement for GitHub push. It is a local preservation and integrity layer until server publication is authenticated.
