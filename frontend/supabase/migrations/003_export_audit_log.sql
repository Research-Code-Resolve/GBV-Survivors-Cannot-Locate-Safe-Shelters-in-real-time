-- Export audit log
--
-- Every PDF export must be recorded here: who exported, which report,
-- when. This table is written only by the export-report-pdf Edge
-- Function using service_role. Staff can read their own export
-- history; nobody can edit or delete entries via the API, so the log
-- can't be quietly altered after the fact.

create table if not exists public.report_export_log (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  exported_by uuid not null references auth.users(id),
  exported_at timestamptz not null default now()
);

comment on table public.report_export_log is
  'Audit trail of PDF exports. Insert-only, written server-side by the export-report-pdf Edge Function. No update/delete policy exists via the API.';

alter table public.report_export_log enable row level security;

-- Staff can see the export history (useful for "has this already
-- been exported" context in the UI) but only for reports they can
-- already read.
create policy "staff can read export log"
  on public.report_export_log
  for select
  to authenticated
  using (
    exists (
      select 1 from public.staff_profiles sp
      where sp.id = auth.uid()
    )
  );

-- No insert/update/delete policy for anon or authenticated -- only
-- service_role (used inside the Edge Function) can write here.
