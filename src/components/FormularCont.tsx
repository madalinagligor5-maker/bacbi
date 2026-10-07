import Link from "next/link";

// Formularul de înregistrare / autentificare. Autentificarea reală se leagă la pasul cu baza de date.
export default function FormularCont({ tip }: { tip: "inregistrare" | "autentificare" }) {
  const inregistrare = tip === "inregistrare";
  return (
    <main className="mx-auto max-w-md px-4 pt-8">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        {inregistrare ? "Creează-ți contul" : "Bine ai revenit"}
      </h1>
      <p className="mt-2 text-muted">
        {inregistrare ? "Durează un minut. Primul plan îl ai imediat după." : "Continuă de unde ai rămas."}
      </p>

      <form action={inregistrare ? "/onboarding" : "/azi"} className="card mt-8 space-y-4 p-6">
        <button type="button" className="btn-secondary w-full">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
            <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23Z" />
            <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9Z" />
            <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4Z" />
          </svg>
          Continuă cu Google
        </button>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-line" /> sau cu email <span className="h-px flex-1 bg-line" />
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Email</span>
          <input type="email" name="email" autoComplete="email" className="input" placeholder="nume@exemplu.ro" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Parolă</span>
          <input
            type="password"
            name="parola"
            autoComplete={inregistrare ? "new-password" : "current-password"}
            className="input"
            placeholder={inregistrare ? "Minimum 8 caractere" : "Parola ta"}
          />
        </label>

        {inregistrare ? (
          <div className="space-y-3 text-sm">
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-0.5 h-5 w-5 accent-[var(--primary)]" />
              <span>Accept termenii și politica de confidențialitate.</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-0.5 h-5 w-5 accent-[var(--primary)]" />
              <span>Am sub 16 ani: un părinte își dă acordul (primește un email de confirmare).</span>
            </label>
          </div>
        ) : (
          <Link href="/autentificare" className="block text-sm font-semibold text-primary">
            Ai uitat parola?
          </Link>
        )}

        <button type="submit" className="btn-primary w-full">
          {inregistrare ? "Creează cont" : "Intră în cont"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {inregistrare ? "Ai deja cont? " : "Nu ai cont? "}
        <Link href={inregistrare ? "/autentificare" : "/inregistrare"} className="font-semibold text-primary">
          {inregistrare ? "Intră în cont" : "Începe gratuit"}
        </Link>
      </p>
    </main>
  );
}
