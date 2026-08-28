import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center text-foreground">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-extrabold text-white shadow-lg shadow-primary/25">
          B
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">BacPilot</h1>
      </div>

      <p className="max-w-md text-lg text-slate-600">
        Pregătire inteligentă pentru examenul de bacalaureat.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/auth/login"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Autentificare
        </Link>
        <Link
          href="/auth/register"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
        >
          Creează cont
        </Link>
      </div>
    </main>
  );
}
