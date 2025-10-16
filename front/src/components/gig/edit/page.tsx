"use client"

import { api } from "@/lib/axios"
import { ReadGig } from "@/lib/ReadGig"
import modal from "@/styles/modal.module.css"
import { formatBand, formatDateWithDay, formatDj, formatTime } from "@/utils/formatters"
import Link from "next/link"
import { useState } from "react"

const EditGig = () => {

    const {gigs, fetchGig} = ReadGig()

    const [selectedGig, setSeletctedGid] = useState<number | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleDelete = async () => {
        if(!selectedGig) return

        try {
            await api.delete(`/api/gig/${selectedGig}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("削除しました")
            setModalOpen(false)
            setSeletctedGid(null)
            fetchGig()
        } catch {
            alert("削除できません")
        }
    }

    return (
        <div>
            <div>
                {gigs.map((g) => (
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
                        <Link href={`/update/gig/${g.id}`}>編集</Link>
                        <button
                            onClick={() => {
                                setSeletctedGid(g.id)
                                setModalOpen(true)
                            }}
                        >削除</button>
                    </div>
                ))}
            </div>
            {modalOpen && (
                <div className={`${modal.overlay}`}>
                    <div className={`${modal.modal}`}>
                        <p>本当に削除しますか？</p>
                        <button onClick={handleDelete}>削除</button>
                        <button onClick={() => setModalOpen(false)}>キャンセル</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditGig