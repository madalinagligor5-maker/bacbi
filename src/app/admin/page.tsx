import Pagina from "@/components/Pagina";

export default function Page() {
  return (
    <Pagina
      titlu="Administrare"
      continut={[
        "Acces doar pentru echipa aplicației",
        "Întrebări: /admin/intrebari",
        "Simulări: /admin/simulari",
      ]}
    />
  );
}
