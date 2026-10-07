import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import Icon from "@/components/Icon";

export default function Recapitulare() {
  return (
    <main className="mx-auto max-w-2xl px-4 pt-6">
      <AntetPagina
        inapoi={{ href: "/azi", text: "Azi" }}
        titlu="Recapitulare"
        subtitlu="Ce ai greșit revine aici la intervale tot mai mari: 1, 3, 7, 14 zile."
      />
      <section className="card p-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success-soft text-success">
          <Icon nume="bifa" className="h-7 w-7" grosime={2.4} />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold">Nimic de repetat azi</h2>
        <p className="mt-2 text-muted">Coada se umple pe măsură ce rezolvi grile. Întrebările greșite apar aici mâine.</p>
        <Link href="/grile" className="btn-primary mt-5">
          Mergi la grile
        </Link>
      </section>
    </main>
  );
}
