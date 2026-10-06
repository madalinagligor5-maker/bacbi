// Programa de Bacalaureat la biologie – simulare 2026.
// Capitolele urmează punctele din programa oficială; fiecare are 1–9 teme.
// Temele trebuie verificate cu PDF-ul programei înainte de publicarea conținutului.

export type VariantaId = "vegetala-animala" | "anatomie-genetica";
export type Clasa = "IX" | "X" | "XI" | "XII";

export interface Capitol {
  slug: string;
  titlu: string;
  clasa: Clasa;
  teme: string[];
}

export interface Varianta {
  id: VariantaId;
  numar: "I" | "II";
  titlu: string;
  capitole: Capitol[];
}

export const VARIANTE: Varianta[] = [
  {
    id: "vegetala-animala",
    numar: "I",
    titlu: "Biologie vegetală și animală",
    capitole: [
      {
        slug: "diversitatea-lumii-vii",
        titlu: "Diversitatea lumii vii",
        clasa: "IX",
        teme: [
          "Clasificarea organismelor: sistemul de clasificare, specia",
          "Virusuri",
          "Regnul Monera",
          "Regnul Protista",
          "Regnul Fungi",
          "Regnul Plante",
          "Regnul Animale",
        ],
      },
      {
        slug: "celula",
        titlu: "Celula – unitatea structurală și funcțională a vieții",
        clasa: "IX",
        teme: [
          "Celula procariotă și celula eucariotă",
          "Componentele celulei: membrana, citoplasma, organitele",
          "Nucleul",
          "Diviziunea celulară: mitoza",
          "Diviziunea celulară: meioza",
        ],
      },
      {
        slug: "ereditate-variabilitate",
        titlu: "Ereditatea și variabilitatea lumii vii",
        clasa: "IX",
        teme: [
          "Concepte de genetică",
          "Legile mendeliene ale eredității: monohibridarea",
          "Legile mendeliene ale eredității: dihibridarea",
          "Abateri de la segregarea mendeliană",
          "Teoria cromozomială a eredității; determinismul cromozomial al sexelor",
          "Variabilitatea: recombinarea genetică, mutațiile",
          "Boli genetice umane",
        ],
      },
      {
        slug: "tesuturi",
        titlu: "Țesuturi vegetale și animale",
        clasa: "X",
        teme: ["Țesuturi vegetale", "Țesuturi animale"],
      },
      {
        slug: "nutritia-autotrofa",
        titlu: "Nutriția autotrofă: fotosinteza",
        clasa: "X",
        teme: [
          "Pigmenți asimilatori și cloroplaste",
          "Faza de lumină și faza de întuneric",
          "Factorii care influențează fotosinteza",
          "Importanța fotosintezei",
        ],
      },
      {
        slug: "nutritia-heterotrofa",
        titlu: "Nutriția heterotrofă",
        clasa: "X",
        teme: ["Nutriția saprofită", "Nutriția parazită", "Nutriția simbiotică"],
      },
      {
        slug: "digestia",
        titlu: "Digestia și absorbția la mamifere",
        clasa: "X",
        teme: [
          "Sistemul digestiv: tub digestiv și glande anexe",
          "Digestia bucală și gastrică",
          "Digestia intestinală",
          "Absorbția intestinală",
          "Boli ale sistemului digestiv",
        ],
      },
      {
        slug: "respiratia",
        titlu: "Respirația",
        clasa: "X",
        teme: [
          "Respirația aerobă și respirația anaerobă (fermentațiile)",
          "Respirația la plante",
          "Sistemul respirator la mamifere",
          "Ventilația pulmonară și schimbul de gaze",
          "Boli ale sistemului respirator",
        ],
      },
      {
        slug: "circulatia",
        titlu: "Circulația",
        clasa: "X",
        teme: [
          "Absorbția și circulația sevei la plante",
          "Transpirația și eliminarea apei",
          "Sistemul circulator la mamifere: inima și vasele de sânge",
          "Circulația mare și circulația mică",
          "Boli ale sistemului circulator",
        ],
      },
      {
        slug: "excretia",
        titlu: "Excreția",
        clasa: "X",
        teme: [
          "Excreția la plante",
          "Sistemul excretor la mamifere: rinichiul și nefronul",
          "Formarea urinei",
          "Boli ale sistemului excretor",
        ],
      },
      {
        slug: "sensibilitatea",
        titlu: "Sensibilitatea și coordonarea",
        clasa: "X",
        teme: [
          "Sensibilitatea la plante: tropisme și nastii",
          "Organe de simț la mamifere: ochiul",
          "Organe de simț la mamifere: urechea",
          "Sistemul nervos la mamifere",
          "Boli ale sistemului nervos și ale organelor de simț",
        ],
      },
      {
        slug: "locomotia",
        titlu: "Locomoția",
        clasa: "X",
        teme: ["Mișcarea la plante", "Locomoția la animale: sistemul osos și sistemul muscular"],
      },
      {
        slug: "reproducerea",
        titlu: "Reproducerea",
        clasa: "X",
        teme: [
          "Reproducerea asexuată la plante",
          "Reproducerea sexuată la angiosperme: floarea, polenizarea, fecundația",
          "Sămânța și fructul",
          "Sistemul reproducător la mamifere",
          "Boli ale sistemului reproducător",
        ],
      },
    ],
  },
  {
    id: "anatomie-genetica",
    numar: "II",
    titlu: "Anatomie, genetică și ecologie umană",
    capitole: [
      {
        slug: "sistemul-nervos",
        titlu: "Sistemul nervos",
        clasa: "XI",
        teme: [
          "Neuronul și sinapsa",
          "Actul reflex și arcul reflex",
          "Măduva spinării",
          "Trunchiul cerebral",
          "Cerebelul",
          "Diencefalul",
          "Emisferele cerebrale",
          "Sistemul nervos vegetativ",
          "Boli ale sistemului nervos",
        ],
      },
      {
        slug: "analizatorii",
        titlu: "Analizatorii",
        clasa: "XI",
        teme: [
          "Structura generală a unui analizator",
          "Analizatorul vizual",
          "Analizatorul acustico-vestibular",
          "Analizatorul olfactiv și analizatorul gustativ",
          "Analizatorul cutanat și analizatorul kinestezic",
          "Boli ale analizatorilor",
        ],
      },
      {
        slug: "glandele-endocrine",
        titlu: "Glandele endocrine",
        clasa: "XI",
        teme: [
          "Hipofiza",
          "Tiroida și paratiroidele",
          "Suprarenalele",
          "Pancreasul endocrin",
          "Gonadele, epifiza și timusul",
          "Disfuncții endocrine",
        ],
      },
      {
        slug: "sistemul-osos",
        titlu: "Sistemul osos",
        clasa: "XI",
        teme: [
          "Structura osului; osificarea și creșterea oaselor",
          "Scheletul: cap, trunchi, membre",
          "Articulațiile",
          "Boli ale sistemului osos",
        ],
      },
      {
        slug: "sistemul-muscular",
        titlu: "Sistemul muscular",
        clasa: "XI",
        teme: [
          "Grupele de mușchi scheletici",
          "Proprietățile mușchilor; contracția musculară",
          "Boli ale sistemului muscular",
        ],
      },
      {
        slug: "digestia-absorbtia",
        titlu: "Digestia și absorbția",
        clasa: "XI",
        teme: [
          "Sistemul digestiv: anatomie",
          "Digestia bucală",
          "Digestia gastrică",
          "Digestia intestinală",
          "Absorbția intestinală",
          "Boli ale sistemului digestiv",
        ],
      },
      {
        slug: "circulatia-om",
        titlu: "Circulația",
        clasa: "XI",
        teme: [
          "Sângele: compoziție, grupe sanguine, imunitate",
          "Inima: structură și proprietăți",
          "Ciclul cardiac",
          "Vasele de sânge; circulația mare și mică",
          "Sistemul limfatic",
          "Boli ale sistemului circulator",
        ],
      },
      {
        slug: "respiratia-om",
        titlu: "Respirația",
        clasa: "XI",
        teme: [
          "Sistemul respirator: anatomie",
          "Ventilația pulmonară; volume și capacități pulmonare",
          "Schimbul de gaze și transportul gazelor",
          "Boli ale sistemului respirator",
        ],
      },
      {
        slug: "excretia-om",
        titlu: "Excreția",
        clasa: "XI",
        teme: [
          "Sistemul excretor: rinichiul și nefronul",
          "Formarea urinei: filtrare, reabsorbție, secreție",
          "Boli ale sistemului excretor",
        ],
      },
      {
        slug: "metabolismul",
        titlu: "Metabolismul",
        clasa: "XI",
        teme: ["Metabolismul glucidic", "Metabolismul lipidic", "Metabolismul proteic"],
      },
      {
        slug: "sistemul-reproducator",
        titlu: "Sistemul reproducător",
        clasa: "XI",
        teme: [
          "Sistemul reproducător masculin",
          "Sistemul reproducător feminin; ciclul ovarian și menstrual",
          "Boli ale sistemului reproducător",
        ],
      },
      {
        slug: "genetica-moleculara",
        titlu: "Genetică moleculară",
        clasa: "XII",
        teme: [
          "Acizii nucleici: ADN și ARN",
          "Replicația ADN",
          "Organizarea materialului genetic la virusuri, procariote și eucariote",
          "Biosinteza proteinelor: transcripția și traducerea",
          "Codul genetic",
        ],
      },
    ],
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
  return [...grupe.entries()];
}

export const TOATE_CAPITOLELE = VARIANTE.flatMap((v) =>
  v.capitole.map((c) => ({ ...c, varianta: v.id })),
);
