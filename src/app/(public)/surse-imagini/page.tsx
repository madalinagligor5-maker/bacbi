import Image from "next/image";
import { toateImaginile } from "@/lib/lectii";

export const metadata = { title: "Surse imagini · BacBio" };

export default function SurseImagini() {
  const imagini = toateImaginile();
  return (
    <main className="mx-auto max-w-3xl px-4 pt-10">
      <p className="eyebrow">Atribuiri</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Surse imagini</h1>
      <p className="mt-4 text-muted">
        Imaginile din lecții provin de pe Wikimedia Commons și sunt în domeniul public sau sub licențe Creative Commons
        care permit refolosirea. Unde etichetele au fost traduse în română, adaptarea e publicată sub aceeași licență.
      </p>
      <ul className="mt-8 divide-y divide-line">
        {imagini.map((i) => (
          <li key={i.slug} className="flex gap-4 py-4">
            <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
              <Image
                src={`/lectii/${i.fisier}`}
                alt=""
                width={80}
                height={64}
                className="h-full w-full object-contain"
                unoptimized={i.fisier.endsWith(".svg")}
              />
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-medium">{i.alt}</p>
              <p className="mt-1 text-muted">
                {i.autor || "Autor necunoscut"} ·{" "}
                {i.licentaUrl ? (
                  <a href={i.licentaUrl} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                    {i.licenta}
                  </a>
                ) : (
                  i.licenta
                )}{" "}
                ·{" "}
                <a href={i.sursa} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                  pagina pe Wikimedia Commons
                </a>
              </p>
              {i.modificari && <p className="mt-1 text-muted">{i.modificari}.</p>}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
