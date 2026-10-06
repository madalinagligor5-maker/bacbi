import Pagina from "@/components/Pagina";

export default function Page() {
  return (
    <Pagina
      titlu="Întrebări"
      continut={[
        "Tabel cu filtre: capitol, tip, dificultate, validat",
        "Formular de editare",
        "Import în masă",
      ]}
    />
  );
}
