"use client";

import Link from "next/link";
import { useState } from "react";
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
      <main className="mx-auto max-w-xl px-4 py-6">
        <h1 className="text-2xl font-semibold">Scor: {corecte} din {itemi.length}</h1>
        <ul className="mt-4 space-y-1 text-slate-600">
          <li>Corecte, dar fără siguranță: {norocoase} (de repetat)</li>
          <li>Greșite, deși erai sigur: {periculoase} (confuzii de lămurit întâi)</li>
        </ul>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => {
              setIndex(0);
              setRaspunsuri([]);
            }}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Reia sesiunea
          </button>
          <Link href="/grile" className="px-4 py-2 underline">
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
    dezvaluit && !corect
      ? item.type === "grila"
        ? item.wrong_why[String(ales)]
        : item.misconception
      : null;
  const confuzie = codConfuzie ? confuzii[codConfuzie] : undefined;

  function alege(valoare: number | boolean) {
    if (ales === null) setAles(valoare);
  }

  function confirma(s: Siguranta) {
    setSiguranta(s);
    setRaspunsuri((r) => [...r, { corect, siguranta: s }]);
  }

  function urmatorul() {
    setAles(null);
    setSiguranta(null);
    setIndex((i) => i + 1);
  }

  function stilOptiune(valoare: number | boolean, esteCorecta: boolean) {
    if (!dezvaluit) return ales === valoare ? "border-slate-900 bg-slate-100" : "";
    if (esteCorecta) return "border-green-600 bg-green-50";
    if (ales === valoare) return "border-red-600 bg-red-50";
    return "opacity-60";
  }

  const optiuni: { valoare: number | boolean; text: string; esteCorecta: boolean }[] =
    item.type === "grila"
      ? item.options.map((o, i) => ({ valoare: i, text: o, esteCorecta: i === item.correct }))
      : [
          { valoare: true, text: "Adevărat", esteCorecta: item.truth },
          { valoare: false, text: "Fals", esteCorecta: !item.truth },
        ];

  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <p className="text-sm text-slate-500">
        {titlu} · {index + 1} din {itemi.length} · Subiectul {item.bac_slot}
      </p>
      <h1 className="mt-2 text-lg font-medium">
        {item.type === "grila" ? item.q : item.statement}
      </h1>

      <ul className="mt-4 space-y-2">
        {optiuni.map((o) => (
          <li key={String(o.valoare)}>
            <button
              onClick={() => alege(o.valoare)}
              disabled={ales !== null}
              className={`w-full rounded-lg border p-3 text-left ${stilOptiune(o.valoare, o.esteCorecta)}`}
            >
              {o.text}
            </button>
          </li>
        ))}
      </ul>

      {ales !== null && !dezvaluit && (
        <div className="mt-6">
          <p className="font-medium">Cât de sigur ești?</p>
          <div className="mt-2 flex gap-2">
            {SIGURANTA.map((s) => (
              <button
                key={s.valoare}
                onClick={() => confirma(s.valoare)}
                className="rounded-full border px-3 py-1"
              >
                {s.eticheta}
              </button>
            ))}
          </div>
        </div>
      )}

      {dezvaluit && (
        <div className="mt-6 space-y-3">
          <p className={`font-semibold ${corect ? "text-green-700" : "text-red-700"}`}>
            {corect ? "Corect" : "Greșit"}
          </p>
          {item.type === "adevarat_fals" && !item.truth && item.correction && (
            <p>
              <span className="font-medium">Corectarea, fără negație: </span>
              {item.correction}
            </p>
          )}
          {item.explanation && <p className="text-slate-700">{item.explanation}</p>}
          {confuzie && (
            <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
              <p className="font-medium">Confuzie frecventă: {confuzie.title}</p>
              <p className="mt-1">{confuzie.desc}</p>
              <p className="mt-1">Ce să faci: {confuzie.remedy}</p>
            </div>
          )}
          <button onClick={urmatorul} className="rounded-lg bg-slate-900 px-4 py-2 text-white">
            {index + 1 < itemi.length ? "Următoarea" : "Vezi scorul"}
          </button>
        </div>
      )}
    </main>
  );
}
