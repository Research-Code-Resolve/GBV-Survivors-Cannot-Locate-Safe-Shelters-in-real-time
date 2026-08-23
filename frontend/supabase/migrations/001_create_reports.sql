-- GBV incident reports table
-- Design goal: the public/anon key can INSERT only. It can never SELECT,
-- UPDATE, or DELETE. Reading reports back requires an authenticated
-- staff/admin role, added in a later migration once the admin auth
-- flow exists.

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text,
  phone text,
  contact_method text,
  district text not null,
  safe_now text not null,
  danger text not null,
  support_needed text[] default '{}',
  description text,

  -- Ops/status fields for staff use later (not exposed to the form).
  -- 'new' until a staff member has reviewed it.
  status text not null default 'new'
);

comment on table public.reports is
  'GBV incident reports submitted via the public report form. Insert-only from anon; read access restricted to authenticated staff.';

-- Enable RLS. With RLS on and no policies, ALL access is denied by
-- default -- we then explicitly allow only what we want.
alter table public.reports enable row level security;

-- IMPORTANT: RLS policies only restrict what an already-granted role
-- can do. Postgres also requires the base table-level GRANT before a
-- role can attempt the operation at all -- without this, inserts fail
-- with "permission denied for table reports" (42501) even though the
-- policy below allows it.
grant insert on public.reports to anon;

-- Allow anyone (anon or authenticated) to INSERT a report.
-- No USING clause needed for insert; WITH CHECK controls what rows
-- can be created. `true` = no extra restriction on the row content,
-- but note: no SELECT policy exists for anon, so even the inserting
-- client cannot read back the row (Supabase inserts can be done
-- without .select() to avoid triggering a read).
create policy "anon can insert reports"
  on public.reports
  for insert
  to anon
  with check (true);

-- Explicitly: no select/update/delete policies for anon or public.
-- This means SELECT, UPDATE, DELETE are denied for the anon role,
-- which is what makes the "100% anonymous" promise on the landing
-- page actually true at the database level, not just in the UI.
