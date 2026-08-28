-- Create Trasee table first
create table public.trasee (
    id uuid primary key default gen_random_uuid(),
    nume text not null
);

-- Seed Biologie B2
insert into public.trasee (id, nume) 
values ('00000000-0000-0000-0000-000000000001', 'Biologie B2')
on conflict (id) do nothing;

-- Create public.users table (linked to auth.users)
create table public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null,
    rol text not null check (rol in ('elev', 'parinte')),
    traseu_activ_id uuid references public.trasee(id) on delete set null,
    creat_la timestamp with time zone default now()
);

-- Create Parinte-Elev Link table
create table public.parinte_elev_link (
    id uuid primary key default gen_random_uuid(),
    parinte_id uuid references public.users(id) on delete cascade not null,
    elev_id uuid references public.users(id) on delete cascade not null,
    cod_invitatie text unique not null
);

-- Create Capitole table
create table public.capitole (
    id uuid primary key default gen_random_uuid(),
    traseu_id uuid references public.trasee(id) on delete cascade not null,
    titlu text not null,
    ordine int not null,
    dificultate text
);

-- Create Lectii table
create table public.lectii (
    id uuid primary key default gen_random_uuid(),
    capitol_id uuid references public.capitole(id) on delete cascade not null,
    titlu text not null,
    continut_text text not null,
    schema_url text,
    exemple_text text
);

-- Create Intrebari table
create table public.intrebari (
    id uuid primary key default gen_random_uuid(),
    capitol_id uuid references public.capitole(id) on delete cascade not null,
    tip text not null check (tip in ('grila', 'imagine', 'asociere')),
    enunt text not null,
    optiuni_json jsonb not null,
    raspuns_corect text not null,
    explicatie text,
    dificultate text
);

-- Create Incercari table
create table public.incercari (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.users(id) on delete cascade not null,
    intrebare_id uuid references public.intrebari(id) on delete cascade not null,
    raspuns_dat text not null,
    corect boolean not null,
    context text not null check (context in ('diagnostic', 'plan_zilnic', 'simulare')),
    creat_la timestamp with time zone default now()
);

-- Create Greseli Log table
create table public.greseli_log (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.users(id) on delete cascade not null,
    intrebare_id uuid references public.intrebari(id) on delete cascade not null,
    data_greseala timestamp with time zone default now(),
    data_ultima_repetare timestamp with time zone,
    nr_repetari int default 0,
    stapanit boolean default false
);

-- Create Plan Zilnic table
create table public.plan_zilnic (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.users(id) on delete cascade not null,
    data date not null,
    lectie_id uuid references public.lectii(id) on delete cascade not null,
    status text default 'in_asteptare' not null check (status in ('in_asteptare', 'finalizat'))
);

-- Create Simulari table
create table public.simulari (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.users(id) on delete cascade not null,
    traseu_id uuid references public.trasee(id) on delete cascade not null,
    data timestamp with time zone default now(),
    scor_total int not null,
    punctaj_per_capitol jsonb not null,
    timp_folosit int
);

-- Create Abonamente table
create table public.abonamente (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.users(id) on delete cascade not null,
    tip text default 'gratuit' not null,
    data_inceput timestamp with time zone default now(),
    data_expirare timestamp with time zone,
    status text default 'activ' not null check (status in ('activ', 'expirat', 'anulat'))
);

-- Enable RLS on all tables
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

-- Setup Policies

-- Public / Authenticated reads for educational content
create policy "Utilizatorii logati pot vedea traseele" 
    on public.trasee for select to authenticated using (true);

create policy "Utilizatorii logati pot vedea capitolele" 
    on public.capitole for select to authenticated using (true);

create policy "Utilizatorii logati pot vedea lectiile" 
    on public.lectii for select to authenticated using (true);

create policy "Utilizatorii logati pot vedea intrebarile" 
    on public.intrebari for select to authenticated using (true);

-- Profiles policy
create policy "Userii isi pot citi propriul profil" 
    on public.users for select to authenticated using (auth.uid() = id);

create policy "Userii isi pot actualiza propriul profil" 
    on public.users for update to authenticated using (auth.uid() = id);

create policy "Permite crearea profilului la inregistrare" 
    on public.users for insert with check (true);

-- Personal Progress Policies (User-specific data visibility)
create policy "Userii isi vad propriile incercari" 
    on public.incercari for all to authenticated using (auth.uid() = user_id);

create policy "Userii isi vad propriile greseli" 
    on public.greseli_log for all to authenticated using (auth.uid() = user_id);

create policy "Userii isi vad propriul plan zilnic" 
    on public.plan_zilnic for all to authenticated using (auth.uid() = user_id);

create policy "Userii isi vad propriile simulari" 
    on public.simulari for all to authenticated using (auth.uid() = user_id);

create policy "Userii isi vad propriul abonament" 
    on public.abonamente for all to authenticated using (auth.uid() = user_id);

-- Parents-Student link visibility policy
create policy "Parintii si elevii implicati vad legatura"
    on public.parinte_elev_link for select to authenticated 
    using (auth.uid() = parinte_id or auth.uid() = elev_id);

create policy "Parintii pot insera legaturi"
    on public.parinte_elev_link for insert to authenticated 
    with check (auth.uid() = parinte_id);
