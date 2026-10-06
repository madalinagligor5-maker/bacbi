import Link from "next/link";
import Pagina from "@/components/Pagina";

export default function Azi() {
  return (
    <Pagina
      titlu="Azi"
      continut={[
        "Countdown până la examen",
        "Seria de zile",
        "Planul zilnic",
        "Punctul slab al zilei",
      ]}
    >
      <div className="flex gap-4 text-sm underline">
        <Link href="/recapitulare">Recapitulare</Link>
        <Link href="/cont">Cont</Link>
      </div>
    </Pagina>
  );
}
