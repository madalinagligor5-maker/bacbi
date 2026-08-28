"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isMocked } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.replace("/login");
          return;
        }

        // Fetch user profile from database
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!profile) {
          router.replace("/login");
          return;
        }

        if (profile.rol === "elev") {
          if (!profile.traseu_activ_id) {
            router.replace("/choose-track");
          } else {
            router.replace("/dashboard");
          }
        } else {
          // Parent goes straight to dashboard
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Error during routing:", err);
        router.replace("/login");
      }
    }

    checkAuth();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-sm text-gray-400 mt-4">Se verifică autentificarea...</p>
      
      {isMocked && (
        <span className="mt-8 bg-blue-900/40 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-800">
          Mod offline / Mock activ
        </span>
      )}
    </div>
  );
}
