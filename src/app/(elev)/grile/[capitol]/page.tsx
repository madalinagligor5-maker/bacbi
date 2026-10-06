import { notFound } from "next/navigation";
import Pagina from "@/components/Pagina";
import { TOATE_CAPITOLELE } from "@/lib/curriculum";

export function generateStaticParams() {
  return TOATE_CAPITOLELE.map((c) => ({ capitol: c.slug }));
}

export default function SesiuneGrile({ params }: { params: { capitol: string } }) {
  const capitol = TOATE_CAPITOLELE.find((c) => c.slug === params.capitol);
  if (!capitol) notFound();

  return (
    <Pagina
      titlu={`Grile: ${capitol.titlu}`}
      continut={[
        "O întrebare pe ecran",
        "Explicație după răspuns",
        "„Cât de sigur ești?”",
        "Scor final",
      ]}
    />
  );
}
