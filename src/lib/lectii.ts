// Lecțiile scrise în continut/lectii/<ID>.md, transformate în blocuri pentru afișare.
// Formatul e un subset de Markdown: ## și ### titluri, paragrafe, liste (- sau 1.),
// tabele cu |, imagini ![[slug]] din registrul de imagini și casete > [!retine|atentie|bac].

import "server-only";
import fs from "node:fs";
import path from "node:path";
import registru from "../../continut/imagini/imagini.json";

export type Inline = { text: string; bold?: boolean; italic?: boolean };

export type Bloc =
  | { tip: "h2"; text: string; ancora: string }
  | { tip: "h3"; text: string }
  | { tip: "p"; continut: Inline[] }
  | { tip: "lista"; ordonata: boolean; elemente: { nivel: 0 | 1; continut: Inline[] }[] }
  | { tip: "tabel"; cap: Inline[][]; randuri: Inline[][][] }
  | { tip: "imagine"; imagine: Imagine }
  | { tip: "caseta"; fel: "retine" | "atentie" | "bac"; blocuri: Bloc[] };

export interface Imagine {
  slug: string;
  fisier: string;
  latime: number;
  inaltime: number;
  legenda: string;
  alt: string;
  autor: string;
  licenta: string;
  licentaUrl: string | null;
  sursa: string;
  modificari: string | null;
}

const IMAGINI = registru as Record<string, Omit<Imagine, "slug">>;

export function getImagine(slug: string): Imagine | undefined {
  const i = IMAGINI[slug];
  return i ? { slug, ...i } : undefined;
}

export function toateImaginile(): Imagine[] {
  return Object.keys(IMAGINI).map((slug) => ({ slug, ...IMAGINI[slug] }));
}

function ancora(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// **bold**, *italic* și ***ambele***; restul e text simplu.
export function parseInline(text: string): Inline[] {
  const rezultat: Inline[] = [];
  const re = /(\*\*\*([^*]+)\*\*\*|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let ultim = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > ultim) rezultat.push({ text: text.slice(ultim, m.index) });
    if (m[2]) rezultat.push({ text: m[2], bold: true, italic: true });
    else if (m[3]) rezultat.push({ text: m[3], bold: true });
    else rezultat.push({ text: m[4], italic: true });
    ultim = m.index! + m[0].length;
  }
  if (ultim < text.length) rezultat.push({ text: text.slice(ultim) });
  return rezultat;
}

function celule(linie: string) {
  return linie
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => parseInline(c.trim()));
}

export function parseLectie(md: string): Bloc[] {
  const linii = md.replace(/\r/g, "").split("\n");
  const blocuri: Bloc[] = [];
  let i = 0;

  while (i < linii.length) {
    const linie = linii[i];
    const t = linie.trim();

    if (!t) {
      i++;
      continue;
    }

    if (t.startsWith("## ")) {
      const text = t.slice(3).trim();
      blocuri.push({ tip: "h2", text, ancora: ancora(text) });
      i++;
      continue;
    }
    if (t.startsWith("### ")) {
      blocuri.push({ tip: "h3", text: t.slice(4).trim() });
      i++;
      continue;
    }

    const img = t.match(/^!\[\[([\w-]+)\]\]$/);
    if (img) {
      const imagine = getImagine(img[1]);
      if (imagine) blocuri.push({ tip: "imagine", imagine });
      i++;
      continue;
    }

    if (t.startsWith(">")) {
      const interior: string[] = [];
      while (i < linii.length && linii[i].trim().startsWith(">")) {
        interior.push(linii[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const fel = interior[0]?.match(/^\[!(retine|atentie|bac)\]/)?.[1] as "retine" | "atentie" | "bac" | undefined;
      if (fel) interior.shift();
      blocuri.push({ tip: "caseta", fel: fel ?? "retine", blocuri: parseLectie(interior.join("\n")) });
      continue;
    }

    if (t.startsWith("|")) {
      const randuri: string[] = [];
      while (i < linii.length && linii[i].trim().startsWith("|")) {
        randuri.push(linii[i]);
        i++;
      }
      const [cap, , ...corp] = randuri;
      blocuri.push({ tip: "tabel", cap: celule(cap), randuri: corp.map(celule) });
      continue;
    }

    const elementLista = /^(\s*)(-|\d+\.)\s+/;
    if (elementLista.test(linie)) {
      const ordonata = /^\s*\d+\./.test(linie);
      const elemente: { nivel: 0 | 1; continut: Inline[] }[] = [];
      while (i < linii.length && (elementLista.test(linii[i]) || /^\s{2,}\S/.test(linii[i]))) {
        const l = linii[i];
        const m = l.match(elementLista);
        const adancime = m ? m[1].length : 2;
        const text = m ? l.slice(m[0].length) : l.trim();
        elemente.push({ nivel: adancime > 0 ? 1 : 0, continut: parseInline(text) });
        i++;
      }
      blocuri.push({ tip: "lista", ordonata, elemente });
      continue;
    }

    const paragraf: string[] = [];
    while (
      i < linii.length &&
      linii[i].trim() &&
      !/^(#{2,3} |>|\||!\[\[|\s*(-|\d+\.)\s)/.test(linii[i].trim())
    ) {
      paragraf.push(linii[i].trim());
      i++;
    }
    blocuri.push({ tip: "p", continut: parseInline(paragraf.join(" ")) });
  }

  return blocuri;
}

export function getLectie(capitolId: string): Bloc[] | null {
  const fisier = path.join(process.cwd(), "continut", "lectii", `${capitolId}.md`);
  if (!fs.existsSync(fisier)) return null;
  return parseLectie(fs.readFileSync(fisier, "utf8"));
}

// Timpul de citire, la ~180 de cuvinte pe minut (text de manual, cu termeni noi).
function textBloc(b: Bloc): string {
  const t = (x: Inline[]) => x.map((i) => i.text).join("");
  switch (b.tip) {
    case "h2":
    case "h3":
      return b.text;
    case "p":
      return t(b.continut);
    case "lista":
      return b.elemente.map((e) => t(e.continut)).join(" ");
    case "tabel":
      return [b.cap, ...b.randuri].flat().map(t).join(" ");
    case "caseta":
      return b.blocuri.map(textBloc).join(" ");
    case "imagine":
      return b.imagine.legenda;
  }
}

export function minuteCitire(blocuri: Bloc[]): number {
  const cuvinte = blocuri.map(textBloc).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(cuvinte / 180));
}
