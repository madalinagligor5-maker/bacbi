import Pagina from "@/components/Pagina";
import { EXAMEN } from "@/lib/examen";

export default function Simulare() {
  return (
    <Pagina
      titlu="Simulare"
      continut={[
        "Lista simulărilor pe variantă",
        `Reguli: ${EXAMEN.durataMinute / 60} ore, ${EXAMEN.punctajMaxim} de puncte, ${EXAMEN.puncteDinOficiu} din oficiu, promovare de la ${EXAMEN.notaPromovare}`,
        "Reia o simulare începută",
      ]}
    />
  );
}
