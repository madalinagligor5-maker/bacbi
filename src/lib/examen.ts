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
