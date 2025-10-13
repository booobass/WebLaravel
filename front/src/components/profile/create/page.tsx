"use client"

import { api } from "@/lib/axios"
import { useState } from "react"

const CreateProfile = () => {

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
        } catch {
            alert("データを登録出来ません")
        }
    }

    return (
        <div>
            <div>
                <h2>ホームーページ情報登録</h2>
                <form onSubmit={handleSubmit}>
                    <label>ホームページ名：
                        <input
                            type="text"
                            name="homepage_name"
                            value={data.homepage_name}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>ホームページの説明：
                        <input
                            type="text"
                            name="description"
                            value={data.description}
                            onChange={handleChange} />
                    </label>
                    <label>
                        <input
                            type="color"
                            name="background_color"
                            value={data.background_color}
                            onChange={handleChange} />
                    </label>
                    <button>登録</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProfile