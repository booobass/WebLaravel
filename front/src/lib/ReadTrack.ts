"use client"

import { TrackType } from "@/types/type"
import { useEffect, useState } from "react"
import { api } from "./axios"

export const ReadTrack = () => {

    const [tracks, setTracks] = useState<TrackType[]>([])

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const response = await api.get("/api/tracks",
                    {
                        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                    }
                )
                setTracks(response.data.tracks)
            } catch {
                alert("データを取得できません")
            }
        }
        fetchTrack()
    }, [])

    return {tracks}
}