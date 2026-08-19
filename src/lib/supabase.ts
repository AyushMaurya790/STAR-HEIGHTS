import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://sryjzqhnuilfadterplj.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_4s8H-0T09eGDjqzwWfJpIQ_cQsUhZ1F";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);