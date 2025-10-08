"use client"

import { api } from "@/lib/axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/login", {
                email: user.email,
                password: user.password,
                password_confirmation: user.password
            })
            console.log(response.data)
            const token = await response.data.token
            localStorage.setItem("token", token)
            alert("ログインしました")
            router.push("/")
        } catch {
            alert("ログインできません")
        }
    }

    return (
        <div>
            <div>
                <h2>ログインページ</h2>
                <form onSubmit={handleSubmit}>
                    <label>メールアドレス：
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>パスワード：
                        <input
                            type="text"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required />
                    </label>
                    <button>ログイン</button>
                </form>
                <div>
                    <Link href={"/"}>トップページに戻る</Link>
                </div>
            </div>
        </div>
    )
}

export default Login