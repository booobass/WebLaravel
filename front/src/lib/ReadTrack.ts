"use client"

import { TrackType } from "@/types/type"
import { useCallback, useEffect, useState } from "react"
import { api } from "./axios"

export const ReadTrack = () => {

    const [tracks, setTracks] = useState<TrackType[]>([])

    const fetchTrack = useCallback(
        async () => {
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
    }, []) 

    useEffect(() => {
        fetchTrack()
    }, [fetchTrack])

    return {tracks, fetchTrack}
}