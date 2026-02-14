"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../lib/supabaseClient"

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            const { data, error } = await supabase.auth.getSession()
            
            if (error) {
                console.error("Auth callback error:", error)
                router.push("/")
                return
            }

            if (data.session) {
                console.log("Session established:", data.session.user.email)
                router.push("/dashboard")
            } else {
                console.log("No session found")
                router.push("/")
            }
        }

        handleCallback()
    }, [router])

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Completing login...</p>
            </div>
        </div>
    )
}
