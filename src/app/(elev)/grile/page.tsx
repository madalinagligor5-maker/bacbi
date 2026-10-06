import Link from "next/link";
import Pagina from "@/components/Pagina";
import { TOATE_CAPITOLELE } from "@/lib/curriculum";

export default function Grile() {
  return (
    <Pagina
      titlu="Grile"
      continut={["Filtre: dificultate, doar greșite", "Mod mixt"]}
    >
      <ul className="list-disc pl-5">
        {TOATE_CAPITOLELE.map((c) => (
          <li key={c.slug}>
            <Link href={`/grile/${c.slug}`} className="underline">
              {c.titlu}
            </Link>
          </li>
        ))}
      </ul>
    </Pagina>
  );
}
