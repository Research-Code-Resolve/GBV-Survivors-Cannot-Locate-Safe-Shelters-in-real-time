-- Staff access + admin read policy
--
-- Two pieces:
-- 1. staff_access_codes: holds hashed access codes used to gate signup.
--    Never store the raw code -- only its hash. Checked exclusively
--    from a server-side Edge Function (service_role), never from the
--    browser, so the code can't be read out of frontend JS.
-- 2. staff_profiles: marks which authenticated users are approved
--    staff. Just because someone has a Supabase Auth account does not
--    mean they can read reports -- only rows with a matching
--    staff_profiles entry get SELECT access, enforced by RLS below.

create table if not exists public.staff_access_codes (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique,
  label text,
  created_at timestamptz not null default now(),
  used_at timestamptz,
  used_by uuid references auth.users(id)
);

comment on table public.staff_access_codes is
  'Hashed one-time or shared access codes used to gate staff signup. Checked server-side only, via an Edge Function using the service_role key. Never query this table from the browser with the anon key.';

alter table public.staff_access_codes enable row level security;
-- No policies at all for anon/authenticated: this table is only ever
-- touched by the service_role key inside an Edge Function, which
-- bypasses RLS. That is intentional -- it keeps the table completely
-- unreachable from the frontend.

create table if not exists public.staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

comment on table public.staff_profiles is
  'Marks which authenticated users are approved staff with access to read reports. A row here is created by the signup Edge Function only after a valid access code is verified.';

alter table public.staff_profiles enable row level security;

-- A logged-in user may check their own staff status (used by the
-- frontend to decide whether to show the dashboard or an
-- access-pending message). They cannot see other staff profiles.
create policy "staff can read own profile"
  on public.staff_profiles
  for select
  to authenticated
  using (id = auth.uid());

-- Now grant SELECT on reports, but only to users who have a matching
-- staff_profiles row. This is the actual gate on survivor data.
create policy "staff can read reports"
  on public.reports
  for select
  to authenticated
  using (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
    )
  );

-- Staff can update status (e.g. 'new' -> 'reviewed' -> 'escalated')
-- but nothing else about a report -- this is intentionally narrow.
create policy "staff can update report status"
  on public.reports
  for update
  to authenticated
  using (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
    )
  );

-- Still no delete policy for anyone via the API. Deleting a report,
-- if ever needed, should be a deliberate manual action in the
-- Supabase dashboard, not something reachable from the app.
