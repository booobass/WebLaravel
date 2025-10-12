"use client"

import { api } from "@/lib/axios";
import { GigType } from "@/types/type";
import { formatBand, formatDateWithDay, formatDj, formatTime } from "@/utils/formatters";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type UserGigs = {
    user: {
        id: number;
        slug: string;
    }
    gigs: GigType[]
}

const ShowGig = () => {

    const {slug} = useParams<{slug: string}>()

    const [data, setData] = useState<UserGigs | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!slug) return

        const fetchGigs = async () => {
            try {
                const response = await api.get(`/api/uuu/${slug}/gigs`)
                setData(response.data)
                console.log("gig", response.data)
            } catch {
                alert("データを取得出来ません")
            } finally {
                setLoading(false)
            }
        }
        fetchGigs()
    }, [slug])

    if(loading) return <p>loading...</p>
    if(!data) return <p>no data available</p>

    return (
        <div>
            <div>
                <h2>ライブ</h2>
                {data.gigs.length === 0 ? (
                    <p>登録されていません</p>
                ) : (
                    <div>
                        {data.gigs.map((g) => (
                            <div key={g.id}>
                                <p>{formatDateWithDay(g.date)}@{g.place}</p>
                                <div>
                                    <p>{formatBand(g.bands)}</p>
                                </div>
                                <div>
                                    {(!g.djs) ? (null) : (
                                        <p>{formatDj(g.djs)}</p>
                                    )}
                                    
                                </div>
                                <div>
                                    <p>open: {formatTime(g.open_time)} / start: {formatTime(g.start_time)}</p>
                                </div>
                                <div className="flex">
                                    <p>adv. ¥{g.adv_price} / day. ¥{g.day_price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )

}

export default ShowGig