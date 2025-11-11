"use client"

import { api } from "@/lib/axios"
import { ReadTrack } from "@/lib/ReadTrack"
import button from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const UpdateTrack = () => {

    const router = useRouter()

    const params = useParams()
    const id = params.id as string

    const {tracks} = ReadTrack()

    const singleTrack = tracks.find(e => String(e.id) === id)

    const [update, setUpdate] = useState({
        name: "",
        describe: ""
    })
    const [audio, setAudio] = useState<File | string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(singleTrack) {
            setUpdate({
                name: singleTrack.name,
                describe: singleTrack.describe
            })
            setAudio(singleTrack.audio_path)
        }
    }, [singleTrack])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0) {
            setAudio(acceptedFiles[0])
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'audio/*': [".mp3", ".wav", ".m4a"]
        },
        maxFiles: 1,
        maxSize: 8 * 1024 * 1024,
        validator: (file) => {
            if(file.size > 8 * 1024 * 1024) {
                return {
                    code: "file-too-large",
                    message: "8MB以下のファイルのみアップロード出来ます"
                }
            }
            return null
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", update.name)
        formData.append("describe", update.describe)
        if(audio instanceof File) formData.append("audio_path", audio)
        try {
            await api.post(`/api/track/${id}`,
                formData,
                {
                    headers: {
                        'X-HTTP-Method-Override': 'PATCH',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            alert("更新しました")
            router.push("/customer#track")
        } catch {
            alert("更新できません")
        }
    }

    return (
        <div className="wrapper">
            <div className={`${styles.main}`}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <div {...getRootProps()} className={`${styles.drop}`}>
                            <input {...getInputProps()} />
                            {isDragActive}
                            <p>音源を変更する場合<br/>ここにドロップして下さい</p>
                        </div>
                    </label>
                    <label className="block mt-3">音源の説明
                        <input
                            type="text"
                            name="describe"
                            value={update.describe}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">音源の名前
                        <input
                            type="text"
                            name="name"
                            value={update.name}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <div className="flex gap-8 mt-6">
                        <button className={`${button.submitBtn}`}>更新</button>
                        <Link href={"/customer"} className={`${button.linkBtn}`}>キャンセル</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateTrack