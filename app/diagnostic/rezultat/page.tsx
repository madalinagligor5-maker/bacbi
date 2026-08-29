import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserCurent } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { NivelCapitol, RezultatCapitol } from "@/types";

export const dynamic = "force-dynamic";

function clasifica(procent: number): NivelCapitol {
  if (procent > 80) return "verde";
  if (procent >= 50) return "galben";
  return "rosu";
}

const STIL_NIVEL: Record<NivelCapitol, { card: string; text: string; badge: string }> = {
  verde: {
    card: "border-success/30 bg-success/5",
    text: "text-success-dark",
    badge: "bg-success text-white",
  },
  galben: {
    card: "border-warning/30 bg-warning/5",
    text: "text-warning-dark",
    badge: "bg-warning text-white",
  },
  rosu: {
    card: "border-danger/30 bg-danger/5",
    text: "text-danger-dark",
    badge: "bg-danger text-white",
  },
};

const MESAJ_NIVEL: Record<NivelCapitol, string> = {
  verde: "Stăpânești bine acest capitol — hai să-l consolidăm!",
  galben: "Ești pe drumul cel bun, mai ai puțin de exersat.",
  rosu: "Aici avem cel mai mult de lucru — planul tău va prioritiza acest capitol.",
};

export default async function RezultatDiagnosticPage() {
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
    .select("id, titlu, ordine")
    .eq("traseu_id", user.traseu_activ_id)
    .order("ordine");

  const { data: incercari } = await supabase
    .from("incercari")
    .select("intrebare_id, corect, creat_la, intrebari(capitol_id)")
    .eq("user_id", user.id)
    .eq("context", "diagnostic");

  type IncercareCuCapitol = {
    intrebare_id: string;
    corect: boolean;
    creat_la: string;
    intrebari: { capitol_id: string } | { capitol_id: string }[] | null;
  };

  const ultimaIncercarePerIntrebare = new Map<string, { corect: boolean; capitol_id: string }>();
  for (const inc of (incercari ?? []) as IncercareCuCapitol[]) {
    const capitolRel = Array.isArray(inc.intrebari) ? inc.intrebari[0] : inc.intrebari;
    if (!capitolRel) continue;
    const existent = ultimaIncercarePerIntrebare.get(inc.intrebare_id);
    if (!existent) {
      ultimaIncercarePerIntrebare.set(inc.intrebare_id, {
        corect: inc.corect,
        capitol_id: capitolRel.capitol_id,
      });
    }
  }

  const statsPerCapitol = new Map<string, { corecte: number; total: number }>();
  for (const { corect, capitol_id } of Array.from(ultimaIncercarePerIntrebare.values())) {
    const curent = statsPerCapitol.get(capitol_id) ?? { corecte: 0, total: 0 };
    curent.total += 1;
    if (corect) curent.corecte += 1;
    statsPerCapitol.set(capitol_id, curent);
  }

  const rezultate: RezultatCapitol[] = (capitole ?? []).map((c) => {
    const stats = statsPerCapitol.get(c.id) ?? { corecte: 0, total: 0 };
    const procent = stats.total > 0 ? Math.round((stats.corecte / stats.total) * 100) : 0;
    return {
      capitol_id: c.id,
      titlu: c.titlu,
      procent,
      nivel: clasifica(procent),
    };
  });

  const areDate = rezultate.some((r) => statsPerCapitol.has(r.capitol_id));

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-foreground">Harta ta de rezultate</h1>
          <p className="text-slate-500">
            {areDate
              ? "Iată cum arată nivelul tău pe fiecare capitol după testul diagnostic."
              : "Nu am găsit răspunsuri la testul diagnostic — poți relua testul oricând."}
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          {rezultate.map((r) => {
            const stil = STIL_NIVEL[r.nivel];
            return (
              <div
                key={r.capitol_id}
                className={`rounded-2xl border-2 p-5 text-left shadow-sm ${stil.card}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="font-bold text-foreground">{r.titlu}</h2>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${stil.badge}`}>
                    {r.procent}%
                  </span>
                </div>
                <p className={`text-sm ${stil.text}`}>{MESAJ_NIVEL[r.nivel]}</p>
              </div>
            );
          })}
        </div>

        <Link
          href="/dashboard"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
        >
          Vezi planul tău personalizat
        </Link>
      </div>
    </main>
  );
}
