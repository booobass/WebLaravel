"use client"

import AudioPlayer from "@/components/AudioPlayer"
import { api } from "@/lib/axios"
import { TrackType } from "@/types/type"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type UserTracks = {
    user: {
        id: number;
        slug: string;
    }
    tracks: TrackType[]
}

const ShowTrack = () => {
    
    const {slug} = useParams<{slug: string}>()

    const [data, setData] = useState<UserTracks | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!slug) return

        const fetchTracks = async () => {
            try {
                const response = await api.get(`/api/uuu/${slug}/tracks`)
                setData(response.data)
                console.log("track", response.data)
            } catch {
                alert("データを取得出来ません")
            } finally {
                setLoading(false)
            }
        }

        fetchTracks()
    }, [slug])

    if(loading) return <p>loading...</p>
    if(!data) return <p>no data available</p>

    return (
        <div>
            <div>
                <h2>音源</h2>
                <div>
                    {data.tracks.length === 0 ? (null) : (
                        <div className="flex justify-evenly">
                            {data.tracks.map((t) => (
                                <div
                                    key={t.id}
                                    className={`max-w-[300px] w-full border justify-items-center p-3`}
                                >
                                    <div className="text-center">
                                        <h4 className="text-xl border-b">{t.describe}</h4>
                                        <h3 className="mt-2 text-2xl font-bold">{t.name}</h3>
                                    </div>
                                    <AudioPlayer src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/tracks/${t.audio_path}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default ShowTrack