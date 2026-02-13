import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/src/lib/supabaseClient"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🔹 CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // 🔹 Handle preflight request
  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { title, url, user_id } = req.body
  if (!title || !url || !user_id)
    return res.status(400).json({ error: "Missing title, url, or user_id" })

  // Insert into Supabase
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ title, url, user_id }])

  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ data })
}
