"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Rol } from "@/types";

function genereazaCodInvitatie(): string {
  const alfabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let cod = "";
  for (let i = 0; i < 6; i++) {
    cod += alfabet[Math.floor(Math.random() * alfabet.length)];
  }
  return cod;
}

export type AuthState = { error: string | null };

export async function inregistreaza(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const parola = String(formData.get("parola") ?? "");
  const rol = String(formData.get("rol") ?? "") as Rol;
  const codInvitatie = String(formData.get("cod_invitatie") ?? "").trim().toUpperCase();

  if (!email || !parola || (rol !== "elev" && rol !== "parinte")) {
    return { error: "Completează toate câmpurile obligatorii." };
  }

  if (rol === "parinte" && !codInvitatie) {
    return { error: "Codul de invitație de la elev este obligatoriu pentru contul de părinte." };
  }

  const supabase = createClient();

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password: parola,
  });

  if (signUpError || !signUpData.user) {
    return { error: signUpError?.message ?? "Înregistrarea a eșuat." };
  }

  const userId = signUpData.user.id;

  const { error: profilError } = await supabase.from("users").insert({
    id: userId,
    email,
    rol,
  });

  if (profilError) {
    return { error: `Cont creat, dar profilul nu a putut fi salvat: ${profilError.message}` };
  }

  if (rol === "parinte") {
    const { data: link, error: linkFindError } = await supabase
      .from("parinte_elev_link")
      .select("id, parinte_id")
      .eq("cod_invitatie", codInvitatie)
      .maybeSingle();

    if (linkFindError || !link) {
      return { error: "Codul de invitație nu este valid." };
    }
    if (link.parinte_id) {
      return { error: "Acest cod de invitație a fost deja folosit." };
    }

    const { error: linkUpdateError } = await supabase
      .from("parinte_elev_link")
      .update({ parinte_id: userId })
      .eq("id", link.id);

    if (linkUpdateError) {
      return { error: `Contul de elev nu a putut fi legat: ${linkUpdateError.message}` };
    }
  }

  redirect(rol === "elev" ? "/traseu" : "/dashboard");
}

export async function autentifica(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const parola = String(formData.get("parola") ?? "");

  if (!email || !parola) {
    return { error: "Completează email și parola." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: parola });

  if (error) {
    return { error: "Email sau parolă incorectă." };
  }

  redirect("/dashboard");
}

export async function delogheaza() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export async function genereazaCodInvitatiePentruElev(elevId: string) {
  const supabase = createClient();

  const { data: existent } = await supabase
    .from("parinte_elev_link")
    .select("cod_invitatie")
    .eq("elev_id", elevId)
    .is("parinte_id", null)
    .maybeSingle();

  if (existent) {
    return existent.cod_invitatie as string;
  }

  const cod = genereazaCodInvitatie();
  const { error } = await supabase.from("parinte_elev_link").insert({
    elev_id: elevId,
    cod_invitatie: cod,
  });

  if (error) {
    throw new Error(error.message);
  }

  return cod;
}
