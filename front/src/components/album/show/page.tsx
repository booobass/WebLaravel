"use client"

import { api } from "@/lib/axios"
import { AlbumType } from "@/types/type"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type UserAlbums = {
    user: {
        id: number;
        slug: string;
    }
    albums: AlbumType[]
}

const ShowAlbum = () => {

    const {slug} = useParams<{slug: string}>()

    const [data, setData] = useState<UserAlbums | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!slug) return

        const fetchAlbums = async () => {
            try {
                const response = await api.get(`/api/uuu/${slug}/albums`)
                setData(response.data)
                console.log(response.data)
                console.log(response.data.albums)
            } catch {
                alert("データを取得出来ません")
            } finally {
                setLoading(false)
            }
        }

        fetchAlbums()
    }, [slug])

    if(loading) return <p>loading...</p>
    if(!data) return <p>no data available</p>

    return (
        <div>
            <div>
                <h2>アルバム</h2>
                {data.albums.length === 0 ? (
                    <p>登録されていません</p>
                ) : (
                    <div>
                        {data.albums.map((a) => (
                            <div key={a.id}>
                                <h3>{a.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowAlbum