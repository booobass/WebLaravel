"use client"

import { api } from "@/lib/axios"
import { ReadProfile } from "@/lib/ReadProfile"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const UpdateProfile = () => {

    const params = useParams()
    const id = params.id as string

    const {prof} = ReadProfile()

    const singleProf = prof.find((e) => String(e.id) === id)

    const [update, setUpdate] = useState({
        homepage_name: "",
        description: "",
        background_color: ""
    })

    console.log("up", update)
    useEffect(() => {
        if(singleProf) {
            setUpdate({
                homepage_name: singleProf.homepage_name,
                description: singleProf.description,
                background_color: singleProf.background_color,
            })
        }
    }, [singleProf])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.patch(`/api/profile/${id}`,
                {
                    homepage_name: update.homepage_name,
                    description: update.description,
                    background_color: update.background_color
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            alert("更新しました")
        } catch {
            alert("更新できません")
        }
    }

    return (
        <div>
            <div>
                <h3>編集</h3>
                <form onSubmit={handleSubmit}>
                    <label>ホームページ名：
                        <input
                            type="text"
                            name="homepage_name"
                            value={update.homepage_name}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>ホームページの説明
                        <input
                            type="text"
                            name="description"
                            value={update.description}
                            onChange={handleChange} />
                    </label>
                    <label>
                        <input
                            type="color"
                            name="background_color"
                            value={update.background_color}
                            onChange={handleChange} />
                    </label>
                    <button>変更</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile