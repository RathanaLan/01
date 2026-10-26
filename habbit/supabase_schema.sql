-- =========================================================================
-- HabitCraft Daily Tracking Table Schema for Supabase
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor)
-- =========================================================================

create table if not exists public.daily_habit_tracking (
  id text primary key,
  log_date date not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  user_email text default 'anonymous',
  mood text,
  sleep_hours numeric(3, 1) default 7.5,
  water_liters numeric(3, 2) default 2.5,
  morning_reflection text,
  evening_reflection text,
  habit_score text,
  completed_habits jsonb default '[]'::jsonb,
  raw_data jsonb default '{}'::jsonb
);

-- Enable Row Level Security (RLS)
alter table public.daily_habit_tracking enable row level security;

-- Permissive policies for personal habit tracking (supports anon key or logged-in users)
create policy "Allow select daily habit tracking"
  on public.daily_habit_tracking
  for select
  using (true);

create policy "Allow insert daily habit tracking"
  on public.daily_habit_tracking
  for insert
  with check (true);

create policy "Allow update daily habit tracking"
  on public.daily_habit_tracking
  for update
  using (true)
  with check (true);

create policy "Allow delete daily habit tracking"
  on public.daily_habit_tracking
  for delete
  using (true);

-- Index on log_date for fast chronological sorting
create index if not exists idx_daily_habit_tracking_date 
  on public.daily_habit_tracking(log_date desc);
