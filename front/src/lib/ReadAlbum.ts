"use client"

import { AlbumType } from "@/types/type"
import { useEffect, useState } from "react"
import { api } from "./axios"

export const ReadAlbum = () => {

    const [albums, setAlbums] = useState<AlbumType[]>([])

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await api.get("/api/albums",
                    {
                        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                    }
                )
                setAlbums(response.data.albums)
            } catch {
                alert("データを取得できません")
            }
        }
        fetchAlbum()
    }, [])

    return {albums}
}