"use client"

import { api } from "@/lib/axios"
import { ReadAlbum } from "@/lib/ReadAlbum"
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
            <div>
                {albums.map((a) => (
                    <div key={a.id}>
                        <p>{a.title}</p>
                        <div>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/images/${a.image}`}
                                alt={a.title}
                                width={80}
                                height={80}
                                priority
                                />
                        </div>
                        <ul>
                            {a.songs.map((as) => (
                                <li key={as.id}>{as.track_number}. {as.title}</li>
                            ))}
                        </ul>
                        <div>
                            <Link href={`update/album/${a.id}`}>編集</Link>
                            <button
                                onClick={() => {
                                    setSelectedAlbum(a.id)
                                    setModalOpen(true)
                                }}
                            >削除</button>
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

export default EditAlbum