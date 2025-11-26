"use client"

import { ProfileType } from "@/types/type"
import { useEffect, useState } from "react"
import { api } from "./axios"

export const ReadProfile = () => {

    const [prof, setProf] = useState<ProfileType[]>([])

    useEffect(() => {
        const fetchProf = async () => {
            try {
                const response = await api.get("/api/profiles",
                    {
                        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                    }
                )
                setProf(response.data.profiles)
            } catch {
                alert("データを取得出来ません")
            }
        }
        fetchProf()
    }, [])

    return {prof}
}