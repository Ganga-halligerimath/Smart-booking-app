

import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/src/lib/supabaseClient"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🔹 Dynamic CORS headers
  const origin = req.headers.origin; // get the website making the request
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin); // allow that website
    res.setHeader("Access-Control-Allow-Credentials", "true"); // allow cookies/session
  }

  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // Handle preflight request
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).end()

  // Get body
  const { title, url } = req.body
  if (!title || !url)
    return res.status(400).json({ error: "Missing title or url" })

  // Get Supabase session
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return res.status(401).json({ error: "Not logged in" })

  const userId = session.user.id

  // Insert bookmark
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ title, url, user_id: userId }])

  if (error) return res.status(400).json({ error: error.message })

  return res.status(200).json({ data })
}
