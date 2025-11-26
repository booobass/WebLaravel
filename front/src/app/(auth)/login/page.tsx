"use client"

import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/axios"
import styles from "@/styles/auth.module.css"
import button from "@/styles/button.module.css"
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
            // await api.get('/sanctum/csrf-cookie')
            const response = await api.post("/api/login", {
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation
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
        <div>
            <div>
                <form onSubmit={handleSubmit} className="mt-9">
                    <label className="block">メールアドレス
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className={`${styles.input} w-[180px] block`} />
                    </label>
                    <label className="block mt-3">パスワード
                        <input
                            type="text"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            className={`${styles.input} w-[180px] block`} />
                    </label>
                    <label className="block mt-3">パスワード確認
                        <input
                            type="text"
                            name="password_confirmation"
                            value={user.password_confirmation}
                            onChange={handleChange}
                            required
                            className={`${styles.input} w-[180px] block`} />
                    </label>
                    {user.password === user.password_confirmation ? null : (
                        <p className="text-sm text-red-600">パスワードが一致しません</p>
                    )}
                    <div className="mt-6">
                        <button className={`${button.submitBtn} mr-6`}>ログイン</button>
                        <Link href={"/"} className={`${button.linkBtn}`}>キャンセル</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login