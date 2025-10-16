"use client"

import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        password_confirmation: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const {login} = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await api.post("/api/login", {
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation
            })
            console.log(response.data)
            const token = await response.data.token
            localStorage.setItem("token", token)
            alert("ログインしました")
            login(token)
            router.push("/customer")
        } catch {
            alert("ログインできません")
        }
    }

    return (
        <div className="wrapper">
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
                    <label>パスワード確認：
                        <input
                            type="text"
                            name="password_confirmation"
                            value={user.password_confirmation}
                            onChange={handleChange}
                            required />
                    </label>
                    {user.password === user.password_confirmation ? null : (
                        <p>パスワードが一致しません</p>
                    )}
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