import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/src/lib/supabaseClient"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers

  const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"; // Add your deployed URL here
  res.setHeader("Access-Control-Allow-Origin",allowedOrigin)
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
   res.setHeader("Access-Control-Allow-Credentials", "true"); 

  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).end()



  const { title, url } = req.body;
  if (!title || !url)
    return res.status(400).json({ error: "Missing title or url" })
   const { data: { session } } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: "Not logged in" });

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ title, url, user_id: userId }]);

  

  if (error) return res.status(400).json({ error: error.message })

  return res.status(200).json({ data })
}
