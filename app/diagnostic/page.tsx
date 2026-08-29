import { redirect } from "next/navigation";
import { getUserCurent } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import DiagnosticClient from "@/app/diagnostic/DiagnosticClient";
import type { Intrebare } from "@/types";

export const dynamic = "force-dynamic";

function amesteca<T>(lista: T[]): T[] {
  const rezultat = [...lista];
  for (let i = rezultat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rezultat[i], rezultat[j]] = [rezultat[j], rezultat[i]];
  }
  return rezultat;
}

export default async function DiagnosticPage() {
  const user = await getUserCurent();

  if (!user) {
    redirect("/auth/login");
  }
  if (!user.traseu_activ_id) {
    redirect("/traseu");
  }

  const supabase = createClient();

  const { data: capitole } = await supabase
    .from("capitole")
    .select("id")
    .eq("traseu_id", user.traseu_activ_id);

  const capitolIds = (capitole ?? []).map((c) => c.id);

  if (capitolIds.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <p className="max-w-md text-slate-500">
          Nu există încă întrebări pentru traseul tău. Rulează seed-ul din supabase/seed.sql.
        </p>
      </main>
    );
  }

  const { data: intrebari } = await supabase
    .from("intrebari")
    .select("id, capitol_id, tip, enunt, optiuni_json, raspuns_corect, explicatie, dificultate")
    .in("capitol_id", capitolIds);

  const intrebariAmestecate = amesteca((intrebari ?? []) as Intrebare[]).map((i) => ({
    id: i.id,
    capitol_id: i.capitol_id,
    enunt: i.enunt,
    optiuni_json: i.optiuni_json,
  }));

  return <DiagnosticClient intrebari={intrebariAmestecate} />;
}
