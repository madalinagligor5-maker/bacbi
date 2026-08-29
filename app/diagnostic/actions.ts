"use server";

import { createClient } from "@/lib/supabase/server";

export async function salveazaRaspunsDiagnostic(intrebareId: string, raspunsDat: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Nu ești autentificat.");
  }

  const { data: intrebare, error: intrebareError } = await supabase
    .from("intrebari")
    .select("raspuns_corect")
    .eq("id", intrebareId)
    .single();

  if (intrebareError || !intrebare) {
    throw new Error("Întrebarea nu a putut fi găsită.");
  }

  const corect = intrebare.raspuns_corect === raspunsDat;

  const { error } = await supabase.from("incercari").insert({
    user_id: user.id,
    intrebare_id: intrebareId,
    raspuns_dat: raspunsDat,
    corect,
    context: "diagnostic",
  });

  if (error) {
    throw new Error(error.message);
  }

  return { corect };
}
