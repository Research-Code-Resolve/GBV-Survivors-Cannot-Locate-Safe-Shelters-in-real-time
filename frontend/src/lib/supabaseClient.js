import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Copy .env.example to .env.local and fill in your project URL and anon key."
  );
}

// This client uses the anon/public key only. It must never use the
// service_role key — RLS policies on the `reports` table are what keep
// this safe to ship in frontend code (insert-only, no read-back).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
