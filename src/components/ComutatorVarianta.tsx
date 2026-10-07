import Link from "next/link";
import { VARIANTE, type Varianta } from "@/lib/curriculum";

// Comutator între cele două variante ale probei, păstrat în URL (?varianta=…).
export default function ComutatorVarianta({ activa, baza }: { activa: Varianta; baza: string }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1" role="tablist">
      {VARIANTE.map((v) => {
        const esteActiva = v.id === activa.id;
        return (
          <Link
            key={v.id}
            href={`${baza}?varianta=${v.id}`}
            role="tab"
            aria-selected={esteActiva}
            className={`rounded-xl px-3 py-2 text-center text-sm font-semibold transition-colors ${
              esteActiva ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            <span className="block text-xs font-medium opacity-70">Varianta {v.numar}</span>
            <span className="block leading-tight">{v.titlu}</span>
          </Link>
        );
      })}
    </div>
  );
}
