# BacPilot - Pregătire Inteligentă pentru BAC (Supabase Core)

Fundația aplicației BacPilot pentru pregătirea examenului de Bacalaureat, cu suport de bază de date (Supabase), sistem complet de autentificare cu roluri (elev/părinte) și ecran de selectare a traseului.

## Structură Proiect

- `supabase/migrations/`: Conține scriptul SQL de generare a tabelelor, seeding-ul pentru "Biologie B2" și politicile Row Level Security (RLS).
- `src/lib/supabase.ts`: Wrapper de conectare care detectează lipsa cheilor și pornește automat un **Mock Client complet funcțional bazat pe LocalStorage** pentru testare offline instantă.
- `src/app/register/`: Înregistrare elev (cu generare cod invitație) sau părinte (cu link-uire pe baza codului elevului).
- `src/app/choose-track/`: Selectare traseu didactic ("Biologie B2").
- `src/app/dashboard/`: Panoul principal cu date de profil, codul de invitație și deconectare.

---

## Mod de Testare Rapidă (Offline / Fără Supabase)
Dacă nu dorești să configurezi un proiect live în Supabase în acest moment, **aplicația rulează direct în browser în mod offline / Mock**:
1. Înregistrează un Elev. Acesta va primi un cod de invitație pe Dashboard de forma `BP-[email]`.
2. Deloghează-te și înregistrează un Părinte introducând codul elevului copiat anterior.
3. Tot istoricul și conturile sunt salvate în `localStorage`.

---

## Mod Live (Conectare Supabase Reală)
Dacă dorești să utilizezi o bază de date reală Supabase:
1. Creează un proiect pe [Supabase](https://supabase.com).
2. Rulează codul SQL din `supabase/migrations/20260828000000_init_schema.sql` în editorul SQL Supabase (SQL Editor).
3. Creează un fișier `.env.local` în rădăcina proiectului:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=URL_UL_TAU_SUPABASE
   NEXT_PUBLIC_SUPABASE_ANON_KEY=CHEIA_TA_ANON_SUPABASE
   ```
4. Repornește serverul local.

---

## Instalare & Rulare Locală
```bash
npm install
npm run dev
```

---

## Trimitere cod pe GitHub

Pentru a urca acest proiect în repository-ul dedicat (`madalinagligor5-maker/bacpilot`):
```bash
git init
git add .
git commit -m "feat: initial commit with BacPilot Next.js & Supabase foundation"
git branch -M main
git remote add origin https://github.com/madalinagligor5-maker/bacpilot.git
git push -u origin main
```
