import AntetPagina from "@/components/AntetPagina";
import BaraProgres from "@/components/BaraProgres";
import { STRUCTURA_PROBA } from "@/lib/examen";

export default function Rezultat() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 pt-6">
      <AntetPagina inapoi={{ href: "/simulare", text: "Simulări" }} titlu="Rezultat" subtitlu="Nota estimată, analiza pe subiecte și revizuirea item cu item." />
      <div className="rounded-3xl bg-primary p-6 text-center text-primary-ink">
        <p className="text-sm font-semibold opacity-80">Nota estimată</p>
        <p className="font-display text-6xl font-bold">–</p>
        <p className="text-sm opacity-80">apare după prima simulare</p>
      </div>
      <div className="card space-y-4 p-5">
        {STRUCTURA_PROBA.map((s) => (
          <div key={s.subiect}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-semibold">Subiectul {s.subiect}</span>
              <span className="text-muted">– / {s.puncte} p</span>
            </div>
            <BaraProgres valoare={0} total={s.puncte} />
          </div>
        ))}
      </div>
    </main>
  );
}
