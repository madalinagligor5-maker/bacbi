import { redirect } from "next/navigation";
import { getUserCurent } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { delogheaza, genereazaCodInvitatiePentruElev } from "@/app/auth/actions";
import type { Traseu } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getUserCurent();

  if (!user) {
    redirect("/auth/login");
  }
  if (user.rol === "elev" && !user.traseu_activ_id) {
    redirect("/traseu");
  }

  const supabase = createClient();

  let traseu: Traseu | null = null;
  if (user.traseu_activ_id) {
    const { data } = await supabase.from("trasee").select("*").eq("id", user.traseu_activ_id).single();
    traseu = data;
  }

  let codInvitatie: string | null = null;
  if (user.rol === "elev") {
    codInvitatie = await genereazaCodInvitatiePentruElev(user.id);
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">
              Salut, {user.email.split("@")[0]}!
            </h1>
            {traseu && <p className="text-sm text-slate-500">Traseu activ: {traseu.nume}</p>}
          </div>
          <form action={delogheaza}>
            <button
              type="submit"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Delogare
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-bold text-foreground">Dashboard — în construcție</h2>
          <p className="text-sm text-slate-500">
            Planul zilnic, hărțile de progres și exercițiile vor apărea aici (Etapa 2 și 3).
          </p>
        </div>

        {user.rol === "elev" && codInvitatie && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-bold text-foreground">Invită un părinte</h2>
            <p className="mb-3 text-sm text-slate-500">
              Dă-i acest cod părintelui tău pentru a-și crea un cont legat de al tău.
            </p>
            <p className="w-fit rounded-lg bg-white px-4 py-2 font-mono text-xl font-bold tracking-widest text-primary shadow-sm">
              {codInvitatie}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
