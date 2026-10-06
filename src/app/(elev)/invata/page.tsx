import Link from "next/link";
import Pagina from "@/components/Pagina";
import { VARIANTE, capitolePeClase } from "@/lib/curriculum";

export default function Invata() {
  return (
    <Pagina titlu="Învață" continut={["Alegere variantă → capitole pe clase → temele unui capitol"]}>
      {VARIANTE.map((v) => (
        <section key={v.id} className="mb-6">
          <h2 className="font-semibold">
            Varianta {v.numar}. {v.titlu}
          </h2>
          <p className="text-sm text-slate-500">{v.stare}</p>
          {capitolePeClase(v).map(([clasa, capitole]) => (
            <div key={clasa} className="mt-2">
              <h3 className="text-sm text-slate-500">Clasa a {clasa}-a</h3>
              <ul className="list-disc pl-5">
                {capitole.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/invata/${v.id}/${c.slug}`} className="underline">
                      {c.titlu}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </Pagina>
  );
}
