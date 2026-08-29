-- BacPilot — sincronizare automată auth.users -> public.users
-- Creează profilul imediat la înregistrare, indiferent dacă email-ul e
-- confirmat sau nu (rezolvă blocajul RLS: la signUp fără sesiune activă,
-- insert-ul manual din server action eșua din cauza auth.uid() = null).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, rol)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'rol', 'elev')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
