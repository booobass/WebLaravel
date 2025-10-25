"use client"

import ShowAlbum from "@/components/album/show/page"
import ShowGig from "@/components/gig/show/page"
import ShowTrack from "@/components/track/show/page"
import { api } from "@/lib/axios"
import { ProfileType } from "@/types/type"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type UserProfile = {
    user: {
        id: number;
        slug: string;
    }
    profiles: ProfileType[]
}


const MyWebPage = () => {
    const {slug} = useParams<{slug: string}>()
    
        const [data, setData] = useState<UserProfile | null>(null)
        const [loading, setLoading] = useState(true)
    
        console.log("prof", data)
    
    
        useEffect(() => {
            if(!slug) return
    
            const fetchProfile = async () => {
                try {
                    const response = await api.get(`/api/uuu/${slug}/profiles`)
                    setData(response.data)
                } catch {
                    alert("データを取得出来ません")
                } finally {
                    setLoading(false)
                }
            }
    
            fetchProfile()
        }, [slug])
    
        if(loading) return <p className="flex justify-center items-center h-screen text-xl font-bold bg-gray-100">loading...</p>
        if(!data) return <p className="flex justify-center items-center h-screen text-xl font-bold bg-gray-100">no data available</p>
        if (!data.profiles || data.profiles.length === 0) return <p className="flex justify-center items-center h-screen text-xl font-bold bg-gray-100">ホームページ情報を登録して下さい。</p>

    return (
        <div
            className={`justify-items-center pt-8`}
            style={{ backgroundColor: data.profiles[0].background_color }}
        >
            <h1 className={`text-3xl font-bolod`}>{data.profiles[0].homepage_name}</h1>
            <p className="mt-3 border-b">{data.profiles[0]?.description}</p>
            <ShowAlbum />
            <ShowTrack />
            <ShowGig />
        </div>
    )
}

export default MyWebPage