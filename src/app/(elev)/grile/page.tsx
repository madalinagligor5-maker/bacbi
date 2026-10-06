import Link from "next/link";
import { VARIANTE } from "@/lib/curriculum";
import { itemiAutocorectabili } from "@/lib/continut";

const DIFICULTATI = [
  { valoare: "", eticheta: "Toate" },
  { valoare: "1", eticheta: "Ușor" },
  { valoare: "2", eticheta: "Mediu" },
  { valoare: "3", eticheta: "Greu" },
];

export default function Grile({ searchParams }: { searchParams: { dificultate?: string } }) {
  const dificultate = searchParams.dificultate ?? "";
  const sufix = dificultate ? `?dificultate=${dificultate}` : "";

  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <h1 className="text-2xl font-semibold">Grile</h1>

      <nav className="mt-4 flex gap-2 text-sm">
        {DIFICULTATI.map((d) => (
          <Link
            key={d.valoare}
            href={d.valoare ? `/grile?dificultate=${d.valoare}` : "/grile"}
            className={`rounded-full border px-3 py-1 ${d.valoare === dificultate ? "bg-slate-900 text-white" : ""}`}
          >
            {d.eticheta}
          </Link>
        ))}
      </nav>
      <p className="mt-2 text-sm text-slate-500">
        Filtrul „doar greșite” și modul mixt vin odată cu salvarea progresului.
      </p>

      {VARIANTE.map((v) => (
        <section key={v.id} className="mt-6">
          <h2 className="font-semibold">
            Varianta {v.numar}. {v.titlu}
          </h2>
          <ul className="mt-2 divide-y">
            {v.capitole.map((c) => {
              const n = itemiAutocorectabili(c.id).filter(
                (i) => !dificultate || String(i.difficulty) === dificultate,
              ).length;
              return (
                <li key={c.id} className="flex items-center justify-between py-2">
                  {n > 0 ? (
                    <Link href={`/grile/${c.slug}${sufix}`} className="underline">
                      {c.titlu}
                    </Link>
                  ) : (
                    <span className="text-slate-400">{c.titlu}</span>
                  )}
                  <span className="text-sm text-slate-500">{n > 0 ? `${n} itemi` : "în pregătire"}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
