import Pagina from "@/components/Pagina";
import { EXAMEN, STRUCTURA_PROBA } from "@/lib/examen";

export default function Simulare() {
  return (
    <Pagina
      titlu="Simulare"
      continut={[
        "Lista simulărilor pe variantă",
        `Reguli: ${EXAMEN.durataMinute / 60} ore, ${EXAMEN.punctajMaxim} de puncte, ${EXAMEN.puncteDinOficiu} din oficiu, promovare de la ${EXAMEN.notaPromovare}`,
        "Reia o simulare începută",
      ]}
    >
      <h2 className="font-semibold">Structura probei</h2>
      {STRUCTURA_PROBA.map((s) => (
        <section key={s.subiect} className="mt-3">
          <h3 className="font-medium">
            Subiectul {s.subiect} · {s.puncte} p
          </h3>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-600">
            {s.cerinte.map((c) => (
              <li key={c.cod}>
                {c.cod}. {c.ce} ({c.puncte} p)
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Pagina>
  );
}
