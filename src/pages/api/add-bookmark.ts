// import type { NextApiRequest, NextApiResponse } from "next"
// import { supabase } from "@/src/lib/supabaseClient"

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") return res.status(405).end()

//   const { title, url } = req.body
//   if (!title || !url) return res.status(400).json({ error: "Missing title or URL" })

//   // Get current logged-in user
//   const { data: { session }, error: sessionError } = await supabase.auth.getSession()
//   if (sessionError || !session) return res.status(401).json({ error: "Unauthorized" })

//   const userId = session.user.id

//   const { data, error } = await supabase.from("bookmarks").insert([{ title, url, user_id: userId }])

//   if (error) return res.status(400).json({ error: error.message })

//   return res.status(200).json({ data })
// }




import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/src/lib/supabaseClient"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 🔹 CORS headers (allow any site to call your API)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // 🔹 Handle preflight OPTIONS request
  if (req.method === "OPTIONS") return res.status(200).end()

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { title, url, user_id } = req.body
  if (!title || !url || !user_id) {
    return res.status(400).json({ error: "Missing title, url, or user_id" })
  }

  // Insert into Supabase
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ title, url, user_id }])

  if (error) return res.status(400).json({ error: error.message })

  return res.status(200).json({ data })
}
