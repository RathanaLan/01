-- ============================================================================
-- Migration: 202609300002_profiles.sql
-- Description: Complete schema and RLS for user profiles and photo storage
-- ============================================================================

-- 1. Create profiles table if it doesn't already exist
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 100),
  job_title text not null default '' check (char_length(job_title) <= 120),
  location text not null default '' check (char_length(location) <= 120),
  bio text not null default '' check (char_length(bio) <= 1200),
  website text not null default '' check (char_length(website) <= 300),
  avatar_path text,
  updated_at timestamptz not null default now()
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
grant select, insert, update on public.profiles to authenticated;

-- 3. RLS Policies: Authenticated users can read and manage their own profile
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can create own profile" on public.profiles;
create policy "Users can create own profile"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 4. Trigger: Automatically initialize profile when a user signs up via Supabase Auth
create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

-- 5. Storage Bucket: profile-photos (5MB limit; jpg, png, webp)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-photos',
  'profile-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 6. Storage RLS Policies: Folder isolated by auth.uid()
drop policy if exists "Users view photos in own folder" on storage.objects;
create policy "Users view photos in own folder"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'profile-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users upload photos to own folder" on storage.objects;
create policy "Users upload photos to own folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'profile-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users update photos in own folder" on storage.objects;
create policy "Users update photos in own folder"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'profile-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'profile-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users delete photos in own folder" on storage.objects;
create policy "Users delete photos in own folder"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'profile-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
