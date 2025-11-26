"use client"

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

const ShowProfile = () => {

    const {slug} = useParams<{slug: string}>()

    const [data, setData] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)



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
        <div>
            <div className="h-30">
                {(!data.profiles) ? (null) : (
                    <div>
                        <h1>{data.profiles[0].homepage_name}</h1>
                        <p>{data.profiles[0].description}</p>
                        <p>test</p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default ShowProfile