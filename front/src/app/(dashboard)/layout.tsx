"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import CustomerHeader from "./header"

export default function AdminLayout({children}: {children: React.ReactNode}) {
    
    const {token, loading} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(loading) {
            return
        }

        if(!token) {
            router.push("/")
        }
    }, [token, loading, router])

    if(loading || !token) {
        return null
    }

    return (
        <div>
            <CustomerHeader />
            {children}
        </div>
    )
}