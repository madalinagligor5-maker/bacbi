import Image from "next/image";
import Icon, { type NumeIcon } from "./Icon";
import type { Bloc, Imagine, Inline } from "@/lib/lectii";

function Text({ continut }: { continut: Inline[] }) {
  return (
    <>
      {continut.map((c, i) => {
        if (c.bold && c.italic) return <strong key={i}><em>{c.text}</em></strong>;
        if (c.bold) return <strong key={i} className="font-semibold text-ink">{c.text}</strong>;
        if (c.italic) return <em key={i}>{c.text}</em>;
        return <span key={i}>{c.text}</span>;
      })}
    </>
  );
}

const CASETE: Record<"retine" | "atentie" | "bac", { titlu: string; icon: NumeIcon; stil: string; culoare: string }> = {
  retine: { titlu: "Reține", icon: "bec", stil: "bg-primary-soft", culoare: "text-primary" },
  atentie: { titlu: "Atenție, capcană", icon: "tinta", stil: "bg-danger-soft", culoare: "text-danger" },
  bac: { titlu: "La bac", icon: "stea", stil: "bg-accent-soft", culoare: "text-accent" },
};

export function Figura({ imagine }: { imagine: Imagine }) {
  return (
    <figure className="card overflow-hidden">
      <div className="bg-white p-3">
        <Image
          src={`/lectii/${imagine.fisier}`}
          alt={imagine.alt}
          width={imagine.latime}
          height={imagine.inaltime}
          className="mx-auto h-auto max-h-[520px] w-auto max-w-full"
          sizes="(max-width: 672px) 100vw, 640px"
          unoptimized={imagine.fisier.endsWith(".svg")}
        />
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm">
        <span className="text-ink">{imagine.legenda}</span>
        <span className="mt-1 block text-xs text-muted">
          {imagine.autor ? `${imagine.autor}, ` : ""}
          {imagine.licentaUrl ? (
            <a href={imagine.licentaUrl} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              {imagine.licenta}
            </a>
          ) : (
            imagine.licenta
          )}
          {", "}
          <a href={imagine.sursa} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            Wikimedia Commons
          </a>
          {imagine.modificari ? `. ${imagine.modificari}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}

function BlocLectie({ bloc }: { bloc: Bloc }) {
  switch (bloc.tip) {
    case "h2":
      return (
        <h2 id={bloc.ancora} className="scroll-mt-20 pt-4 font-display text-2xl font-bold tracking-tight">
          {bloc.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 font-display text-lg font-bold">{bloc.text}</h3>;
    case "p":
      return (
        <p className="leading-relaxed text-ink">
          <Text continut={bloc.continut} />
        </p>
      );
    case "lista": {
      const Tag = bloc.ordonata ? "ol" : "ul";
      return (
        <Tag className={`space-y-2 leading-relaxed ${bloc.ordonata ? "list-decimal pl-6" : ""}`}>
          {bloc.elemente.map((e, i) => (
            <li
              key={i}
              className={
                bloc.ordonata
                  ? "pl-1"
                  : `relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full ${
                      e.nivel ? "ml-5 before:bg-line" : "before:bg-primary"
                    }`
              }
            >
              <Text continut={e.continut} />
            </li>
          ))}
        </Tag>
      );
    }
    case "tabel":
      return (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[440px] text-left text-sm">
            <thead className="bg-surface-2">
              <tr>
                {bloc.cap.map((c, i) => (
                  <th key={i} className="p-3 font-semibold">
                    <Text continut={c} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {bloc.randuri.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className={`p-3 align-top ${j === 0 ? "font-medium" : "text-muted"}`}>
                      <Text continut={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "imagine":
      return <Figura imagine={bloc.imagine} />;
    case "caseta": {
      const c = CASETE[bloc.fel];
      return (
        <aside className={`rounded-2xl p-4 ${c.stil}`}>
          <p className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${c.culoare}`}>
            <Icon nume={c.icon} className="h-4 w-4" /> {c.titlu}
          </p>
          <div className="space-y-2 text-[15px]">
            {bloc.blocuri.map((b, i) => (
              <BlocLectie key={i} bloc={b} />
            ))}
          </div>
        </aside>
      );
    }
  }
}

export default function Lectie({ blocuri }: { blocuri: Bloc[] }) {
  return (
    <div className="space-y-5">
      {blocuri.map((b, i) => (
        <BlocLectie key={i} bloc={b} />
      ))}
    </div>
  );
}

export function Cuprins({ blocuri }: { blocuri: Bloc[] }) {
  const titluri = blocuri.filter((b): b is Extract<Bloc, { tip: "h2" }> => b.tip === "h2");
  if (titluri.length < 2) return null;
  return (
    <nav aria-label="Cuprinsul lecției" className="card p-4">
      <p className="eyebrow mb-2">În lecția asta</p>
      <ol className="space-y-1 text-sm">
        {titluri.map((t, i) => (
          <li key={t.ancora}>
            <a href={`#${t.ancora}`} className="flex gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-2">
              <span className="w-4 shrink-0 text-right font-semibold text-muted">{i + 1}</span>
              <span>{t.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
