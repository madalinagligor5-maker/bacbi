// Banca de itemi și materialele de sprijin produse de pipeline-ul din continut/.
// Se importă doar în componente de server; clientul primește numai itemii de care are nevoie.

import "server-only";
import banca from "../../continut/out/banca_itemi.json";
import glosar from "../../continut/out/glosar.json";
import fise from "../../continut/out/fise_recuperare.json";
import tabele from "../../continut/out/tabele_comparative.json";
import confuzii from "../../continut/out/confuzii_tipice.json";

export type Nivel = "C" | "U" | "A" | "D" | "R";

interface ItemBaza {
  id: string;
  module: string;
  chapter: string;
  bac_slot: string;
  topic: string;
  level: Nivel;
  difficulty: number;
  source: string | null;
}

export interface ItemGrila extends ItemBaza {
  type: "grila";
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  wrong_why: Record<string, string>;
}

export interface ItemAdevaratFals extends ItemBaza {
  type: "adevarat_fals";
  statement: string;
  truth: boolean;
  correction: string | null;
  explanation: string;
  misconception: string | null;
}

export type Item = ItemGrila | ItemAdevaratFals | (ItemBaza & { type: string });

export interface Confuzie {
  title: string;
  desc: string;
  remedy: string;
}

export const ITEMI = banca as Item[];
export const CONFUZII = confuzii as Record<string, Confuzie>;

export const NUME_TIP: Record<string, string> = {
  grila: "Grilă",
  adevarat_fals: "Adevărat/Fals",
  completare: "Completare",
  exemple_caracteristica: "Exemple + caracteristică",
  structurat: "Item structurat",
  enunturi: "Enunțuri",
  minieseu: "Minieseu",
  problema_calcul: "Problemă de calcul",
  problema_genetica: "Problemă de genetică",
};

// Forma de plural, cu „de” după 19 (regula numeralelor în română): „3 grile”, „20 de grile”.
const PLURAL: Record<string, [string, string]> = {
  grila: ["grilă", "grile"],
  adevarat_fals: ["afirmație adevărat/fals", "afirmații adevărat/fals"],
  completare: ["completare", "completări"],
  exemple_caracteristica: ["item cu exemple", "itemi cu exemple"],
  structurat: ["item structurat", "itemi structurați"],
  enunturi: ["item cu enunțuri", "itemi cu enunțuri"],
  minieseu: ["minieseu", "minieseuri"],
  problema_calcul: ["problemă de calcul", "probleme de calcul"],
  problema_genetica: ["problemă de genetică", "probleme de genetică"],
};

export function numarTip(tip: string, n: number): string {
  const [unu, multe] = PLURAL[tip] ?? [tip, tip];
  if (n === 1) return `1 ${unu}`;
  return n % 100 >= 20 || (n >= 100 && n % 100 === 0) ? `${n} de ${multe}` : `${n} ${multe}`;
}

export function itemiCapitol(capitolId: string): Item[] {
  return ITEMI.filter((i) => i.chapter === capitolId);
}

// Itemii care se pot corecta automat în sesiunea de grile.
export function itemiAutocorectabili(capitolId: string): (ItemGrila | ItemAdevaratFals)[] {
  return itemiCapitol(capitolId).filter(
    (i): i is ItemGrila | ItemAdevaratFals => i.type === "grila" || i.type === "adevarat_fals",
  );
}

export function numarPeTip(capitolId: string): [string, number][] {
  const n = new Map<string, number>();
  for (const i of itemiCapitol(capitolId)) n.set(i.type, (n.get(i.type) ?? 0) + 1);
  return Array.from(n.entries());
}

export function glosarCapitol(capitolId: string) {
  return glosar.filter((g) => g.chapter === capitolId);
}

export function fiseCapitol(capitolId: string) {
  return fise.filter((f) => f.chapter === capitolId && f.kind === "recuperare");
}

export function tabeleCapitol(capitolId: string) {
  return tabele.filter((t) => t.chapter === capitolId);
}
