# SEIS OS — Cloud backend (Supabase)

The OS is **local-first**: with no backend configured it runs entirely on IndexedDB.
Configuring Supabase turns on **real auth** and **per-user file sync** (the lock screen
becomes a real sign-in, and your virtual file system syncs to Postgres with row-level
security).

## Provision

1. Create a Supabase project.
2. Run [`schema.sql`](./schema.sql) in the SQL editor (creates `profiles` + `files` with RLS,
   and a trigger that provisions a profile on sign-up).
3. Copy the project URL and anon key into `apps/seis-os/.env.local`:

   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
   ```

4. `npm run dev` (or `npm run build`). The kernel auto-selects the Supabase backend when both
   vars are present (see [`src/kernel/cloud.ts`](../src/kernel/cloud.ts)); otherwise it stays
   local-first.

## What syncs

- **Auth** — email/password via Supabase Auth (`signInWithPassword` / `signUp`).
- **Files** — every `fs.write` upserts to `public.files` for the signed-in user; on sign-in
  the kernel hydrates the local fs from the cloud. RLS guarantees users only see their own rows.

## Security

- Keys: only the **anon** key ships to the client (safe by design with RLS). Never embed the
  service-role key.
- All tables have RLS enabled with owner-only policies.
