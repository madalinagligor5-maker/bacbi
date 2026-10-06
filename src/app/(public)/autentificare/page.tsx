import Pagina from "@/components/Pagina";

export default function Page() {
  return (
    <Pagina
      titlu="Autentificare"
      continut={[
        "Email + parolă sau Google",
        "Resetare parolă",
        "Acțiune: Intră în cont",
      ]}
    />
  );
}
