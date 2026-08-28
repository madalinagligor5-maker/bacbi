import { createClient } from "@/lib/supabase/server";
import type { AppUser } from "@/types";

/**
 * Returnează userul autentificat + profilul din public.users, sau null.
 * Folosit în Server Components pentru a proteja rute.
 */
export async function getUserCurent(): Promise<AppUser | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profil } = await supabase.from("users").select("*").eq("id", user.id).single();

  return (profil as AppUser) ?? null;
}
