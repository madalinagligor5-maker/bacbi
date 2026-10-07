import Link from "next/link";
import Icon from "./Icon";

// Antetul paginilor din zona elevului: titlu mare, subtitlu opțional, link de întoarcere.
export default function AntetPagina({
  titlu,
  subtitlu,
  eticheta,
  inapoi,
  dreapta,
}: {
  titlu: string;
  subtitlu?: string;
  eticheta?: string;
  inapoi?: { href: string; text: string };
  dreapta?: React.ReactNode;
}) {
  return (
    <header className="mb-6">
      {inapoi && (
        <Link
          href={inapoi.href}
          className="mb-3 inline-flex min-h-[36px] items-center gap-1 text-sm font-medium text-muted hover:text-ink"
        >
          <Icon nume="inapoi" className="h-4 w-4" />
          {inapoi.text}
        </Link>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          {eticheta && <p className="eyebrow mb-1">{eticheta}</p>}
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight">{titlu}</h1>
          {subtitlu && <p className="mt-2 text-muted">{subtitlu}</p>}
        </div>
        {dreapta}
      </div>
    </header>
  );
}
