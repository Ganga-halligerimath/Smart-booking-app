"use client"  // ensures this runs only in the browser

import { createClient } from "@supabase/supabase-js"

// Read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Ensure variables exist
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or anon key is missing")
}

// Create client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
