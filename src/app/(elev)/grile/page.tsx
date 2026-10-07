import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import ComutatorVarianta from "@/components/ComutatorVarianta";
import Icon from "@/components/Icon";
import { VARIANTE, getVarianta } from "@/lib/curriculum";
import { itemiAutocorectabili } from "@/lib/continut";

const DIFICULTATI = [
  { valoare: "", eticheta: "Toate" },
  { valoare: "1", eticheta: "Ușor" },
  { valoare: "2", eticheta: "Mediu" },
  { valoare: "3", eticheta: "Greu" },
];

export default function Grile({
  searchParams,
}: {
  searchParams: { dificultate?: string; varianta?: string };
}) {
  const dificultate = searchParams.dificultate ?? "";
  const varianta = getVarianta(searchParams.varianta ?? "") ?? VARIANTE[0];
  const sufix = dificultate ? `?dificultate=${dificultate}` : "";

  const randuri = varianta.capitole.map((c) => ({
    capitol: c,
    n: itemiAutocorectabili(c.id).filter((i) => !dificultate || String(i.difficulty) === dificultate).length,
  }));

  return (
    <main className="mx-auto max-w-2xl px-4 pt-8">
      <AntetPagina titlu="Grile" subtitlu="O întrebare pe ecran, explicația imediat după răspuns." />
      <ComutatorVarianta activa={varianta} baza="/grile" />

      <div className="mb-6 flex flex-wrap gap-2" aria-label="Dificultate">
        {DIFICULTATI.map((d) => {
          const params = new URLSearchParams({ varianta: varianta.id });
          if (d.valoare) params.set("dificultate", d.valoare);
          return (
            <Link
              key={d.valoare}
              href={`/grile?${params}`}
              className={`chip ${d.valoare === dificultate ? "chip-active" : ""}`}
            >
              {d.eticheta}
            </Link>
          );
        })}
        <span className="chip cursor-not-allowed opacity-50" title="Disponibil după ce progresul se salvează">
          Doar greșite
        </span>
      </div>

      <ul className="space-y-3">
        {randuri.map(({ capitol: c, n }) => (
          <li key={c.id}>
            {n > 0 ? (
              <Link href={`/grile/${c.slug}${sufix}`} className="card flex items-center gap-4 p-4 hover:border-primary">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft font-display text-sm font-bold text-primary">
                  {c.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-snug">{c.titlu}</span>
                  <span className="block text-sm text-muted">{n} întrebări</span>
                </span>
                <Icon nume="sageata" className="h-5 w-5 shrink-0 text-muted" />
              </Link>
            ) : (
              <div className="card flex items-center gap-4 p-4 opacity-60">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 font-display text-sm font-bold text-muted">
                  {c.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-snug">{c.titlu}</span>
                  <span className="block text-sm text-muted">În pregătire</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
