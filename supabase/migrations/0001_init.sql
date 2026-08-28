-- BacPilot — schema inițial
-- Tabele de domeniu, relații și Row Level Security (RLS).

create extension if not exists "pgcrypto";

-- =========================================================================
-- USERS (profil aplicație, legat 1:1 de auth.users)
-- =========================================================================
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  rol text not null check (rol in ('elev', 'parinte', 'admin')),
  traseu_activ_id uuid references public.trasee (id),
  creat_la timestamptz not null default now()
);

-- =========================================================================
-- TRASEE
-- =========================================================================
create table if not exists public.trasee (
  id uuid primary key default gen_random_uuid(),
  nume text not null
);

alter table public.users
  add constraint users_traseu_activ_id_fkey
  foreign key (traseu_activ_id) references public.trasee (id);

-- =========================================================================
-- PARINTE_ELEV_LINK
-- =========================================================================
create table if not exists public.parinte_elev_link (
  id uuid primary key default gen_random_uuid(),
  parinte_id uuid references public.users (id) on delete cascade,
  elev_id uuid not null references public.users (id) on delete cascade,
  cod_invitatie text not null unique
);

-- =========================================================================
-- CAPITOLE
-- =========================================================================
create table if not exists public.capitole (
  id uuid primary key default gen_random_uuid(),
  traseu_id uuid not null references public.trasee (id) on delete cascade,
  titlu text not null,
  ordine int not null default 0,
  dificultate text
);

-- =========================================================================
-- LECTII
-- =========================================================================
create table if not exists public.lectii (
  id uuid primary key default gen_random_uuid(),
  capitol_id uuid not null references public.capitole (id) on delete cascade,
  titlu text not null,
  continut_text text,
  schema_url text,
  exemple_text text
);

-- =========================================================================
-- INTREBARI
-- =========================================================================
create table if not exists public.intrebari (
  id uuid primary key default gen_random_uuid(),
  capitol_id uuid not null references public.capitole (id) on delete cascade,
  tip text not null check (tip in ('grila', 'imagine', 'asociere')),
  enunt text not null,
  optiuni_json jsonb,
  raspuns_corect text not null,
  explicatie text,
  dificultate text
);

-- =========================================================================
-- INCERCARI
-- =========================================================================
create table if not exists public.incercari (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  intrebare_id uuid not null references public.intrebari (id) on delete cascade,
  raspuns_dat text,
  corect boolean not null default false,
  context text not null check (context in ('diagnostic', 'plan_zilnic', 'simulare')),
  creat_la timestamptz not null default now()
);

-- =========================================================================
-- GRESELI_LOG
-- =========================================================================
create table if not exists public.greseli_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  intrebare_id uuid not null references public.intrebari (id) on delete cascade,
  data_greseala date not null default current_date,
  data_ultima_repetare date,
  nr_repetari int not null default 0,
  stapanit boolean not null default false
);

-- =========================================================================
-- PLAN_ZILNIC
-- =========================================================================
create table if not exists public.plan_zilnic (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  data date not null default current_date,
  lectie_id uuid references public.lectii (id),
  status text not null default 'in_asteptare'
);

-- =========================================================================
-- SIMULARI
-- =========================================================================
create table if not exists public.simulari (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  traseu_id uuid not null references public.trasee (id) on delete cascade,
  data timestamptz not null default now(),
  scor_total int,
  punctaj_per_capitol jsonb,
  timp_folosit int
);

-- =========================================================================
-- ABONAMENTE
-- =========================================================================
create table if not exists public.abonamente (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  tip text not null default 'gratuit' check (tip in ('gratuit', 'start', 'complet', 'premium')),
  data_inceput timestamptz not null default now(),
  data_expirare timestamptz,
  status text not null default 'activ'
);

-- =========================================================================
-- Date inițiale
-- =========================================================================
insert into public.trasee (nume)
  select 'Biologie B2'
  where not exists (select 1 from public.trasee where nume = 'Biologie B2');

-- =========================================================================
-- ROW LEVEL SECURITY
-- =========================================================================
alter table public.users enable row level security;
alter table public.parinte_elev_link enable row level security;
alter table public.trasee enable row level security;
alter table public.capitole enable row level security;
alter table public.lectii enable row level security;
alter table public.intrebari enable row level security;
alter table public.incercari enable row level security;
alter table public.greseli_log enable row level security;
alter table public.plan_zilnic enable row level security;
alter table public.simulari enable row level security;
alter table public.abonamente enable row level security;

-- users: fiecare user citește/actualizează doar propriul rând
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);
create policy "users_update_own" on public.users
  for update using (auth.uid() = id);
create policy "users_insert_own" on public.users
  for insert with check (auth.uid() = id);

-- parinte_elev_link: vizibil părintelui sau elevului implicat
create policy "parinte_elev_link_select" on public.parinte_elev_link
  for select using (auth.uid() = parinte_id or auth.uid() = elev_id);
create policy "parinte_elev_link_insert_elev" on public.parinte_elev_link
  for insert with check (auth.uid() = elev_id);
create policy "parinte_elev_link_update_parinte" on public.parinte_elev_link
  for update using (parinte_id is null or auth.uid() = parinte_id);

-- conținut (trasee/capitole/lectii/intrebari): citire publică pentru useri autentificați
create policy "trasee_select_authenticated" on public.trasee
  for select using (auth.role() = 'authenticated');
create policy "capitole_select_authenticated" on public.capitole
  for select using (auth.role() = 'authenticated');
create policy "lectii_select_authenticated" on public.lectii
  for select using (auth.role() = 'authenticated');
create policy "intrebari_select_authenticated" on public.intrebari
  for select using (auth.role() = 'authenticated');

-- date personale: fiecare user vede/scrie doar propriile date
create policy "incercari_all_own" on public.incercari
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "greseli_log_all_own" on public.greseli_log
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "plan_zilnic_all_own" on public.plan_zilnic
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "simulari_all_own" on public.simulari
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "abonamente_all_own" on public.abonamente
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- rapoarte pentru părinte: acces citire la incercari/greseli_log/simulari ale elevului legat
create policy "incercari_select_parinte" on public.incercari
  for select using (
    exists (
      select 1 from public.parinte_elev_link l
      where l.elev_id = incercari.user_id and l.parinte_id = auth.uid()
    )
  );
create policy "greseli_log_select_parinte" on public.greseli_log
  for select using (
    exists (
      select 1 from public.parinte_elev_link l
      where l.elev_id = greseli_log.user_id and l.parinte_id = auth.uid()
    )
  );
create policy "simulari_select_parinte" on public.simulari
  for select using (
    exists (
      select 1 from public.parinte_elev_link l
      where l.elev_id = simulari.user_id and l.parinte_id = auth.uid()
    )
  );
create policy "plan_zilnic_select_parinte" on public.plan_zilnic
  for select using (
    exists (
      select 1 from public.parinte_elev_link l
      where l.elev_id = plan_zilnic.user_id and l.parinte_id = auth.uid()
    )
  );
