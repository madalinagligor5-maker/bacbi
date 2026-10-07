import AntetPagina from "./AntetPagina";
import Icon from "./Icon";

// Pagină pentru secțiunile care încă nu au funcționalitate: arată ce va conține.
export default function Pagina({
  titlu,
  subtitlu,
  continut,
  children,
}: {
  titlu: string;
  subtitlu?: string;
  continut: string[];
  children?: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 pb-10 pt-8">
      <AntetPagina titlu={titlu} subtitlu={subtitlu} />
      {children}
      <section className="card mt-6 p-5">
        <p className="eyebrow">În curând aici</p>
        <ul className="mt-3 space-y-2">
          {continut.map((c) => (
            <li key={c} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                <Icon nume="bifa" className="h-3 w-3" grosime={2.5} />
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
