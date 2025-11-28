"use client"

import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/axios"
import { useRouter } from "next/navigation"

const DemoLogin = () => {

    const router = useRouter()

    const {login} = useAuth()

    const handleUserLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("api/login", {
                email: "test@example.com",
                password: "test1234",
                password_confirmation: "test1234"
            })
            const token = await response.data.token
            const slug = await response.data.user.slug
            localStorage.setItem("token", token)
            alert("ログインしました")
            login(token, slug)
            router.push("/welcome")
        } catch {
            alert("ログインできません")
        }
    }

    return (
        <div className="justify-cotent-center">
            <button
                onClick={handleUserLogin}
                className="border rounded-lg p-3 bg-gray-700 text-white text-lg italic font-bold cursor-pointer"
            >デモユーザーでログイン</button>
        </div>
    )
}

export default DemoLogin