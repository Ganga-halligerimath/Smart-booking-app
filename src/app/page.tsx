"use client"

import { supabase } from "../lib/supabaseClient"

export default function Home() {
    const login = async () => {
        const redirectUrl = process.env.NEXT_PUBLIC_APP_URL 
            ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
            : `${window.location.origin}/dashboard`;
        
        console.log("Attempting login with redirect:", redirectUrl);
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: redirectUrl
            }
        });
        
        if (error) {
            console.error("Login error:", error);
        } else {
            console.log("Login initiated:", data);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <button 
                onClick={login}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 cursor-pointer">
                Login with Google
            </button>
        </div>
    )
}
