"use client"

import { AlbumType } from "@/types/type"
import { useCallback, useEffect, useState } from "react"
import { api } from "./axios"

export const ReadAlbum = () => {

    const [albums, setAlbums] = useState<AlbumType[]>([])
    const [loading, setLoading] = useState(true)

    const fetchAlbum = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get("/api/albums",
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            setAlbums(response.data.albums)
        } catch {
            alert("データを取得できません")
        } finally {
            setLoading(false)
        }
    }, []) 
    
    useEffect(() => {
        fetchAlbum()
    }, [fetchAlbum])

    return {albums, fetchAlbum, loading}
}