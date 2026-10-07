import Planuri from "@/components/Planuri";

export default function Pret() {
  return (
    <main className="mx-auto max-w-5xl px-4 pt-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Prețuri</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Începi gratuit. Plătești doar dacă te ajută.</h1>
        <p className="mt-4 text-muted">Plata se face prin Stripe. Accesul premium se verifică pe server, pentru fiecare capitol și simulare.</p>
      </div>
      <div className="mt-12">
        <Planuri />
      </div>
    </main>
  );
}
