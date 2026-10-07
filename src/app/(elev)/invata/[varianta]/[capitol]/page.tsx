import Link from "next/link";
import { notFound } from "next/navigation";
import AntetPagina from "@/components/AntetPagina";
import Icon from "@/components/Icon";
import { VARIANTE, getCapitol, getCapitolDupaId } from "@/lib/curriculum";
import { NUME_TIP, fiseCapitol, glosarCapitol, numarPeTip, tabeleCapitol } from "@/lib/continut";

export function generateStaticParams() {
  return VARIANTE.flatMap((v) => v.capitole.map((c) => ({ varianta: v.id, capitol: c.slug })));
}

function Sectiune({ titlu, children }: { titlu: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-bold">{titlu}</h2>
      {children}
    </section>
  );
}

export default function Capitol({ params }: { params: { varianta: string; capitol: string } }) {
  const capitol = getCapitol(params.varianta, params.capitol);
  if (!capitol) notFound();

  const glosar = glosarCapitol(capitol.id);
  const fise = fiseCapitol(capitol.id);
  const tabele = tabeleCapitol(capitol.id);
  const itemi = numarPeTip(capitol.id);
  const totalItemi = itemi.reduce((s, [, n]) => s + n, 0);

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 pt-6">
      <div>
        <AntetPagina
          inapoi={{ href: `/invata?varianta=${params.varianta}`, text: "Capitole" }}
          eticheta={`${capitol.id} · clasa a ${capitol.clasa}-a`}
          titlu={capitol.titlu}
        />
        {(capitol.sloturiBac.length > 0 || capitol.ideiMari.length > 0) && (
          <div className="-mt-2 flex flex-wrap gap-2">
            {capitol.sloturiBac.map((s) => (
              <span key={s} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                Bac {s}
              </span>
            ))}
            {capitol.ideiMari.map((s) => (
              <span key={s} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                {s}
              </span>
            ))}
          </div>
        )}
        {capitol.prerechizite.length > 0 && (
          <p className="mt-4 text-sm text-muted">
            Înainte, recapitulează:{" "}
            {capitol.prerechizite.map((id, i) => {
              const p = getCapitolDupaId(id);
              return (
                <span key={id}>
                  {i > 0 && ", "}
                  {p ? (
                    <Link href={`/invata/${p.varianta}/${p.slug}`} className="font-medium text-primary underline-offset-2 hover:underline">
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
      </div>

      {!capitol.areContinut && (
        <p className="rounded-2xl bg-warn-soft p-4 text-sm text-warn">
          Conținut în pregătire: capitolul e doar pe hartă și trebuie confirmat cu programa în vigoare.
        </p>
      )}

      {totalItemi > 0 && (
        <Link href={`/grile/${capitol.slug}`} className="flex items-center gap-4 rounded-2xl bg-primary p-5 text-primary-ink hover:bg-primary-hover">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15">
            <Icon nume="grile" className="h-6 w-6" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-lg font-bold">Verifică-te cu grile</span>
            <span className="block text-sm opacity-85">
              {itemi.map(([tip, n]) => `${n} ${NUME_TIP[tip]?.toLowerCase() ?? tip}`).slice(0, 2).join(" · ")}
            </span>
          </span>
          <Icon nume="sageata" className="h-5 w-5" />
        </Link>
      )}

      <Sectiune titlu="Teme">
        <ul className="card divide-y divide-line">
          {capitol.teme.map((t, i) => (
            <li key={t} className="flex items-start gap-3 p-4">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-2 text-xs font-bold text-muted">
                {i + 1}
              </span>
              <span className="flex-1">{t}</span>
            </li>
          ))}
        </ul>
      </Sectiune>

      {fise.length > 0 && (
        <Sectiune titlu="Întrebări de verificare">
          <p className="-mt-1 mb-3 text-sm text-muted">Răspunde în gând, apoi deschide cardul.</p>
          <ul className="space-y-2">
            {fise.map((f) => (
              <li key={f.id}>
                <details className="card group p-4 open:border-primary">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-medium">
                    {f.front}
                    <span className="mt-0.5 shrink-0 text-xs font-semibold text-primary group-open:hidden">Arată</span>
                  </summary>
                  <p className="mt-3 border-t border-line pt-3 text-muted">{f.back}</p>
                </details>
              </li>
            ))}
          </ul>
        </Sectiune>
      )}

      {tabele.map((t) => (
        <Sectiune key={t.title} titlu={t.title}>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-surface-2">
                <tr>
                  {t.cols.map((c) => (
                    <th key={c} className="p-3 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {t.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((cel, i) => (
                      <td key={i} className={`p-3 align-top ${i === 0 ? "font-medium" : "text-muted"}`}>
                        {cel}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Sectiune>
      ))}

      {glosar.length > 0 && (
        <Sectiune titlu="Glosar">
          <dl className="card divide-y divide-line">
            {glosar.map((g) => (
              <div key={g.term} className="p-4">
                <dt className="font-semibold">{g.term}</dt>
                <dd className="mt-1 text-sm text-muted">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </Sectiune>
      )}
    </main>
  );
}
