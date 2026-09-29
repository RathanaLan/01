-- ============================================================================
-- Migration: 202609300001_user_request.sql
-- Enables Public Submissions, Comments Reading & Realtime for User_Request
-- ============================================================================

-- 1. Ensure Row Level Security (RLS) is enabled
alter table if exists public."User_Request" enable row level security;

-- 2. Allow anyone (including anonymous portfolio visitors) to submit contact requests/comments
drop policy if exists "Allow public insert on User_Request" on public."User_Request";
create policy "Allow public insert on User_Request"
on public."User_Request"
for insert
to anon, authenticated
with check (true);

-- 3. Allow public visitors to read comments/inquiries displayed on the website
drop policy if exists "Allow public select on User_Request" on public."User_Request";
create policy "Allow public select on User_Request"
on public."User_Request"
for select
to anon, authenticated
using (true);

-- 4. Enable Supabase Realtime broadcast for User_Request table
-- (Allows instant live updates in the comments feed when someone submits a message)
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'User_Request'
  ) then
    alter publication supabase_realtime add table public."User_Request";
  end if;
end;
$$;
