"use client"

import { api } from "@/lib/axios"
import { ReadProfile } from "@/lib/ReadProfile"
import button from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import Link from "next/link"
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
        <div className="wrapper">
            <div className={`${styles.main}`}>
                <form onSubmit={handleSubmit}>
                    <label className="block">ホームページ名
                        <input
                            type="text"
                            name="homepage_name"
                            value={update.homepage_name}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">ホームページの説明
                        <input
                            type="text"
                            name="description"
                            value={update.description}
                            onChange={handleChange}
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">ホームページの背景色
                        <input
                            type="color"
                            name="background_color"
                            value={update.background_color}
                            onChange={handleChange}
                            className={`${styles.input}`} />
                    </label>
                    <div className="flex gap-8 mt-6">
                        <button className={`${button.submitBtn}`}>変更</button>
                        <Link href={"/customer"} className={`${button.linkBtn}`}>キャンセル</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile