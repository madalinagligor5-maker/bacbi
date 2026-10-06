// Regulile examenului folosite de simulare și de nota estimată.
export const EXAMEN = {
  durataMinute: 180,
  punctajMaxim: 100,
  puncteDinOficiu: 10,
  notaPromovare: 5,
} as const;

// Nota pe scara 1–10 din punctajul obținut (fără oficiu).
export function notaEstimata(puncteObtinute: number): number {
  const total = Math.min(EXAMEN.punctajMaxim, puncteObtinute + EXAMEN.puncteDinOficiu);
  return Math.round(total) / 10;
}

export const MINUTE_PE_ZI = [10, 20, 30] as const;

// Structura probei E.d (subiectul de bac 2025 și simularea 2026, continut/docs/format_proba.md).
// Baremul oficial nu a fost furnizat; punctajele din interiorul cerințelor sunt orientative.
export const STRUCTURA_PROBA = [
  {
    subiect: "I",
    puncte: 30,
    cerinte: [
      { cod: "A", puncte: 4, ce: "Completarea spațiilor libere", tipuri: ["completare"] },
      { cod: "B", puncte: 6, ce: "Două exemple + câte o caracteristică", tipuri: ["exemple_caracteristica"] },
      { cod: "C", puncte: 10, ce: "5 itemi cu alegere multiplă", tipuri: ["grila"] },
      { cod: "D", puncte: 10, ce: "3 afirmații A/F, corectare fără negație", tipuri: ["adevarat_fals"] },
    ],
  },
  {
    subiect: "II",
    puncte: 30,
    cerinte: [
      { cod: "A", puncte: 18, ce: "Enumerare, explicație, calcul în lanț, cerință proprie", tipuri: ["structurat", "problema_calcul"] },
      { cod: "B", puncte: 12, ce: "Problemă de genetică", tipuri: ["problema_genetica"] },
    ],
  },
  {
    subiect: "III",
    puncte: 30,
    cerinte: [
      { cod: "1", puncte: 14, ce: "Precizări, explicație, patru enunțuri", tipuri: ["structurat", "enunturi"] },
      { cod: "2", puncte: 16, ce: "Cerințe scurte și minieseu cu 6 noțiuni", tipuri: ["structurat", "minieseu"] },
    ],
  },
] as const;
