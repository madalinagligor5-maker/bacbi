import Link from "next/link";
import Icon, { type NumeIcon } from "@/components/Icon";
import Planuri from "@/components/Planuri";
import { CONFUZII, ITEMI, type ItemGrila } from "@/lib/continut";
import { VARIANTE } from "@/lib/curriculum";
import glosar from "../../../continut/out/glosar.json";

const PASI: { icon: NumeIcon; titlu: string; text: string }[] = [
  { icon: "tinta", titlu: "Spui unde ești", text: "Varianta, data examenului și cât timp ai pe zi. Un test scurt îți arată nivelul." },
  { icon: "azi", titlu: "Primești planul de azi", text: "10–20 de minute: o temă nouă, grile și ce ai greșit zilele trecute." },
  { icon: "simulare", titlu: "Te testezi ca la bac", text: "Simulări cronometrate, 3 ore, cu notă estimată și analiză pe capitole." },
];

const INTREBARI = [
  {
    q: "Pe ce programă se bazează?",
    a: "Pe programa de Bacalaureat la biologie și pe formatul subiectelor din 2025 și al simulării din 2026: Subiectele I, II și III, cu aceleași tipuri de itemi.",
  },
  {
    q: "Am nevoie de profesor?",
    a: "Nu. Explicațiile, planul zilnic și corectarea sunt în aplicație. Fiecare răspuns greșit vine cu explicația și confuzia tipică din spatele lui.",
  },
  {
    q: "Cât timp pe zi?",
    a: "Alegi 10, 20 sau 30 de minute. Aplicația împarte materia până la examen și pune pe primul loc punctele tale slabe.",
  },
  {
    q: "Funcționează pe telefon?",
    a: "Da, e gândită întâi pentru telefon. Aplicația de mobil vine după versiunea web.",
  },
];

export default function Landing() {
  const exemplu = ITEMI.find((i) => i.id === "A01-GRI01") as ItemGrila;
  const capitoleA = VARIANTE[0].capitole.length;
  const statistici = [
    { valoare: String(ITEMI.length), eticheta: "itemi în format de bac" },
    { valoare: String(capitoleA), eticheta: "capitole pentru IX–X" },
    { valoare: String(glosar.length), eticheta: "termeni în glosar" },
    { valoare: String(Object.keys(CONFUZII).length), eticheta: "confuzii tipice explicate" },
  ];

  return (
    <main>
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-4 pb-16 pt-8 md:grid-cols-[1.1fr_1fr] md:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
            <Icon nume="frunza" className="h-4 w-4" /> Bac biologie 2027
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Bacul la bio, în <span className="text-primary">20 de minute</span> pe zi.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Plan zilnic, grile cu explicații și simulări cronometrate. Aplicația ține minte ce ai greșit și ți-l aduce
            înapoi exact când e nevoie.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/inregistrare" className="btn-primary px-7 text-lg">
              Începe gratuit <Icon nume="sageata" />
            </Link>
            <Link href="/grile/a01" className="btn-secondary px-7 text-lg">
              Încearcă o grilă
            </Link>
          </div>
        </div>

        {exemplu && (
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rotate-2 rounded-[2rem] bg-primary-soft" aria-hidden="true" />
            <div className="card rounded-3xl p-5 shadow-xl shadow-black/5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Celula · Subiectul I.C</p>
                <span className="flex items-center gap-1 text-sm font-semibold text-accent">
                  <Icon nume="flacara" className="h-4 w-4" /> 12
                </span>
              </div>
              <p className="mt-3 font-display text-xl font-bold leading-snug">{exemplu.q}</p>
              <ul className="mt-4 space-y-2">
                {exemplu.options.map((o, i) => {
                  const corecta = i === exemplu.correct;
                  return (
                    <li
                      key={o}
                      className={`flex items-center gap-3 rounded-xl border-2 p-2.5 text-sm font-medium ${
                        corecta ? "border-success bg-success-soft" : "border-line"
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-bold ${
                          corecta ? "bg-success text-white" : "bg-surface-2 text-muted"
                        }`}
                      >
                        {corecta ? <Icon nume="bifa" className="h-4 w-4" grosime={2.5} /> : "ABCD"[i]}
                      </span>
                      {o}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 rounded-xl bg-surface-2 p-3 text-sm text-muted">{exemplu.explanation}</p>
            </div>
          </div>
        )}
      </section>

      <section className="border-y border-line bg-surface">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {statistici.map((s) => (
            <div key={s.eticheta}>
              <dt className="sr-only">{s.eticheta}</dt>
              <dd className="font-display text-4xl font-bold text-primary">{s.valoare}</dd>
              <dd className="text-sm text-muted">{s.eticheta}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <p className="eyebrow">Cum funcționează</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Trei pași, apoi doar deschizi aplicația seara.</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {PASI.map((p, i) => (
            <li key={p.titlu} className="card p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Icon nume={p.icon} className="h-6 w-6" />
                </span>
                <span className="font-display text-4xl font-bold text-line">{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{p.titlu}</h3>
              <p className="mt-2 text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <p className="eyebrow">Prețuri</p>
        <h2 className="mb-10 mt-2 font-display text-3xl font-bold tracking-tight">Începi gratuit.</h2>
        <Planuri />
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight">Întrebări frecvente</h2>
        <div className="space-y-3">
          {INTREBARI.map((q) => (
            <details key={q.q} className="card group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {q.q}
                <span className="text-2xl leading-none text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted">{q.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-ink">
          <h2 className="font-display text-3xl font-bold tracking-tight">Începe azi. Durează 20 de minute.</h2>
          <Link href="/inregistrare" className="btn mt-6 bg-white px-7 text-lg text-[#1f6b4f] hover:bg-white/90">
            Începe gratuit
          </Link>
        </div>
      </section>
    </main>
  );
}
