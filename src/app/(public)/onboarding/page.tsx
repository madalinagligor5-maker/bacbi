import Onboarding from "@/components/Onboarding";
import { VARIANTE } from "@/lib/curriculum";
import { DATA_EXAMEN_ORIENTATIVA } from "@/lib/examen";

export default function Page() {
  return (
    <Onboarding
      variante={VARIANTE.map(({ id, numar, titlu, stare }) => ({ id, numar, titlu, stare }))}
      dataImplicita={DATA_EXAMEN_ORIENTATIVA}
    />
  );
}
