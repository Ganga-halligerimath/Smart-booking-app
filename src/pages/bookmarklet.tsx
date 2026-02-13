"use client"
import { useEffect } from "react"
import { supabase } from "@/src/lib/supabaseClient"

export default function BookmarkletPage() {
  useEffect(() => {
    const url = new URLSearchParams(window.location.search).get("url")
    const title = new URLSearchParams(window.location.search).get("title")

    if (!url || !title) {
      alert("Missing URL or title")
      return
    }

    const addBookmark = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return alert("Not logged in")

      const userId = session.user.id
      const { error } = await supabase.from("bookmarks").insert([{ title, url, user_id: userId }])
      alert(error ? "Failed to add bookmark" : "Bookmark added!")
      window.close()
    }

    addBookmark()
  }, [])

  return <div>Adding bookmark...</div>
}
