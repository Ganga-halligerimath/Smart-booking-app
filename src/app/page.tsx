"use client"

import { supabase } from "../lib/supabaseClient"

export default function Home() {
    const login = async () => {
        const redirectUrl = process.env.NEXT_PUBLIC_APP_URL 
            ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
            : `${window.location.origin}/dashboard`;
        
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: redirectUrl
            }
        })
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <button 
                onClick={login}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                Login with Google
            </button>
        </div>
    )
}