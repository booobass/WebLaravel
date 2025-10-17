"use client"

import { createContext, useContext, useEffect, useState } from "react";

type Props = {
    token: string | null;
    slug: string | null;
    loading: boolean;
    login: (token: string, slug: string) => void;
    logout: () => void
}

const AuthContext = createContext<Props | undefined>(undefined)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [slug, setSlug] = useState<string | null>(null)

    useEffect(() => {
        try {
            const storeToken = localStorage.getItem("token")
            const storeSlug = localStorage.getItem("slug")
            if(storeToken && storeSlug) {
                setToken(storeToken)
                setSlug(JSON.parse(storeSlug))
            }
        } catch (e) {
            console.error("Failed to parse user from localStorage", e)
        } finally {
            setLoading(false)
        }
    }, [])

    const login = (token: string, slug: string) => {
        localStorage.setItem("token", token)
        localStorage.setItem("slug", JSON.stringify(slug))
        setToken(token)
        setSlug(slug)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("slug")
        setToken(null)
        setSlug(null)
    }

    return (
        <AuthContext.Provider value={{token, slug, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}