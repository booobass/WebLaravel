"use client"

import { GigType } from "@/types/type"
import { useCallback, useEffect, useState } from "react"
import { api } from "./axios"

export const ReadGig = () => {

    const [gigs, setGigs] = useState<GigType[]>([])

    const fetchGig = useCallback(async () => {
        try {
            const response = await api.get("/api/gigs",
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            setGigs(response.data.gigs)
        } catch {
            alert("データを取得できません")
        }           
    }, []) 

    useEffect(() => {
        fetchGig()
    }, [fetchGig])

    return {gigs, fetchGig}
}