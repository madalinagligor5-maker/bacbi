"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isMocked } from "@/lib/supabase";
import { Shield, Mail, Lock, UserPlus, Users } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState<"elev" | "parinte">("elev");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. If role is parent, check the invite code before registering
      let targetStudentId = "";
      if (rol === "parinte") {
        if (!inviteCode.startsWith("BP-")) {
          setError("Codul de invitație trebuie să înceapă cu 'BP-'. Ex: BP-student@exemplu.ro");
          setLoading(false);
          return;
        }

        const studentEmail = inviteCode.replace("BP-", "").trim();
        
        // Find the student profile in Supabase/Mock
        const { data: studentProfile, error: searchError } = await supabase
          .from("users")
          .select("*")
          .eq("email", studentEmail)
          .single();

        if (searchError || !studentProfile) {
          setError("Nu s-a găsit niciun elev înregistrat cu acest email/cod.");
          setLoading(false);
          return;
        }

        if (studentProfile.rol !== "elev") {
          setError("Codul introdus aparține unui cont care nu este de elev.");
          setLoading(false);
          return;
        }

        targetStudentId = studentProfile.id;
      }

      // 2. Sign up user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            rol: rol,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      const newUserId = data.user.id;

      // 3. For Supabase, if metadata trigger is not active, we insert into public.users
      // (The mock client automatically inserts, but we do it safely anyway)
      const { error: profileError } = await supabase
        .from("users")
        .insert([{
          id: newUserId,
          email,
          rol,
          creat_la: new Date().toISOString()
        }]);

      // 4. Create linkage if parent
      if (rol === "parinte" && targetStudentId) {
        const { error: linkError } = await supabase
          .from("parinte_elev_link")
          .insert([{
            parinte_id: newUserId,
            elev_id: targetStudentId,
            cod_invitatie: inviteCode
          }])
          .select()
          .single();

        if (linkError) {
          console.error("Link error:", linkError);
        }
      }

      // 5. Route to appropriate screen
      if (rol === "elev") {
        router.push("/choose-track");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "A apărut o eroare la înregistrare.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0F19]">
      <div className="w-full max-w-md bg-[#161D30] border border-[#2B354F] rounded-3xl p-8 shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex bg-blue-600/10 text-blue-500 p-3 rounded-2xl mb-3">
            <UserPlus className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">Înregistrare BacPilot</h2>
          <p className="text-sm text-gray-400 mt-1">Creează un cont nou pentru studiu sau monitorizare</p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="bg-red-900/30 text-red-400 border border-red-800 text-xs p-3 rounded-2xl mb-4">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Role selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Sunt:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRol("elev")}
                className={`py-2 rounded-2xl text-xs font-bold transition-all border ${
                  rol === "elev"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-[#0B0F19] border-[#2B354F] text-gray-400 hover:text-white"
                }`}
              >
                Elev
              </button>
              <button
                type="button"
                onClick={() => setRol("parinte")}
                className={`py-2 rounded-2xl text-xs font-bold transition-all border ${
                  rol === "parinte"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-[#0B0F19] border-[#2B354F] text-gray-400 hover:text-white"
                }`}
              >
                Părinte
              </button>
            </div>
          </div>

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

          {/* Conditional Invitation code input for parents */}
          {rol === "parinte" && (
            <div className="animate-in slide-in-from-top-2 duration-150">
              <label className="block text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-1.5">
                Cod Invitație Elev (Format: BP-email)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-yellow-800/60 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-white rounded-2xl pl-10 pr-4 py-2.5 text-sm"
                  placeholder="BP-elev@exemplu.ro"
                />
                <Users className="absolute left-3 top-3 h-4.5 w-4.5 text-yellow-600" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 pl-1">
                Elevul își poate copia codul de invitație din contul său de studiu.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-sm font-semibold transition-colors active:scale-[0.99] disabled:opacity-50 mt-2"
          >
            {loading ? "Se înregistrează..." : "Creează cont"}
          </button>
        </form>

        <div className="text-center mt-5 pt-4 border-t border-[#2B354F]/50">
          <p className="text-xs text-gray-400">
            Ai deja un cont?{" "}
            <Link href="/login" className="text-blue-400 hover:underline font-semibold">
              Conectează-te
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
