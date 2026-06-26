-- SEIS OS — Supabase schema: auth + per-user file sync, with row-level security.
-- Apply in the Supabase SQL editor (or `supabase db push`). Safe to re-run.

-- profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

drop policy if exists "profiles are self-readable" on public.profiles;
create policy "profiles are self-readable" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles are self-writable" on public.profiles;
create policy "profiles are self-writable" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- files: the virtual file system, owned per user
create table if not exists public.files (
  user_id    uuid not null references auth.users(id) on delete cascade,
  path       text not null,
  content    text not null default '',
  updated_at timestamptz default now(),
  primary key (user_id, path)
);
alter table public.files enable row level security;

drop policy if exists "files are owner-only" on public.files;
create policy "files are owner-only" on public.files
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- auto-provision a profile row when a user signs up
create or replace function public.handle_new_user() returns trigger
  language plpgsql security definer as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
    on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
