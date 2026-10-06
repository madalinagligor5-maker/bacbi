import Link from "next/link";
import { notFound } from "next/navigation";
import Pagina from "@/components/Pagina";
import { VARIANTE, getCapitol } from "@/lib/curriculum";

export function generateStaticParams() {
  return VARIANTE.flatMap((v) => v.capitole.map((c) => ({ varianta: v.id, capitol: c.slug })));
}

export default function Capitol({ params }: { params: { varianta: string; capitol: string } }) {
  const capitol = getCapitol(params.varianta, params.capitol);
  if (!capitol) notFound();

  return (
    <Pagina titlu={capitol.titlu} continut={capitol.teme}>
      <p className="text-sm text-slate-500">
        Fiecare temă: marcaj „am înțeles” / „repetă mai târziu”.
      </p>
      <Link href={`/grile/${capitol.slug}`} className="mt-4 inline-block underline">
        Fă grile pe acest capitol
      </Link>
    </Pagina>
  );
}
