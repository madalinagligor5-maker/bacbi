"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { salveazaRaspunsDiagnostic } from "@/app/diagnostic/actions";

type IntrebareDiagnostic = {
  id: string;
  capitol_id: string;
  enunt: string;
  optiuni_json: string[] | null;
};

export default function DiagnosticClient({ intrebari }: { intrebari: IntrebareDiagnostic[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sePending, startTransition] = useTransition();
  const [selectat, setSelectat] = useState<string | null>(null);

  const total = intrebari.length;
  const intrebareCurenta = intrebari[index];
  const progres = Math.round((index / total) * 100);

  function alege(optiune: string) {
    if (sePending || selectat) return;
    setSelectat(optiune);

    startTransition(async () => {
      await salveazaRaspunsDiagnostic(intrebareCurenta.id, optiune);

      if (index + 1 >= total) {
        router.push("/diagnostic/rezultat");
      } else {
        setIndex((i) => i + 1);
        setSelectat(null);
      }
    });
  }

  if (!intrebareCurenta) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <p className="text-slate-500">Se încarcă...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-6 py-10">
      <div className="w-full max-w-lg">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
          <span>
            Întrebarea {index + 1} din {total}
          </span>
          <span>{progres}%</span>
        </div>
        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progres}%` }}
          />
        </div>

        <h1 className="mb-6 text-xl font-bold leading-snug text-foreground">
          {intrebareCurenta.enunt}
        </h1>

        <div className="flex flex-col gap-3">
          {(intrebareCurenta.optiuni_json ?? []).map((optiune) => {
            const esteSelectata = selectat === optiune;
            return (
              <button
                key={optiune}
                type="button"
                disabled={sePending || selectat !== null}
                onClick={() => alege(optiune)}
                className={`rounded-xl border-2 px-5 py-3.5 text-left text-sm font-medium transition disabled:cursor-not-allowed ${
                  esteSelectata
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary/40"
                }`}
              >
                {optiune}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
