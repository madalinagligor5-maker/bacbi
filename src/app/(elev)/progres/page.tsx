import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import BaraProgres from "@/components/BaraProgres";
import Icon from "@/components/Icon";
import { VARIANTE } from "@/lib/curriculum";

export default function Progres() {
  const capitole = VARIANTE[0].capitole;
  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 pt-8">
      <AntetPagina titlu="Progres" subtitlu="Nota în timp, cât stăpânești fiecare capitol și ce merită repetat." />

      <section className="card p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Icon nume="progres" className="h-7 w-7" />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold">Graficul pornește de la prima sesiune</h2>
        <p className="mt-2 text-muted">Fiecare grilă rezolvată adaugă un punct. După o săptămână vezi tendința.</p>
        <Link href="/azi" className="btn-primary mt-5">
          Fă planul de azi
        </Link>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl font-bold">Stăpânire pe capitole</h2>
        <ul className="card divide-y divide-line">
          {capitole.map((c) => (
            <li key={c.id} className="flex items-center gap-4 p-4">
              <span className="w-10 shrink-0 font-display text-sm font-bold text-muted">{c.id}</span>
              <span className="min-w-0 flex-1">
                <span className="mb-2 block truncate text-sm font-medium">{c.titlu}</span>
                <BaraProgres valoare={0} total={100} eticheta={`Stăpânire ${c.titlu}`} />
              </span>
              <span className="w-10 shrink-0 text-right text-sm tabular-nums text-muted">0%</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
