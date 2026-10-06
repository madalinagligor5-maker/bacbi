// Capitolele pe cele două variante ale probei.
// Modulul A (proba E.d, clasele IX–X) vine din harta generată de pipeline-ul de conținut
// (continut/out/harta_continut.json). Modulul B e doar o hartă din cuprinsurile manualelor
// (continut/docs/modul_B_harta.md): fără itemi, de confirmat cu programa în vigoare.

import harta from "../../continut/out/harta_continut.json";

export type VariantaId = "vegetala-animala" | "anatomie-genetica";
export type Clasa = "IX" | "X" | "XI" | "XII";

export interface Capitol {
  id: string; // A01…A23, B01…B15
  slug: string;
  titlu: string;
  clasa: Clasa;
  teme: string[];
  sloturiBac: string[];
  prerechizite: string[];
  ideiMari: string[];
  surse: string[];
  areContinut: boolean;
}

export interface Varianta {
  id: VariantaId;
  numar: "I" | "II";
  titlu: string;
  stare: string;
  capitole: Capitol[];
}

// Diversitatea, celula și ereditatea sunt materie de clasa a IX-a; restul Modulului A e de clasa a X-a.
const CLASA_IX = new Set(["A01", "A02", "A03", "A22", "A23"]);

const capitoleA: Capitol[] = harta.chapters.map((c) => ({
  id: c.id,
  slug: c.id.toLowerCase(),
  titlu: c.title,
  clasa: CLASA_IX.has(c.id) ? "IX" : "X",
  teme: c.concepts,
  sloturiBac: c.bac_slots,
  prerechizite: c.prereq,
  ideiMari: c.big_ideas,
  surse: c.sources,
  areContinut: true,
}));

const HARTA_B: [string, string, Clasa, string[]][] = [
  ["B01", "Alcătuirea corpului uman", "XI", ["Niveluri de organizare", "Topografia organelor: planuri și segmente"]],
  ["B02", "Sistemul nervos", "XI", ["Neuronul", "Sinapsa", "Măduva spinării", "Trunchiul cerebral", "Cerebelul", "Diencefalul", "Emisferele cerebrale", "Sistemul nervos vegetativ"]],
  ["B03", "Analizatorii", "XI", ["Analizatorul cutanat", "Analizatorul olfactiv", "Analizatorul gustativ", "Analizatorul vizual", "Analizatorul acustico-vestibular", "Analizatorul kinestezic"]],
  ["B04", "Glandele endocrine", "XI", ["Hipofiza", "Tiroida", "Suprarenalele", "Pancreasul endocrin", "Paratiroidele", "Epifiza", "Timusul", "Gonadele"]],
  ["B05", "Mișcarea: sistemul osos și muscular", "XI", ["Sistemul osos", "Sistemul muscular"]],
  ["B06", "Digestia și absorbția", "XI", ["Digestia", "Absorbția"]],
  ["B07", "Circulația", "XI", ["Sângele", "Grupele sangvine și transfuziile", "Inima", "Vasele de sânge"]],
  ["B08", "Respirația", "XI", ["Respirația (prezența în cuprins neconfirmată)"]],
  ["B09", "Excreția", "XI", ["Formarea urinei", "Micțiunea"]],
  ["B10", "Metabolismul și nutrimentele", "XI", ["Metabolismul", "Nutrimentele"]],
  ["B11", "Reproducerea", "XI", ["Sistemul reproducător feminin și masculin", "Concepția", "Sarcina și nașterea", "Contracepția"]],
  ["B12", "Organismul – un tot unitar", "XI", ["Homeostazia", "Integrarea nervos–endocrină"]],
  ["B13", "Genetică moleculară", "XII", ["Acizii nucleici", "Organizarea materialului genetic"]],
  ["B14", "Genetică umană", "XII", ["Genetică umană"]],
  ["B15", "Ecologie umană", "XII", ["Ecologie"]],
];

const capitoleB: Capitol[] = HARTA_B.map(([id, titlu, clasa, teme]) => ({
  id,
  slug: id.toLowerCase(),
  titlu,
  clasa,
  teme,
  sloturiBac: [],
  prerechizite: [],
  ideiMari: [],
  surse: ["Cuprinsurile manualelor de clasa a XI-a și a XII-a"],
  areContinut: false,
}));

export const VARIANTE: Varianta[] = [
  {
    id: "vegetala-animala",
    numar: "I",
    titlu: "Biologie vegetală și animală",
    stare: "23 de capitole cu itemi",
    capitole: capitoleA,
  },
  {
    id: "anatomie-genetica",
    numar: "II",
    titlu: "Anatomie, genetică și ecologie umană",
    stare: "Doar harta capitolelor; itemii urmează după confirmarea programei",
    capitole: capitoleB,
  },
];

export function getVarianta(id: string): Varianta | undefined {
  return VARIANTE.find((v) => v.id === id);
}

export function getCapitol(variantaId: string, slug: string): Capitol | undefined {
  return getVarianta(variantaId)?.capitole.find((c) => c.slug === slug);
}

export function capitolePeClase(varianta: Varianta): [Clasa, Capitol[]][] {
  const grupe = new Map<Clasa, Capitol[]>();
  for (const c of varianta.capitole) {
    grupe.set(c.clasa, [...(grupe.get(c.clasa) ?? []), c]);
  }
  return Array.from(grupe.entries());
}

export const TOATE_CAPITOLELE = VARIANTE.flatMap((v) =>
  v.capitole.map((c) => ({ ...c, varianta: v.id })),
);

export function getCapitolDupaId(id: string) {
  return TOATE_CAPITOLELE.find((c) => c.id === id);
}
