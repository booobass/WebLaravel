"use client"

import { api } from "@/lib/axios"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

const CreateTrack = () => {

    const [data, setData] = useState({
        name: "",
        describe: ""
    })
    const [audio, setAudio] = useState<File | null>(null)

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
        try {
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
        } catch {
            alert("音源を登録できませんでした。");
        }
    }

    return (
        <div>
            <div>
                <h4>音源登録</h4>
                <form onSubmit={handleSubmit}>
                    <label>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive}
                            <p>ここに音源をドロップして下さい</p>
                        </div>
                        {audio && <p>選択した画像：{audio.name}</p>}
                    </label>
                    <label>音源の説明：
                        <input
                            type="text"
                            name="describe"
                            value={data.describe}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>音源の名前：
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required />
                    </label>
                    <button>登録</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTrack