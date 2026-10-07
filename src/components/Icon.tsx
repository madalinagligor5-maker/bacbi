// Iconițe liniare, desenate la 24×24, care moștenesc culoarea textului.
const PATHS = {
  azi: "M12 3v2m0 14v2m9-9h-2M5 12H3m15.4-6.4-1.4 1.4M7 17l-1.4 1.4m12.8 0L17 17M7 7 5.6 5.6M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  invata: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5",
  grile: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",
  simulare: "M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  progres: "M4 20V10m6 10V4m6 16v-7m4 7H2",
  flacara: "M12 22c4 0 7-3 7-7 0-4-3-6-4-9-1 2-2 3-4 3 0-2 0-4-2-6-1 4-4 6-4 12 0 4 3 7 7 7Z",
  sageata: "M5 12h14m-6-6 6 6-6 6",
  inapoi: "M19 12H5m6 6-6-6 6-6",
  repeta: "M4 4v6h6M20 20v-6h-6M5.5 15A7 7 0 0 0 18 17.5M18.5 9A7 7 0 0 0 6 6.5",
  tinta: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  bifa: "M5 12.5 10 17 19 7",
  x: "M6 6l12 12M18 6 6 18",
  bec: "M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z",
  utilizator: "M20 21a8 8 0 1 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  lacat: "M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5V11Z",
  frunza: "M5 19c0-8 5-14 15-15-1 10-7 15-15 15Zm0 0 7-7",
  stea: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z",
} as const;

export type NumeIcon = keyof typeof PATHS;

export default function Icon({
  nume,
  className = "h-5 w-5",
  grosime = 1.8,
}: {
  nume: NumeIcon;
  className?: string;
  grosime?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={grosime}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[nume]} />
    </svg>
  );
}
