-- Run this in Supabase: SQL Editor → New query → Run

create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  job_title text,
  job_description text not null,
  resume_filename text,
  score integer not null check (score >= 0 and score <= 100),
  matched_skills text[] not null default '{}',
  missing_skills text[] not null default '{}',
  strengths text not null default '',
  improvements text not null default '',
  recommendation text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists analyses_user_id_created_at_idx
  on public.analyses (user_id, created_at desc);

alter table public.analyses enable row level security;

create policy "Users can view own analyses"
  on public.analyses
  for select
  using (auth.uid() = user_id);

create policy "Users can insert own analyses"
  on public.analyses
  for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own analyses"
  on public.analyses
  for delete
  using (auth.uid() = user_id);
