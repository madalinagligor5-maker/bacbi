"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isMocked } from "@/lib/supabase";
import { Shield, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Check where user needs to go
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profile && profile.rol === "elev" && !profile.traseu_activ_id) {
        router.push("/choose-track");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError("A apărut o eroare neașteptată la conectare.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0F19]">
      <div className="w-full max-w-md bg-[#161D30] border border-[#2B354F] rounded-3xl p-8 shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-blue-600/10 text-blue-500 p-3 rounded-2xl mb-3">
            <Shield className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">Conectare BacPilot</h2>
          <p className="text-sm text-gray-400 mt-1">Introdu datele tale pentru a continua pregătirea</p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="bg-red-900/30 text-red-400 border border-red-800 text-xs p-3 rounded-2xl mb-6">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Adresă Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B0F19] border border-[#2B354F] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-2xl pl-10 pr-4 py-2.5 text-sm"
                placeholder="nume@exemplu.ro"
              />
              <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Parolă
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B0F19] border border-[#2B354F] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-2xl pl-10 pr-4 py-2.5 text-sm"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-sm font-semibold transition-colors active:scale-[0.99] disabled:opacity-50 mt-2"
          >
            {loading ? "Se conectează..." : "Intră în cont"}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-[#2B354F]/50">
          <p className="text-xs text-gray-400">
            Nu ai un cont creat?{" "}
            <Link href="/register" className="text-blue-400 hover:underline font-semibold">
              Înregistrează-te
            </Link>
          </p>
        </div>

        {isMocked && (
          <div className="text-center mt-6">
            <span className="bg-yellow-900/30 text-yellow-400 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full border border-yellow-800">
              Mod offline activ - poți folosi orice email/parolă
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
