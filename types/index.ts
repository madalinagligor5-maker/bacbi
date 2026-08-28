// Tipuri de domeniu BacPilot — reflectă schema din supabase/migrations/0001_init.sql

export type Rol = "elev" | "parinte" | "admin";

export interface AppUser {
  id: string;
  email: string;
  rol: Rol;
  traseu_activ_id: string | null;
  creat_la: string;
}

export interface ParinteElevLink {
  id: string;
  parinte_id: string | null;
  elev_id: string;
  cod_invitatie: string;
}

export interface Traseu {
  id: string;
  nume: string;
}

export type Dificultate = "usor" | "mediu" | "dificil";

export interface Capitol {
  id: string;
  traseu_id: string;
  titlu: string;
  ordine: number;
  dificultate: Dificultate | null;
}

export interface Lectie {
  id: string;
  capitol_id: string;
  titlu: string;
  continut_text: string | null;
  schema_url: string | null;
  exemple_text: string | null;
}

export type TipIntrebare = "grila" | "imagine" | "asociere";

export interface Intrebare {
  id: string;
  capitol_id: string;
  tip: TipIntrebare;
  enunt: string;
  optiuni_json: string[] | null;
  raspuns_corect: string;
  explicatie: string | null;
  dificultate: Dificultate | null;
}

export type ContextIncercare = "diagnostic" | "plan_zilnic" | "simulare";

export interface Incercare {
  id: string;
  user_id: string;
  intrebare_id: string;
  raspuns_dat: string | null;
  corect: boolean;
  context: ContextIncercare;
  creat_la: string;
}

export interface GreseliLog {
  id: string;
  user_id: string;
  intrebare_id: string;
  data_greseala: string;
  data_ultima_repetare: string | null;
  nr_repetari: number;
  stapanit: boolean;
}

export interface PlanZilnic {
  id: string;
  user_id: string;
  data: string;
  lectie_id: string | null;
  status: string;
}

export interface Simulare {
  id: string;
  user_id: string;
  traseu_id: string;
  data: string;
  scor_total: number | null;
  punctaj_per_capitol: Record<string, number> | null;
  timp_folosit: number | null;
}

export type TipAbonament = "gratuit" | "start" | "complet" | "premium";

export interface Abonament {
  id: string;
  user_id: string;
  tip: TipAbonament;
  data_inceput: string;
  data_expirare: string | null;
  status: string;
}

// Harta de rezultate per capitol (folosită pentru testul diagnostic — Etapa 2)
export type NivelCapitol = "verde" | "galben" | "rosu";

export interface RezultatCapitol {
  capitol_id: string;
  titlu: string;
  procent: number;
  nivel: NivelCapitol;
}
