"use client"

import { api } from "@/lib/axios"
import { ReadAlbum } from "@/lib/ReadAlbum"
import button from "@/styles/button.module.css"
import modal from "@/styles/modal.module.css"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const EditAlbum = () => {

    const {albums, fetchAlbum} = ReadAlbum()

    const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleDelete = async () => {
        if(!selectedAlbum) return

        try {
            await api.delete(`/api/album/${selectedAlbum}`,
                {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("削除しました")
            setModalOpen(false)
            setSelectedAlbum(null)
            fetchAlbum()
        } catch {
            alert("削除できません")
        }
    }

    return (
        <div>
            <div className="mt-6 pb-6 border-b border-dashed">
                <h3 className="font-bold text-center">登録したアルバム</h3>
                {albums.map((a) => (
                    <div key={a.id} className="mt-3 justify-items-center">
                        <div>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/images/${a.image}`}
                                alt={a.title}
                                width={80}
                                height={80}
                                priority
                                />
                        </div>
                        <p className="text-xl mt-3">{a.title}</p>
                        <ul>
                            {a.songs.map((as) => (
                                <li key={as.id}>{as.track_number}. {as.title}</li>
                            ))}
                        </ul>
                        <div className="mt-3 flex gap-8">
                            <Link href={`update/album/${a.id}`} className={`${button.linkBtn} block`}>編集</Link>
                            <button
                                onClick={() => {
                                    setSelectedAlbum(a.id)
                                    setModalOpen(true)
                                }}
                                className={`${button.submitBtn}`}
                            >削除</button>
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen && (
                <div className={`${modal.overlay}`}>
                    <div className={`${modal.modal}`}>
                        <p>本当に削除しますか？</p>
                        <div className="flex justify-around mt-6">
                            <button onClick={handleDelete} className={`${button.submitBtn}`}>削除</button>
                            <button onClick={() => setModalOpen(false)} className={`${button.linkBtn}`}>キャンセル</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditAlbum