"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { inregistreaza, type AuthState } from "@/app/auth/actions";
import type { Rol } from "@/types";

const stareInitiala: AuthState = { error: null };

function ButonSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-60"
    >
      {pending ? "Se creează contul..." : "Creează cont"}
    </button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useFormState(inregistreaza, stareInitiala);
  const [rol, setRol] = useState<Rol>("elev");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-2xl font-extrabold text-foreground">Creează cont</h1>
        <p className="mb-6 text-sm text-slate-500">Alătură-te BacPilot.</p>

        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <span className="mb-1 block text-sm font-medium text-slate-700">Sunt</span>
            <div className="grid grid-cols-2 gap-2">
              {(["elev", "parinte"] as const).map((optiune) => (
                <label
                  key={optiune}
                  className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
                    rol === optiune
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-300 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="rol"
                    value={optiune}
                    checked={rol === optiune}
                    onChange={() => setRol(optiune)}
                    className="sr-only"
                  />
                  {optiune === "elev" ? "Elev" : "Părinte"}
                </label>
              ))}
            </div>
          </div>

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
              minLength={6}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {rol === "parinte" && (
            <div>
              <label htmlFor="cod_invitatie" className="mb-1 block text-sm font-medium text-slate-700">
                Cod de invitație (de la elev)
              </label>
              <input
                id="cod_invitatie"
                name="cod_invitatie"
                type="text"
                required
                placeholder="ex: A3F9K2"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase tracking-widest focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {state.error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{state.error}</p>
          )}

          <ButonSubmit />
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Ai deja cont?{" "}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Autentifică-te
          </Link>
        </p>
      </div>
    </main>
  );
}
