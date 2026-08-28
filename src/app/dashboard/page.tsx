"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isMocked } from "@/lib/supabase";
import { LogOut, BookOpen, User, Copy, Check, Users, Sparkles, BarChart2, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: userProfile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!userProfile) {
        router.push("/login");
        return;
      }

      setProfile(userProfile);

      // Load attempts to see if diagnostic was completed
      // The mock or supabase client query
      const { data: attemptsData } = await supabase
        .from("incercari")
        .select("*")
        .eq("user_id", user.id);

      if (attemptsData) {
        setAttempts(attemptsData.filter((a: any) => a.context === "diagnostic"));
      }

      setLoading(false);
    }
    loadData();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const getInviteCode = () => {
    if (!profile) return "";
    return `BP-${profile.email}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getInviteCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate diagnostic results if test taken
  const getDiagnosticScore = () => {
    if (attempts.length === 0) return null;
    const correct = attempts.filter(a => a.corect).length;
    return Math.round((correct / attempts.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const diagScore = getDiagnosticScore();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Header */}
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-[#2B354F]/50">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              🚀 BacPilot <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-md font-normal">Alpha v0.1</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Sistemul tău inteligent de pregătire pentru Bacalaureat</p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 bg-red-950/20 border border-red-800/40 hover:bg-red-900/20 text-red-400 px-4 py-2 rounded-2xl text-xs font-semibold transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Deconectare
          </button>
        </header>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Account Details */}
          <div className="bg-[#161D30] border border-[#2B354F] rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5">
                <User className="h-4 w-4 text-blue-500" /> Profil Utilizator
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Email</span>
                  <p className="text-sm font-semibold text-white break-all">{profile.email}</p>
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Rol Cont</span>
                  <p className="text-sm font-bold text-blue-400 capitalize">{profile.rol}</p>
                </div>
              </div>
            </div>

            {/* Offline notification badge */}
            {isMocked && (
              <div className="mt-8 bg-yellow-900/20 text-yellow-400 text-[10px] p-2.5 rounded-xl border border-yellow-800/30 text-center font-semibold">
                Simulare locală (Fără Supabase)
              </div>
            )}
          </div>

          {/* Right Columns: Active Plan & Invitation Link */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Active Track / Diagnostic Card */}
            {profile.rol === "elev" ? (
              <div className="space-y-4">
                {/* Active Track Banner */}
                {profile.traseu_activ_id && (
                  <div className="bg-[#161D30] border border-[#2B354F] rounded-3xl p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-blue-500" /> Traseu de Învățare Activ
                    </h3>
                    
                    <div className="bg-[#0B0F19] border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-base">Biologie B2</h4>
                        <p className="text-xs text-gray-400 mt-1">Pregătire pentru Anatomie, Genetică și Fiziologie.</p>
                      </div>
                      <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                        Activ
                      </span>
                    </div>
                  </div>
                )}

                {/* Diagnostic Test Card status */}
                <div className="bg-[#161D30] border border-[#2B354F] rounded-3xl p-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5">
                    <BarChart2 className="h-4 w-4 text-blue-500" /> Stare Evaluare Diagnostic
                  </h3>

                  {diagScore !== null ? (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#0B0F19] p-4 rounded-2xl border border-emerald-500/20">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Test Diagnostic Finalizat</span>
                        <h4 className="font-bold text-white text-sm mt-1">Scor Obținut: {diagScore}%</h4>
                        <p className="text-xs text-gray-400 mt-1">Răspunsuri corecte: {attempts.filter(a => a.corect).length} / {attempts.length}</p>
                      </div>
                      <Link 
                        href="/diagnostic" 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all text-center shrink-0"
                      >
                        Reia Testul
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-[#0B0F19] border border-yellow-800/30 p-5 rounded-2xl flex flex-col gap-4">
                      <div className="flex items-start gap-2.5">
                        <ShieldAlert className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-white text-sm">Testul Diagnostic nu este finalizat!</h4>
                          <p className="text-xs text-gray-400 mt-1">
                            Este recomandat să parcurgi testul de 24 de întrebări pentru a genera harta de cunoștințe și planul de studiu.
                          </p>
                        </div>
                      </div>
                      
                      <Link
                        href="/diagnostic"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Începe Testul Diagnostic</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-[#161D30] border border-[#2B354F] rounded-3xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-blue-500" /> Copii Monitorizați
                </h3>
                <div className="bg-[#0B0F19] border border-gray-800 rounded-2xl p-4">
                  <p className="text-xs text-gray-400">
                    Contul este legat cu succes de profilul elevului. Te afli în panoul de control pentru părinți.
                  </p>
                  <p className="text-xs text-blue-400 font-bold mt-2">
                    Raportul de progres al elevului este în curs de dezvoltare.
                  </p>
                </div>
              </div>
            )}

            {/* Invitation Code Card for Student */}
            {profile.rol === "elev" && (
              <div className="bg-[#161D30] border border-[#2B354F] rounded-3xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Trimite progresul către părinți
                </h3>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Părintele tău se poate înregistra folosind codul de mai jos pentru a vedea statisticile și testele tale rezolvate.
                </p>

                <div className="flex items-center gap-2 bg-[#0B0F19] border border-[#2B354F] rounded-2xl p-3">
                  <code className="text-xs font-mono font-bold text-yellow-400 select-all flex-1 break-all">
                    {getInviteCode()}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="bg-[#161D30] hover:bg-blue-600 hover:text-white border border-[#2B354F] p-2 rounded-xl transition-all text-gray-400"
                    title="Copiază codul"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
