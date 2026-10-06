import Link from "next/link";
import { notFound } from "next/navigation";
import { VARIANTE, getCapitol, getCapitolDupaId } from "@/lib/curriculum";
import {
  NUME_TIP,
  fiseCapitol,
  glosarCapitol,
  numarPeTip,
  tabeleCapitol,
} from "@/lib/continut";

export function generateStaticParams() {
  return VARIANTE.flatMap((v) => v.capitole.map((c) => ({ varianta: v.id, capitol: c.slug })));
}

export default function Capitol({ params }: { params: { varianta: string; capitol: string } }) {
  const capitol = getCapitol(params.varianta, params.capitol);
  if (!capitol) notFound();

  const glosar = glosarCapitol(capitol.id);
  const fise = fiseCapitol(capitol.id);
  const tabele = tabeleCapitol(capitol.id);
  const itemi = numarPeTip(capitol.id);

  return (
    <main className="mx-auto max-w-xl space-y-8 px-4 py-6">
      <header>
        <p className="text-sm text-slate-500">
          {capitol.id} · clasa a {capitol.clasa}-a
        </p>
        <h1 className="text-2xl font-semibold">{capitol.titlu}</h1>
        {capitol.sloturiBac.length > 0 && (
          <p className="mt-1 text-sm text-slate-500">
            Apare la bac la: {capitol.sloturiBac.join(", ")}
          </p>
        )}
        {capitol.prerechizite.length > 0 && (
          <p className="mt-1 text-sm text-slate-500">
            Înainte, recapitulează:{" "}
            {capitol.prerechizite.map((id, i) => {
              const p = getCapitolDupaId(id);
              return (
                <span key={id}>
                  {i > 0 && ", "}
                  {p ? (
                    <Link href={`/invata/${p.varianta}/${p.slug}`} className="underline">
                      {p.titlu}
                    </Link>
                  ) : (
                    id
                  )}
                </span>
              );
            })}
          </p>
        )}
      </header>

      {!capitol.areContinut && (
        <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
          Conținut în pregătire: capitolul e doar pe hartă și trebuie confirmat cu programa în vigoare.
        </p>
      )}

      <section>
        <h2 className="font-semibold">Teme</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {capitol.teme.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-slate-500">
          Fiecare temă: marcaj „am înțeles” / „repetă mai târziu”.
        </p>
      </section>

      {fise.length > 0 && (
        <section>
          <h2 className="font-semibold">Întrebări de verificare</h2>
          <ul className="mt-2 space-y-2">
            {fise.map((f) => (
              <li key={f.id}>
                <details className="rounded-lg border p-3">
                  <summary className="cursor-pointer">{f.front}</summary>
                  <p className="mt-2 text-slate-600">{f.back}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tabele.map((t) => (
        <section key={t.title}>
          <h2 className="font-semibold">{t.title}</h2>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  {t.cols.map((c) => (
                    <th key={c} className="border-b p-2">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((cel, i) => (
                      <td key={i} className="border-b p-2 align-top">
                        {cel}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {glosar.length > 0 && (
        <section>
          <h2 className="font-semibold">Glosar</h2>
          <dl className="mt-2 space-y-2 text-sm">
            {glosar.map((g) => (
              <div key={g.term}>
                <dt className="font-medium">{g.term}</dt>
                <dd className="text-slate-600">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {itemi.length > 0 && (
        <section>
          <h2 className="font-semibold">Itemi în bancă</h2>
          <p className="mt-1 text-sm text-slate-600">
            {itemi.map(([tip, n]) => `${NUME_TIP[tip] ?? tip}: ${n}`).join(" · ")}
          </p>
          <Link
            href={`/grile/${capitol.slug}`}
            className="mt-3 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Fă grile pe acest capitol
          </Link>
        </section>
      )}
    </main>
  );
}
