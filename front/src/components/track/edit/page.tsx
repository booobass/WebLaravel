"use client"

import AudioPlayer from "@/components/AudioPlayer"
import { api } from "@/lib/axios"
import { ReadTrack } from "@/lib/ReadTrack"
import button from "@/styles/button.module.css"
import modal from "@/styles/modal.module.css"
import Link from "next/link"
import { useState } from "react"

const EditTrack = () => {

    const {tracks, fetchTrack} = ReadTrack()

    const [selectedTrack, setSelectedTrack] = useState<number | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleDelete = async () => {
        if(!selectedTrack) return

        try {
            await api.delete(`/api/track/${selectedTrack}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("削除しました")
            setModalOpen(false)
            setSelectedTrack(null)
            fetchTrack()
        } catch {
            alert("削除できません")
        }
    }

    return (
        <div>
            <div className="mt-9 pb-6 border-b border-dashed">
                <h3 className="font-bold text-center">登録した音源</h3>
                {tracks.map((t) => (
                    <div key={t.id} className="mt-6">
                        <div className={`max-w-[300px] w-full justify-items-center p-3 border-4 border-double rounded-sm bg-[#fefefe]`}>
                            <div className="text-center">
                                <h4 className="text-xl border-b">{t.describe}</h4>
                                <h3 className="mt-2 text-2xl font-bold">{t.name}</h3>
                            </div>
                            <AudioPlayer src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/tracks/${t.audio_path}`} />
                        </div>
                        <div className="justify-items-center">
                            <div className="mt-3 flex gap-8">
                                <Link href={`/update/track/${t.id}`} className={`${button.linkBtn} block`}>編集</Link>
                                <button
                                    onClick={() => {
                                        setSelectedTrack(t.id)
                                        setModalOpen(true)
                                    }}
                                    className={`${button.submitBtn}`}>削除
                                </button>
                            </div>
                        </div>
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

export default EditTrack