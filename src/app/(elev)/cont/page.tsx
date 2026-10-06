import Pagina from "@/components/Pagina";

export default function Page() {
  return (
    <Pagina
      titlu="Cont"
      continut={[
        "Profil",
        "Abonament",
        "Notificări",
        "Export/ștergere date (GDPR)",
      ]}
    />
  );
}
