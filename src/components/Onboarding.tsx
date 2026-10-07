"use client";

import Link from "next/link";
import { useState } from "react";
import BaraProgres from "./BaraProgres";
import Icon from "./Icon";
import { MINUTE_PE_ZI } from "@/lib/examen";

interface VariantaOptiune {
  id: string;
  numar: string;
  titlu: string;
  stare: string;
}

const PASI = ["Varianta", "Data examenului", "Timp pe zi", "Test de nivel"];

export default function Onboarding({
  variante,
  dataImplicita,
}: {
  variante: VariantaOptiune[];
  dataImplicita: string;
}) {
  const [pas, setPas] = useState(0);
  const [varianta, setVarianta] = useState(variante[0].id);
  const [data, setData] = useState(dataImplicita);
  const [minute, setMinute] = useState<number>(20);

  return (
    <main className="mx-auto max-w-md px-4 pt-6">
      <div className="mb-8 flex items-center gap-3">
        <BaraProgres valoare={pas + 1} total={PASI.length} eticheta="Pasul onboarding-ului" />
        <span className="shrink-0 text-sm font-semibold text-muted">
          {pas + 1}/{PASI.length}
        </span>
      </div>

      {pas === 0 && (
        <section>
          <h1 className="font-display text-3xl font-bold tracking-tight">Ce variantă susții?</h1>
          <p className="mt-2 text-muted">Tot conținutul se grupează după ea. O poți schimba din cont.</p>
          <div className="mt-6 space-y-3">
            {variante.map((v) => (
              <button
                key={v.id}
                onClick={() => setVarianta(v.id)}
                aria-pressed={varianta === v.id}
                className={`w-full rounded-2xl border-2 bg-surface p-4 text-left transition-colors ${
                  varianta === v.id ? "border-primary" : "border-line hover:border-muted"
                }`}
              >
                <span className="eyebrow block">Varianta {v.numar}</span>
                <span className="mt-1 block font-display text-lg font-bold">{v.titlu}</span>
                <span className="mt-1 block text-sm text-muted">{v.stare}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {pas === 1 && (
        <section>
          <h1 className="font-display text-3xl font-bold tracking-tight">Când dai bacul?</h1>
          <p className="mt-2 text-muted">Planul împarte materia până atunci. Am pus data orientativă din iunie.</p>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="input mt-6 text-lg" />
        </section>
      )}

      {pas === 2 && (
        <section>
          <h1 className="font-display text-3xl font-bold tracking-tight">Cât timp ai pe zi?</h1>
          <p className="mt-2 text-muted">Constanța contează mai mult decât durata.</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {MINUTE_PE_ZI.map((m) => (
              <button
                key={m}
                onClick={() => setMinute(m)}
                aria-pressed={minute === m}
                className={`rounded-2xl border-2 bg-surface p-5 text-center transition-colors ${
                  minute === m ? "border-primary" : "border-line hover:border-muted"
                }`}
              >
                <span className="block font-display text-3xl font-bold">{m}</span>
                <span className="text-sm text-muted">minute</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {pas === 3 && (
        <section>
          <h1 className="font-display text-3xl font-bold tracking-tight">Un test rapid de nivel</h1>
          <p className="mt-2 text-muted">10 grile din capitole diferite, ca planul să înceapă cu punctele tale slabe.</p>
          <div className="card mt-6 space-y-3 p-5 text-sm">
            <p className="flex justify-between">
              <span className="text-muted">Varianta</span>
              <span className="font-semibold">{variante.find((v) => v.id === varianta)?.numar}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted">Data examenului</span>
              <span className="font-semibold">{new Date(data).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted">Pe zi</span>
              <span className="font-semibold">{minute} minute</span>
            </p>
          </div>
        </section>
      )}

      <div className="mt-8 flex gap-3">
        {pas > 0 && (
          <button onClick={() => setPas(pas - 1)} className="btn-secondary" aria-label="Înapoi">
            <Icon nume="inapoi" />
          </button>
        )}
        {pas < PASI.length - 1 ? (
          <button onClick={() => setPas(pas + 1)} className="btn-primary flex-1">
            Continuă <Icon nume="sageata" />
          </button>
        ) : (
          <Link href="/azi" className="btn-primary flex-1">
            Generează planul <Icon nume="sageata" />
          </Link>
        )}
      </div>
    </main>
  );
}
