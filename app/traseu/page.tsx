import { redirect } from "next/navigation";
import { getUserCurent } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { alegeTraseu } from "@/app/traseu/actions";
import type { Traseu } from "@/types";

export const dynamic = "force-dynamic";

export default async function AlegeTraseuPage() {
  const user = await getUserCurent();

  if (!user) {
    redirect("/auth/login");
  }
  if (user.rol !== "elev") {
    redirect("/dashboard");
  }
  if (user.traseu_activ_id) {
    redirect("/dashboard");
  }

  const supabase = createClient();
  const { data: trasee } = await supabase.from("trasee").select("*").order("nume");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-lg text-center">
        <h1 className="mb-2 text-3xl font-extrabold text-foreground">Alege traseul tău</h1>
        <p className="mb-8 text-slate-500">
          Traseul stabilește planul de învățare personalizat pentru tine.
        </p>

        <div className="flex flex-col gap-3">
          {(trasee as Traseu[] | null)?.map((traseu) => (
            <form key={traseu.id} action={alegeTraseu.bind(null, traseu.id)}>
              <button
                type="submit"
                className="w-full rounded-2xl border-2 border-primary/20 bg-white px-6 py-5 text-left shadow-sm transition hover:border-primary hover:shadow-md"
              >
                <span className="block text-lg font-bold text-foreground">{traseu.nume}</span>
                <span className="mt-1 block text-sm text-slate-500">
                  Selectează acest traseu pentru a începe testul diagnostic.
                </span>
              </button>
            </form>
          ))}

          {(!trasee || trasee.length === 0) && (
            <p className="rounded-lg bg-warning/10 px-4 py-3 text-sm text-warning-dark">
              Niciun traseu disponibil momentan. Rulează migrarea din supabase/migrations.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
