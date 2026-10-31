-- LiqenInsight SEIA — Esquema PostgreSQL / Supabase (borrador para revisión).
-- Aislamiento por organización mediante RLS. Ejecutar en un proyecto Supabase nuevo.

create extension if not exists "pgcrypto";
create extension if not exists postgis; -- opcional, para project_locations.geom

create table organizations (id uuid primary key default gen_random_uuid(), name text not null, created_at timestamptz default now());
create table memberships (
  org_id uuid references organizations on delete cascade, user_id uuid references auth.users on delete cascade,
  role text not null check (role in ('owner','editor','revisor','lector')), primary key (org_id, user_id));

create table projects (
  id uuid primary key default gen_random_uuid(), org_id uuid not null references organizations on delete cascade,
  name text not null, titular text, sector text, created_by uuid references auth.users, created_at timestamptz default now(), archived boolean default false);

-- Cada edición de la ficha genera una versión inmutable; las evaluaciones apuntan a una versión.
create table project_versions (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references projects on delete cascade,
  version_no int not null, payload jsonb not null, created_by uuid references auth.users, created_at timestamptz default now(),
  unique (project_id, version_no));

create table project_activities (id uuid primary key default gen_random_uuid(), project_version_id uuid references project_versions on delete cascade, activity_code text not null, is_primary boolean default false);
create table project_parameters (
  id uuid primary key default gen_random_uuid(), project_version_id uuid references project_versions on delete cascade,
  input_code text not null, value_num numeric, value_bool boolean, value_text text, unit text,
  source text, source_date date, document_id uuid, origin text check (origin in ('usuario','extraido','extraido_confirmado')) default 'usuario');
create table project_locations (
  id uuid primary key default gen_random_uuid(), project_version_id uuid references project_versions on delete cascade,
  element_code text not null, relation text check (relation in ('dentro','colindante','fuera','desconocido')),
  source text, geom geometry(Geometry, 4326));
create table project_documents (
  id uuid primary key default gen_random_uuid(), project_id uuid references projects on delete cascade,
  storage_path text not null, file_name text, mime text, size_bytes bigint, sha256 text,
  uploaded_by uuid references auth.users, uploaded_at timestamptz default now());

create table legal_sources (id text primary key, title text not null, kind text, url text, status text, note text);
create table legal_source_versions (
  id uuid primary key default gen_random_uuid(), source_id text references legal_sources, label text,
  published_at date, effective_from date, effective_to date, consulted_at date, text_hash text);

create table legal_rules (
  rule_id text not null, version_id text not null, rule_name text not null, rule_type text not null,
  legal_reference text, source_url text, source_version_id uuid references legal_source_versions,
  effective_from date not null, effective_to date, required_inputs text[], logic_expression jsonb not null,
  exceptions jsonb default '[]', result_code text, explanation_template text, evidence_required text[],
  validation_status text not null check (validation_status in ('PENDIENTE_VALIDACION','FUENTE_SECUNDARIA','TEXTO_OFICIAL_CONTRASTADO','VALIDADA_JURIDICAMENTE')),
  reviewer uuid references auth.users, last_reviewed_at timestamptz,
  primary key (rule_id, version_id),
  check (effective_to is null or effective_to >= effective_from));
-- rule_conditions se materializa a partir de logic_expression para consultas e índices.
create table rule_conditions (id uuid primary key default gen_random_uuid(), rule_id text, version_id text, path text, node_type text, input_code text, operator text, threshold numeric, unit text,
  foreign key (rule_id, version_id) references legal_rules);
create table rule_dependencies (rule_id text, depends_on text, primary key (rule_id, depends_on));

create table rule_evaluations (
  id uuid primary key default gen_random_uuid(), project_version_id uuid not null references project_versions,
  evaluation_date date not null, engine_version text not null, catalog_version text not null,
  input_snapshot jsonb not null, global_result text not null, warnings jsonb, created_by uuid references auth.users, created_at timestamptz default now());
create table evaluation_results (
  id uuid primary key default gen_random_uuid(), evaluation_id uuid references rule_evaluations on delete cascade,
  rule_id text, version_id text, status text not null, explanation text, trace jsonb, missing jsonb, role text);
create table evaluation_evidence (evaluation_result_id uuid references evaluation_results on delete cascade, document_id uuid references project_documents, note text);

create table pas_catalog (id text primary key, articulo text, nombre text, organismo text, norma text, objeto text, tipo text check (tipo in ('ambiental','mixto','por_verificar')), activation jsonb, requisitos jsonb, guia_url text, fuente text, vigencia text, validation_status text);
create table environmental_obligations (id text primary key, materia text, norma text, articulo text, resumen text, condition jsonb, obligacion text, forma_cumplimiento text, evidencia text, fase text, responsable text, frecuencia text, autoridad text, fuente text, vigencia text, validation_status text);
create table rca_obligations (
  id uuid primary key default gen_random_uuid(), project_id uuid references projects on delete cascade, rca_number text,
  document_id uuid references project_documents, source_section text not null, kind text, description text, limit_value text, deadline text,
  responsible text, evidence text, phase text, origin text check (origin in ('manual','extraida')), confirmed_by uuid references auth.users, confirmed_at timestamptz);

create table audit_logs (id bigint generated always as identity primary key, org_id uuid, actor uuid, action text, entity text, entity_id text, diff jsonb, at timestamptz default now());

-- Inmutabilidad de evaluaciones y versiones de reglas publicadas.
create or replace function forbid_update() returns trigger language plpgsql as $$ begin raise exception 'Registro inmutable'; end $$;
create trigger rule_evaluations_immutable before update on rule_evaluations for each row execute function forbid_update();
create trigger project_versions_immutable before update on project_versions for each row execute function forbid_update();

-- Row Level Security
alter table projects enable row level security;
alter table project_versions enable row level security;
alter table project_documents enable row level security;
alter table rule_evaluations enable row level security;
alter table rca_obligations enable row level security;
create or replace function is_member(o uuid) returns boolean language sql stable as $$ select exists (select 1 from memberships m where m.org_id = o and m.user_id = auth.uid()) $$;
create policy proj_rw on projects using (is_member(org_id)) with check (is_member(org_id));
create policy ver_rw on project_versions using (exists (select 1 from projects p where p.id = project_id and is_member(p.org_id)));
create policy doc_rw on project_documents using (exists (select 1 from projects p where p.id = project_id and is_member(p.org_id)));
create policy rca_rw on rca_obligations using (exists (select 1 from projects p where p.id = project_id and is_member(p.org_id)));
create policy eval_r on rule_evaluations using (exists (select 1 from project_versions v join projects p on p.id = v.project_id where v.id = project_version_id and is_member(p.org_id)));
-- El catálogo normativo es de lectura para usuarios autenticados y de escritura solo para el rol de servicio.
alter table legal_rules enable row level security;
create policy rules_read on legal_rules for select using (auth.role() = 'authenticated');
-- Storage: bucket privado 'project-documents' con rutas org_id/project_id/archivo y política equivalente a doc_rw.
