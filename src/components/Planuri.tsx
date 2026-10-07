import Link from "next/link";
import Icon from "./Icon";

// Planurile sunt propunerea de pornire din documentul de structură; prețurile se stabilesc.
const PLANURI = [
  {
    nume: "Gratuit",
    pret: "0 lei",
    detaliu: "pentru totdeauna",
    beneficii: ["1–2 capitole cu grile", "1 simulare de probă", "Plan zilnic și countdown", "Progres pe scurt"],
    cta: "Începe gratuit",
    evidentiat: false,
  },
  {
    nume: "Lunar",
    pret: "în curând",
    detaliu: "abonament, se anulează oricând",
    beneficii: ["Toate capitolele", "Toate simulările", "Repetiție spațiată pe tot", "Progres detaliat"],
    cta: "Alege Lunar",
    evidentiat: false,
  },
  {
    nume: "Până la Bac",
    pret: "în curând",
    detaliu: "plată unică, până după examen",
    beneficii: ["Tot ce e în Lunar", "Un singur cost, fără reînnoiri", "Ideal din toamna clasei a XII-a"],
    cta: "Alege Până la Bac",
    evidentiat: true,
  },
];

export default function Planuri() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PLANURI.map((p) => (
        <div
          key={p.nume}
          className={`relative flex flex-col rounded-3xl border-2 p-6 ${
            p.evidentiat ? "border-primary bg-surface" : "border-line bg-surface"
          }`}
        >
          {p.evidentiat && (
            <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
              Recomandat
            </span>
          )}
          <h3 className="font-display text-xl font-bold">{p.nume}</h3>
          <p className="mt-3 font-display text-3xl font-bold">{p.pret}</p>
          <p className="text-sm text-muted">{p.detaliu}</p>
          <ul className="mt-5 flex-1 space-y-2 text-sm">
            {p.beneficii.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Icon nume="bifa" className="mt-0.5 h-4 w-4 shrink-0 text-primary" grosime={2.5} />
                {b}
              </li>
            ))}
          </ul>
          <Link href="/inregistrare" className={`mt-6 ${p.evidentiat ? "btn-primary" : "btn-secondary"}`}>
            {p.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
