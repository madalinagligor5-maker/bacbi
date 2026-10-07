import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import ComutatorVarianta from "@/components/ComutatorVarianta";
import Icon from "@/components/Icon";
import { VARIANTE, capitolePeClase, getVarianta } from "@/lib/curriculum";
import { itemiCapitol } from "@/lib/continut";

export default function Invata({ searchParams }: { searchParams: { varianta?: string } }) {
  const varianta = getVarianta(searchParams.varianta ?? "") ?? VARIANTE[0];

  return (
    <main className="mx-auto max-w-2xl px-4 pt-8">
      <AntetPagina titlu="Învață" subtitlu="Capitolele din programă, pe clase. Fiecare temă se verifică prin întrebări." />
      <ComutatorVarianta activa={varianta} baza="/invata" />

      {!varianta.capitole.some((c) => c.areContinut) && (
        <p className="mb-6 rounded-2xl bg-warn-soft p-4 text-sm text-warn">{varianta.stare}</p>
      )}

      {capitolePeClase(varianta).map(([clasa, capitole]) => (
        <section key={clasa} className="mb-8">
          <h2 className="eyebrow mb-3">Clasa a {clasa}-a · {capitole.length} capitole</h2>
          <ul className="card divide-y divide-line overflow-hidden">
            {capitole.map((c) => {
              const n = itemiCapitol(c.id).length;
              return (
                <li key={c.id}>
                  <Link
                    href={`/invata/${varianta.id}/${c.slug}`}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-surface-2"
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-bold ${
                        c.areContinut ? "bg-primary-soft text-primary" : "bg-surface-2 text-muted"
                      }`}
                    >
                      {c.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold leading-snug">{c.titlu}</span>
                      <span className="block text-sm text-muted">
                        {c.teme.length} teme{n > 0 ? ` · ${n} itemi` : " · în pregătire"}
                      </span>
                    </span>
                    <Icon nume="sageata" className="h-5 w-5 shrink-0 text-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
