"use client"

import { supabase } from "../lib/supabaseClient"

export default function Home() {
    const login =async()=>{
    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
        }
    })
}

return (
    <div className="flex h-screen items-center justify-center">
        <button 
        onClick={login}
        className="bg-blue-500 text-white px-6 py-3 rounded-1g">
            Login with Google
        </button>
    </div>
)
}