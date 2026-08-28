"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, isMocked } from "@/lib/supabase";
import { Shield, Sparkles, BookOpen, User, Play } from "lucide-react";

export default function Home() {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();
          setSessionUser(profile || user);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] flex flex-col justify-between p-6">
      
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4 border-b border-[#2B354F]/50">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          🚀 BacPilot
        </h1>
        
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="text-xs text-gray-400">Se încarcă...</span>
          ) : sessionUser ? (
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
            >
              Mergi la Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="border border-[#2B354F] hover:bg-[#161D30] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
            >
              Autentificare
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="max-w-xl mx-auto text-center flex-1 flex flex-col justify-center my-12">
        <div className="inline-flex bg-blue-600/10 text-blue-500 p-4 rounded-3xl mb-6 mx-auto">
          <Shield className="h-12 w-12" />
        </div>
        
        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Pregătește-te inteligent cu <span className="text-blue-500">BacPilot</span>
        </h2>
        
        <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
          Diagnosticarea cunoștințelor, trasee de studiu personalizate conform programei oficiale și monitorizare în timp real pentru rezultate de succes la examenul de Bacalaureat.
        </p>

        {/* CTA triggers */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          {sessionUser ? (
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-2xl text-sm font-semibold shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Continuă pregătirea</span>
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-2xl text-sm font-semibold shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Creează cont Elev / Părinte</span>
              </Link>
              <Link
                href="/login"
                className="border border-[#2B354F] hover:bg-[#161D30] text-white py-3 px-6 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4" />
                <span>Loghează-te</span>
              </Link>
            </>
          )}
        </div>

        {/* Mock/Offline notice */}
        {isMocked && (
          <div className="mt-8">
            <span className="bg-yellow-900/20 text-yellow-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-yellow-800/30">
              Mod offline activ / Datele se salvează local
            </span>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto text-center py-4 border-t border-[#2B354F]/30 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} BacPilot. Toate drepturile rezervate.</p>
      </footer>

    </div>
  );
}
