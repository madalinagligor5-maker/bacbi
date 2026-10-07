import AntetPagina from "@/components/AntetPagina";
import Icon from "@/components/Icon";
import { STRUCTURA_PROBA } from "@/lib/examen";

export default function SimulareInDesfasurare() {
  return (
    <main className="mx-auto max-w-2xl px-4 pt-6">
      <div className="sticky top-14 z-10 -mx-4 mb-6 flex items-center justify-between border-b border-line bg-bg px-4 py-3">
        <span className="flex items-center gap-2 font-display text-2xl font-bold tabular-nums">
          <Icon nume="simulare" className="h-5 w-5 text-accent" /> 3:00:00
        </span>
        <span className="text-sm text-muted">Salvare automată</span>
      </div>
      <AntetPagina inapoi={{ href: "/simulare", text: "Simulări" }} titlu="Simulare în desfășurare" subtitlu="Navighezi liber între itemi; răspunsurile se salvează singure." />
      <div className="flex flex-wrap gap-2">
        {STRUCTURA_PROBA.flatMap((s) =>
          s.cerinte.map((c) => (
            <span key={`${s.subiect}${c.cod}`} className="chip">
              {s.subiect}.{c.cod}
            </span>
          )),
        )}
      </div>
      <p className="card mt-6 p-5 text-muted">Simulările se activează după ce sunt compuse și validate în zona de administrare.</p>
    </main>
  );
}
