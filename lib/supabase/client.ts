import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase pentru componente client (browser).
 *
 * Cheile se citesc din variabilele de mediu:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Adaugă-le în `.env.local` (vezi `.env.example`).
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Lipsesc variabilele de mediu Supabase. Adaugă NEXT_PUBLIC_SUPABASE_URL și NEXT_PUBLIC_SUPABASE_ANON_KEY în .env.local"
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
