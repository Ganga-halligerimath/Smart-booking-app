"use client"  // ensures it runs only in client-side environment

import { createClient } from "@supabase/supabase-js"

// Read env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if variables exist
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or anon key is missing")
}

// Create client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: { eventsPerSecond: 10 },
  },
})
