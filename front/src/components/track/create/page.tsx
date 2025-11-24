"use client"

import { api } from "@/lib/axios"
import button from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const CreateTrack = () => {

    const router = useRouter()

    const [data, setData] = useState({
        name: "",
        describe: ""
    })
    const [audio, setAudio] = useState<File | null>(null)
    const [trackCount, setTrackCount] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const response = await api.get("/api/tracks",
                    {
                        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                    }
                )
                console.log("data", response.data.tracks.length)
                setTrackCount(response.data.tracks.length)
            } catch {
                alert('トラックデータ取得できません')
            }
        }
        fetchTrack()
    }, [])

    console.log("audio", audio)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

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
        
        if (trackCount >= 3) {
            alert("3曲までしか登録できません")
            return
        }
        
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("describe", data.describe)
            if(audio) formData.append("audio_path", audio)

            await api.post("/api/track/store",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            alert("音源を登録しました")
            router.push("/customer")
        } catch {
            alert("音源を登録できませんでした。");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="wrapper">
            <div className={`${styles.main}`}>
                <h4 className="text-xl font-bold">音源登録</h4>
                <form onSubmit={handleSubmit} className="mt-6">
                    <label>
                        <div {...getRootProps()} className={`${styles.drop}`}>
                            <input {...getInputProps()} />
                            {isDragActive}
                            <p>ここに音源をドロップして下さい</p>
                        </div>
                        {audio && <p>選択した画像：{audio.name}</p>}
                    </label>
                    <label className="block mt-3">音源の説明
                        <input
                            type="text"
                            name="describe"
                            value={data.describe}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">音源の名前
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <button
                        className={`${button.submitBtn} block mt-6`}
                        disabled={loading}
                    >{loading ? "登録中..." : "登録"}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTrack