"use client"

import { api } from "@/lib/axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Register = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        name: "",
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
            const response = await api.post("/api/register", {
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.password
            })
            alert("ユーザー登録しました")
            router.push("/login")
            console.log(response)
        } catch {
            alert("ユーザ登録できません")
        }
    }

    return (
        <div>
            <div>
                <h2>ユーザー登録ページ</h2>
                <form onSubmit={handleSubmit}>
                    <label>ユーザー名：
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required />
                    </label>
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
                    <button>登録</button>
                </form>
                <div>
                    <Link href={"/"}>トップページに戻る</Link>
                </div>
            </div>
        </div>
    )
}

export default Register