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
    
        if(loading) return <p>loading...</p>
        if(!data) return <p>no data available</p>
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