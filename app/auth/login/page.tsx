"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { autentifica, type AuthState } from "@/app/auth/actions";

const stareInitiala: AuthState = { error: null };

function ButonSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-60"
    >
      {pending ? "Se autentifică..." : "Autentifică-te"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(autentifica, stareInitiala);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-2xl font-extrabold text-foreground">Autentificare</h1>
        <p className="mb-6 text-sm text-slate-500">Intră în contul tău BacPilot.</p>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="parola" className="mb-1 block text-sm font-medium text-slate-700">
              Parolă
            </label>
            <input
              id="parola"
              name="parola"
              type="password"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {state.error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{state.error}</p>
          )}

          <ButonSubmit />
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Nu ai cont?{" "}
          <Link href="/auth/register" className="font-semibold text-primary hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </div>
    </main>
  );
}
