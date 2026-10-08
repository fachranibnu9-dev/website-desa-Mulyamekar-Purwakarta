create extension if not exists pgcrypto;
create table if not exists public.activities(id uuid primary key default gen_random_uuid(),slug text unique not null,title text not null,date text not null,category text not null default 'Kegiatan Warga',excerpt text not null default '',body text not null default '',image text not null default '',created_at timestamptz not null default now());
create table if not exists public.agenda(id uuid primary key default gen_random_uuid(),date text not null,title text not null,place text not null default '',created_at timestamptz not null default now());
alter table public.activities enable row level security; alter table public.agenda enable row level security;
drop policy if exists "public read activities" on public.activities; create policy "public read activities" on public.activities for select using(true);
drop policy if exists "authenticated manage activities" on public.activities; create policy "authenticated manage activities" on public.activities for all to authenticated using(true) with check(true);
drop policy if exists "public read agenda" on public.agenda; create policy "public read agenda" on public.agenda for select using(true);
drop policy if exists "authenticated manage agenda" on public.agenda; create policy "authenticated manage agenda" on public.agenda for all to authenticated using(true) with check(true);

-- Storage untuk foto kegiatan. Jalankan setelah Storage tersedia.
insert into storage.buckets (id,name,public) values ('gallery','gallery',true) on conflict (id) do update set public=true;
drop policy if exists "public read gallery" on storage.objects;
create policy "public read gallery" on storage.objects for select using (bucket_id='gallery');
drop policy if exists "authenticated upload gallery" on storage.objects;
create policy "authenticated upload gallery" on storage.objects for insert to authenticated with check (bucket_id='gallery');
drop policy if exists "authenticated update gallery" on storage.objects;
create policy "authenticated update gallery" on storage.objects for update to authenticated using (bucket_id='gallery') with check (bucket_id='gallery');
drop policy if exists "authenticated delete gallery" on storage.objects;
create policy "authenticated delete gallery" on storage.objects for delete to authenticated using (bucket_id='gallery');
