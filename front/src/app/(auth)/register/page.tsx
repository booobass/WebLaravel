"use client"

import { api } from "@/lib/axios"
import styles from "@/styles/auth.module.css"
import border from "@/styles/border.module.css"
import button from "@/styles/button.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Register = () => {

    const router = useRouter()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        slug: ""
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
                password_confirmation: user.password_confirmation,
                slug: user.slug
            })
            alert("ユーザー登録しました")
            router.push("/login")
            console.log(response)
        } catch {
            alert("ユーザ登録できません")
        }
    }

    return (
        <div className="wrapper">
            <div className={`${styles.main} max-w-[600px] w-full`}>
                <h2 className={`${border.gray_m} text-xl font-bold`}>ユーザー登録ページ</h2>
                <form onSubmit={handleSubmit} className={`mt-9`}>
                        <label className="block">ユーザー名
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                                className={`${styles.input} w-[180px] block`} />
                        </label>
                        <label className="block mt-3">メールアドレス
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
                        {user.password.length >= 6 || user.password.length === 0 ? null : (
                            <p>８文字以上で登録して下さい</p>
                        )}
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
                            <p>パスワードが一致しません</p>
                        )}
                        <label className="block mt-3">URL
                            <input
                                type="text"
                                name="slug"
                                value={user.slug}
                                onChange={handleChange}
                                required
                                className={`${styles.input} w-[180px] block`} />
                        </label>
                    <div className="mt-6">
                        <button className={`${button.submitBtn} mt-6 mr-6`}>登録</button>
                        <Link href={"/"} className={`${button.linkBtn}`}>キャンセル</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register