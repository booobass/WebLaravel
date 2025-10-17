"use client"

import { api } from "@/lib/axios"
import button from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CreateProfile = () => {

    const router = useRouter()

    const [data, setData] = useState({
        homepage_name: "",
        description: "",
        background_color: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await api.post("/api/profile/store",
                {
                    homepage_name: data.homepage_name,
                    description: data.description,
                    background_color: data.background_color
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            alert("データを登録しました")
            router.push("/create")
        } catch {
            alert("データを登録出来ません")
        }
    }

    return (
        <div className="wrapper">
            <div className={`${styles.main}`}>
                <h2 className="text-xl font-bold">ホームーページ情報登録</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <label className="block">ホームページ名
                        <input
                            type="text"
                            name="homepage_name"
                            value={data.homepage_name}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">ホームページの説明
                        <input
                            type="text"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">ホームページの背景色
                        <input
                            type="color"
                            name="background_color"
                            value={data.background_color}
                            onChange={handleChange}
                            className={`${styles.input}`} />
                    </label>
                    <button className={`${button.submitBtn} mt-6`}>登録</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProfile