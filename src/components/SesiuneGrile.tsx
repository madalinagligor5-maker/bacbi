"use client";

import Link from "next/link";
import { useState } from "react";
import BaraProgres from "./BaraProgres";
import Icon from "./Icon";
import type { Confuzie, ItemAdevaratFals, ItemGrila } from "@/lib/continut";

type ItemSesiune = ItemGrila | ItemAdevaratFals;
type Siguranta = "sigur" | "nesigur" | "ghicit";

interface Raspuns {
  corect: boolean;
  siguranta: Siguranta;
}

const SIGURANTA: { valoare: Siguranta; eticheta: string }[] = [
  { valoare: "sigur", eticheta: "Sigur" },
  { valoare: "nesigur", eticheta: "Nu prea" },
  { valoare: "ghicit", eticheta: "Am ghicit" },
];

const LITERE = ["A", "B", "C", "D"];

function InelScor({ corecte, total }: { corecte: number; total: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const procent = total ? corecte / total : 0;
  return (
    <div className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - procent)}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-display text-4xl font-bold">{Math.round(procent * 100)}%</p>
          <p className="text-sm text-muted">
            {corecte} din {total}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SesiuneGrile({
  titlu,
  itemi,
  confuzii,
}: {
  titlu: string;
  itemi: ItemSesiune[];
  confuzii: Record<string, Confuzie>;
}) {
  const [index, setIndex] = useState(0);
  const [ales, setAles] = useState<number | boolean | null>(null);
  const [siguranta, setSiguranta] = useState<Siguranta | null>(null);
  const [raspunsuri, setRaspunsuri] = useState<Raspuns[]>([]);

  if (index >= itemi.length) {
    const corecte = raspunsuri.filter((r) => r.corect).length;
    const norocoase = raspunsuri.filter((r) => r.corect && r.siguranta !== "sigur").length;
    const periculoase = raspunsuri.filter((r) => !r.corect && r.siguranta === "sigur").length;
    return (
      <main className="mx-auto max-w-xl px-4 pt-10 text-center">
        <p className="eyebrow">{titlu}</p>
        <h1 className="mt-1 font-display text-3xl font-bold">Sesiune încheiată</h1>
        <div className="mt-8">
          <InelScor corecte={corecte} total={itemi.length} />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-2xl bg-warn-soft p-4">
            <p className="font-display text-2xl font-bold text-warn">{norocoase}</p>
            <p className="text-sm">corecte, dar fără siguranță: le repeți</p>
          </div>
          <div className="rounded-2xl bg-danger-soft p-4">
            <p className="font-display text-2xl font-bold text-danger">{periculoase}</p>
            <p className="text-sm">greșite deși erai sigur: le lămurești întâi</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => {
              setIndex(0);
              setRaspunsuri([]);
            }}
            className="btn-primary w-full"
          >
            <Icon nume="repeta" /> Reia sesiunea
          </button>
          <Link href="/grile" className="btn-secondary w-full">
            Alt capitol
          </Link>
        </div>
      </main>
    );
  }

  const item = itemi[index];
  const corect = ales !== null && (item.type === "grila" ? ales === item.correct : ales === item.truth);
  const dezvaluit = siguranta !== null;

  const codConfuzie =
    dezvaluit && !corect ? (item.type === "grila" ? item.wrong_why[String(ales)] : item.misconception) : null;
  const confuzie = codConfuzie ? confuzii[codConfuzie] : undefined;

  function confirma(s: Siguranta) {
    setSiguranta(s);
    setRaspunsuri((r) => [...r, { corect, siguranta: s }]);
  }

  function urmatorul() {
    setAles(null);
    setSiguranta(null);
    setIndex((i) => i + 1);
  }

  const optiuni: { valoare: number | boolean; text: string; eticheta: string; esteCorecta: boolean }[] =
    item.type === "grila"
      ? item.options.map((o, i) => ({ valoare: i, text: o, eticheta: LITERE[i], esteCorecta: i === item.correct }))
      : [
          { valoare: true, text: "Adevărat", eticheta: "A", esteCorecta: item.truth },
          { valoare: false, text: "Fals", eticheta: "F", esteCorecta: !item.truth },
        ];

  function stil(o: (typeof optiuni)[number]) {
    if (!dezvaluit) {
      return ales === o.valoare ? "border-primary bg-primary-soft" : "border-line bg-surface hover:border-primary";
    }
    if (o.esteCorecta) return "border-success bg-success-soft";
    if (ales === o.valoare) return "border-danger bg-danger-soft";
    return "border-line bg-surface opacity-50";
  }

  function stilLitera(o: (typeof optiuni)[number]) {
    if (dezvaluit && o.esteCorecta) return "bg-success text-white";
    if (dezvaluit && ales === o.valoare) return "bg-danger text-white";
    if (ales === o.valoare) return "bg-primary text-primary-ink";
    return "bg-surface-2 text-muted";
  }

  return (
    <main className="mx-auto max-w-xl px-4 pt-4">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/grile" aria-label="Închide sesiunea" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink">
          <Icon nume="x" />
        </Link>
        <BaraProgres valoare={index} total={itemi.length} eticheta="Progresul sesiunii" />
        <span className="shrink-0 text-sm font-semibold tabular-nums text-muted">
          {index + 1}/{itemi.length}
        </span>
      </div>

      <p className="eyebrow">
        {titlu} · Subiectul {item.bac_slot} · {item.type === "grila" ? "Alegere multiplă" : "Adevărat sau fals?"}
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold leading-snug">
        {item.type === "grila" ? item.q : item.statement}
      </h1>

      <ul className={`mt-6 ${item.type === "grila" ? "space-y-3" : "grid grid-cols-2 gap-3"}`}>
        {optiuni.map((o) => (
          <li key={String(o.valoare)}>
            <button
              onClick={() => ales === null && setAles(o.valoare)}
              disabled={dezvaluit}
              aria-pressed={ales === o.valoare}
              className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border-2 p-3 text-left font-medium transition-colors ${stil(o)}`}
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold ${stilLitera(o)}`}>
                {dezvaluit && o.esteCorecta ? (
                  <Icon nume="bifa" className="h-4 w-4" grosime={2.5} />
                ) : dezvaluit && ales === o.valoare ? (
                  <Icon nume="x" className="h-4 w-4" grosime={2.5} />
                ) : (
                  o.eticheta
                )}
              </span>
              <span>{o.text}</span>
            </button>
          </li>
        ))}
      </ul>

      {ales !== null && !dezvaluit && (
        <div className="card mt-6 p-4">
          <p className="font-semibold">Cât de sigur ești?</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {SIGURANTA.map((s) => (
              <button key={s.valoare} onClick={() => confirma(s.valoare)} className="chip justify-center">
                {s.eticheta}
              </button>
            ))}
          </div>
          <button onClick={() => setAles(null)} className="mt-3 text-sm font-medium text-muted hover:text-ink">
            Schimbă răspunsul
          </button>
        </div>
      )}

      {dezvaluit && (
        <div className="mt-6 space-y-3 pb-6">
          <div className={`rounded-2xl p-4 ${corect ? "bg-success-soft" : "bg-danger-soft"}`}>
            <p className={`flex items-center gap-2 font-display text-lg font-bold ${corect ? "text-success" : "text-danger"}`}>
              <Icon nume={corect ? "bifa" : "x"} grosime={2.5} />
              {corect ? "Corect" : "Nu de data asta"}
            </p>
            {item.type === "adevarat_fals" && !item.truth && item.correction && (
              <p className="mt-2">
                <span className="font-semibold">Corectarea, fără negație: </span>
                {item.correction}
              </p>
            )}
            {item.explanation && <p className="mt-2">{item.explanation}</p>}
          </div>
          {confuzie && (
            <div className="rounded-2xl bg-warn-soft p-4 text-sm">
              <p className="flex items-center gap-2 font-semibold text-warn">
                <Icon nume="bec" className="h-4 w-4" /> Confuzie frecventă: {confuzie.title}
              </p>
              <p className="mt-2">{confuzie.desc}</p>
              <p className="mt-2">
                <span className="font-semibold">Ce faci: </span>
                {confuzie.remedy}
              </p>
            </div>
          )}
          <button onClick={urmatorul} className="btn-primary w-full">
            {index + 1 < itemi.length ? "Următoarea" : "Vezi scorul"}
            <Icon nume="sageata" />
          </button>
        </div>
      )}
    </main>
  );
}
