import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import Icon from "@/components/Icon";
import { EXAMEN, STRUCTURA_PROBA } from "@/lib/examen";

const REGULI = [
  { valoare: `${EXAMEN.durataMinute / 60} ore`, eticheta: "cronometrate" },
  { valoare: `${EXAMEN.punctajMaxim} p`, eticheta: `${EXAMEN.puncteDinOficiu} din oficiu` },
  { valoare: `nota ${EXAMEN.notaPromovare}`, eticheta: "pentru promovare" },
];

export default function Simulare() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 pt-8">
      <AntetPagina titlu="Simulare" subtitlu="Examen complet, ca în sală, cu notă estimată la final." />

      <div className="grid grid-cols-3 gap-3">
        {REGULI.map((r) => (
          <div key={r.eticheta} className="card p-4 text-center">
            <p className="font-display text-xl font-bold">{r.valoare}</p>
            <p className="text-xs text-muted">{r.eticheta}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 font-display text-xl font-bold">Simulări disponibile</h2>
        <div className="card flex items-center gap-4 p-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <Icon nume="simulare" className="h-6 w-6" />
          </span>
          <span className="flex-1">
            <span className="block font-semibold">Simulare de probă · Varianta I</span>
            <span className="block text-sm text-muted">Gratuită · se compune din itemii validați</span>
          </span>
          <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-muted">În curând</span>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl font-bold">Cum arată proba</h2>
        <div className="space-y-3">
          {STRUCTURA_PROBA.map((s) => (
            <div key={s.subiect} className="card p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-bold">Subiectul {s.subiect}</h3>
                <span className="font-semibold text-primary">{s.puncte} p</span>
              </div>
              <ul className="mt-3 space-y-2">
                {s.cerinte.map((c) => (
                  <li key={c.cod} className="flex items-start gap-3 text-sm">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-surface-2 text-xs font-bold text-muted">
                      {c.cod}
                    </span>
                    <span className="flex-1">{c.ce}</span>
                    <span className="shrink-0 tabular-nums text-muted">{c.puncte} p</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          Structura e reconstituită din subiectul de bac 2025 și simularea 2026. Baremul oficial încă lipsește.
        </p>
      </section>

      <Link href="/grile" className="btn-secondary w-full">
        Până atunci, exersează pe grile
      </Link>
    </main>
  );
}
