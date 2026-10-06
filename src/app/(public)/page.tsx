import Link from "next/link";
import Pagina from "@/components/Pagina";

export default function Landing() {
  return (
    <Pagina
      titlu="BacBio"
      continut={[
        "Promisiune: Bacul la biologie în 10–20 de minute pe zi",
        "Cum funcționează (3 pași)",
        "Previzualizare grilă",
        "Prețuri pe scurt",
        "Întrebări frecvente",
      ]}
    >
      <Link href="/inregistrare" className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-white">
        Începe gratuit
      </Link>
    </Pagina>
  );
}
