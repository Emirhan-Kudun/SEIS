-- Emirhan Web System draft schema
-- Postgres-first model for portfolio, mobile, data, and plugin orchestration.

create table if not exists integrations (
  id bigserial primary key,
  provider_key text not null unique,
  display_name text not null,
  category text not null,
  role text not null,
  auth_status text not null default 'pending',
  read_scope text,
  write_scope text,
  mobile_surface boolean not null default false,
  risk_level text not null default 'medium',
  last_sync_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists integration_events (
  id bigserial primary key,
  integration_id bigint references integrations(id) on delete set null,
  event_type text not null,
  subject_type text,
  subject_id text,
  status text not null default 'recorded',
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists contacts (
  id bigserial primary key,
  name text not null,
  email text,
  company text,
  source text not null default 'website',
  message text,
  status text not null default 'new',
  consent_to_contact boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id bigserial primary key,
  slug text not null unique,
  title text not null,
  summary text not null,
  status text not null default 'draft',
  visibility text not null default 'private',
  primary_url text,
  repository_url text,
  started_at date,
  shipped_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_assets (
  id bigserial primary key,
  project_id bigint references projects(id) on delete cascade,
  asset_type text not null,
  storage_provider text not null default 'local',
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists briefs (
  id bigserial primary key,
  contact_id bigint references contacts(id) on delete set null,
  title text not null,
  brief_type text not null default 'project',
  status text not null default 'open',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists content_items (
  id bigserial primary key,
  slug text not null unique,
  content_type text not null,
  title text not null,
  body text,
  visibility text not null default 'private',
  source_provider text,
  source_ref text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists research_notes (
  id bigserial primary key,
  title text not null,
  source_provider text,
  source_ref text,
  summary text not null,
  evidence jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists automations (
  id bigserial primary key,
  name text not null,
  trigger_provider text not null,
  trigger_type text not null,
  action_provider text not null,
  action_type text not null,
  status text not null default 'paused',
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists security_findings (
  id bigserial primary key,
  source text not null,
  title text not null,
  severity text not null default 'info',
  status text not null default 'open',
  affected_ref text,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists mobile_sync_log (
  id bigserial primary key,
  device_ref text,
  sync_type text not null,
  status text not null default 'started',
  metadata jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create index if not exists idx_contacts_status on contacts(status);
create index if not exists idx_projects_visibility on projects(visibility);
create index if not exists idx_content_items_visibility on content_items(visibility);
create index if not exists idx_integration_events_provider on integration_events(integration_id, occurred_at desc);
create index if not exists idx_security_findings_status on security_findings(status, severity);

-- RLS should be enabled before private data is loaded:
-- alter table contacts enable row level security;
-- alter table briefs enable row level security;
-- alter table integration_events enable row level security;
-- alter table security_findings enable row level security;
