import Pagina from "@/components/Pagina";

export default function Page() {
  return (
    <Pagina
      titlu="Înregistrare"
      continut={[
        "Email + parolă sau Google",
        "Acord termeni",
        "Acord părinte sub 16 ani",
        "Acțiune: Creează cont",
      ]}
    />
  );
}
