import { notFound } from "next/navigation";
import SesiuneGrile from "@/components/SesiuneGrile";
import { TOATE_CAPITOLELE } from "@/lib/curriculum";
import { CONFUZII, itemiAutocorectabili } from "@/lib/continut";

export default function Page({
  params,
  searchParams,
}: {
  params: { capitol: string };
  searchParams: { dificultate?: string };
}) {
  const capitol = TOATE_CAPITOLELE.find((c) => c.slug === params.capitol);
  if (!capitol) notFound();

  const itemi = itemiAutocorectabili(capitol.id).filter(
    (i) => !searchParams.dificultate || String(i.difficulty) === searchParams.dificultate,
  );
  if (itemi.length === 0) notFound();

  // Trimitem clientului doar confuziile la care trimit itemii din sesiune.
  const coduri = new Set(
    itemi.flatMap((i) =>
      i.type === "grila" ? Object.values(i.wrong_why) : i.misconception ? [i.misconception] : [],
    ),
  );
  const confuzii = Object.fromEntries(
    Object.entries(CONFUZII).filter(([cod]) => coduri.has(cod)),
  );

  return <SesiuneGrile titlu={capitol.titlu} itemi={itemi} confuzii={confuzii} />;
}
