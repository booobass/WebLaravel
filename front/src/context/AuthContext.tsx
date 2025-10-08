"use client"

import { createContext, useContext, useEffect, useState } from "react";

type Props = {
    token: string | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void
}

const AuthContext = createContext<Props | undefined>(undefined)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const storeToken = localStorage.getItem("token")
            if(storeToken) {
                setToken(storeToken)
            }
        } catch (e) {
            console.error("Failed to parse user from localStorage", e)
        } finally {
            setLoading(false)
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem("token", token)
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{token, loading, login, logout}}>
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