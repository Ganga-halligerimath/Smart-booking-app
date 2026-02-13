"use client"  // critical to avoid server-side pre-render issues

import { useEffect } from "react"
import { supabase } from "@/src/lib/supabaseClient"

// Optional: force Next.js to not pre-render
export const dynamic = "force-dynamic"

export default function BookmarkletPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const url = params.get("url")
    const title = params.get("title")

    if (!url || !title) {
      alert("Missing URL or title")
      return
    }

    const addBookmark = async () => {
      // Get user session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return alert("Not logged in")

      const userId = session.user.id

      // Insert bookmark
      const { error } = await supabase
        .from("bookmarks")
        .insert([{ title, url, user_id: userId }])

      alert(error ? "Failed to add bookmark" : "Bookmark added!")

      // Close the bookmarklet window
      window.close()
    }

    addBookmark()
  }, [])

  return <div>Adding bookmark...</div>
}
