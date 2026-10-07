import Link from "next/link";
import AntetPagina from "@/components/AntetPagina";
import Icon, { type NumeIcon } from "@/components/Icon";

const RANDURI: { icon: NumeIcon; titlu: string; detaliu: string; href?: string }[] = [
  { icon: "utilizator", titlu: "Profil", detaliu: "Varianta, data examenului, minute pe zi", href: "/onboarding" },
  { icon: "stea", titlu: "Abonament", detaliu: "Gratuit", href: "/pret" },
  { icon: "azi", titlu: "Notificări", detaliu: "Memento seara, la ora aleasă" },
  { icon: "lacat", titlu: "Datele mele (GDPR)", detaliu: "Export sau ștergere cont" },
];

export default function Cont() {
  return (
    <main className="mx-auto max-w-2xl px-4 pt-8">
      <AntetPagina titlu="Cont" />
      <ul className="card divide-y divide-line overflow-hidden">
        {RANDURI.map((r) => {
          const continut = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-muted">
                <Icon nume={r.icon} />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">{r.titlu}</span>
                <span className="block text-sm text-muted">{r.detaliu}</span>
              </span>
              {r.href && <Icon nume="sageata" className="h-5 w-5 text-muted" />}
            </>
          );
          return (
            <li key={r.titlu}>
              {r.href ? (
                <Link href={r.href} className="flex items-center gap-4 p-4 hover:bg-surface-2">
                  {continut}
                </Link>
              ) : (
                <div className="flex items-center gap-4 p-4">{continut}</div>
              )}
            </li>
          );
        })}
      </ul>
      <Link href="/" className="btn-secondary mt-6 w-full">
        Ieși din cont
      </Link>
    </main>
  );
}
