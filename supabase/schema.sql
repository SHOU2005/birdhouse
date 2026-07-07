-- Birdhouse — Supabase schema
-- Run this once in your Supabase project: SQL Editor → New query → paste → Run.
-- Safe to re-run (idempotent).

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- Properties: one row per listing. `data` holds the full Property object so the
-- shape can evolve without migrations; `position` preserves admin list order.
create table if not exists public.properties (
  slug        text primary key,
  data        jsonb not null,
  position    int not null default 0,
  updated_at  timestamptz not null default now()
);

-- Blogs: one row per post.
create table if not exists public.blogs (
  slug        text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- Site content: a single row (id is fixed at 1).
create table if not exists public.site_content (
  id          int primary key default 1,
  data        jsonb not null,
  updated_at  timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

-- Leads: one row per enquiry.
create table if not exists public.leads (
  id          text primary key,
  data        jsonb not null,
  created_at  timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists properties_position_idx on public.properties (position);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- The app connects only with the service-role key (server-side), which bypasses
-- RLS. Enable RLS with no policies so the anon/public key can't read or write
-- these tables directly.

alter table public.properties   enable row level security;
alter table public.blogs        enable row level security;
alter table public.site_content enable row level security;
alter table public.leads        enable row level security;

-- ---------------------------------------------------------------------------
-- Storage bucket for uploaded listing photos
-- ---------------------------------------------------------------------------
-- Public bucket so <Image> can load photos by URL. Uploads go through the
-- server with the service-role key, so no insert policy is needed for clients.

insert into storage.buckets (id, name, public)
values ('listings', 'listings', true)
on conflict (id) do update set public = true;
