"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Trees, Compass, ArrowRight, Lock, Check } from "lucide-react";

export default function ChooseTrackPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUserId(user.id);
      }
    }
    checkUser();
  }, [router]);

  // Seeded ID for Biologie B2
  const BIOLOGY_TRACK_ID = "00000000-0000-0000-0000-000000000001";

  const handleSelectTrack = async () => {
    if (!userId || !selectedTrack) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("users")
        .update({ traseu_activ_id: selectedTrack })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        alert("Eroare la selectarea traseului: " + error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      alert("A apărut o eroare neașteptată.");
      setLoading(false);
    }
  };

  const tracks = [
    {
      id: BIOLOGY_TRACK_ID,
      name: "Biologie B2",
      description: "Anatomie, genetică, fiziologie și ecologie pentru proba scrisă la alegere a profilului real/tehnologic.",
      active: true,
      icon: Trees,
    },
    {
      id: "matematica-m1",
      name: "Matematică M1 (În curând)",
      description: "Traseu complet de analiză, algebră și geometrie pentru profilul mate-info.",
      active: false,
      icon: Compass,
    },
    {
      id: "romana-real",
      name: "Limba Română (În curând)",
      description: "Eseuri structurate, gramatică și exerciții pentru Subiectul I, II și III.",
      active: false,
      icon: Compass,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B0F19]">
      <div className="w-full max-w-2xl bg-[#161D30] border border-[#2B354F] rounded-3xl p-8 shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Alege Traseul tău BacPilot</h1>
          <p className="text-sm text-gray-400 mt-2">
            Selectează disciplina pentru care dorești să începi pregătirea. Vei putea debloca și alte trasee ulterior.
          </p>
        </div>

        {/* Tracks List */}
        <div className="space-y-4 mb-8">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.id;
            
            return (
              <button
                key={track.id}
                type="button"
                disabled={!track.active}
                onClick={() => track.active && setSelectedTrack(track.id)}
                className={`w-full p-5 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                  !track.active
                    ? "opacity-50 cursor-not-allowed border-[#2B354F]/40 bg-[#111625]/50"
                    : isSelected
                    ? "border-blue-500 bg-blue-950/20"
                    : "border-[#2B354F] bg-[#111625] hover:border-gray-600"
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  !track.active 
                    ? "bg-gray-800 text-gray-500" 
                    : isSelected 
                    ? "bg-blue-600 text-white" 
                    : "bg-blue-900/20 text-blue-500"
                }`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-white">{track.name}</h3>
                    {!track.active ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold text-gray-500 bg-gray-900 px-2 py-0.5 rounded-md">
                        <Lock className="h-3 w-3" /> Blocat
                      </span>
                    ) : (
                      isSelected && (
                        <span className="bg-blue-600 text-white p-1 rounded-full">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{track.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleSelectTrack}
          disabled={loading || !selectedTrack}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-sm font-semibold transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <span>{loading ? "Se salvează..." : "Confirmă alegerea și intră în dashboard"}</span>
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}
