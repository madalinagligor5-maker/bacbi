import Pagina from "@/components/Pagina";

export default function Page() {
  return (
    <Pagina
      titlu="Prețuri"
      continut={[
        "Gratuit",
        "Lunar",
        "Până la Bac",
        "Plată prin Stripe",
        "Acțiune: Alege planul",
      ]}
    />
  );
}
