"use client"

import { api } from "@/lib/axios"
import { ReadAlbum } from "@/lib/ReadAlbum"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const UpdateAlbum = () => {

    const params = useParams()
    const id = params.id as string

    const {albums} = ReadAlbum()

    const singleAlbum = albums.find(e => String(e.id) === id)

    console.log("sA", singleAlbum)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState<File | string | null>(null)
    const [songs, setSongs] = useState([{title: "", track_number: ""}])

    console.log("upsong", songs)
    console.log("upimage", image)

    useEffect(() => {
        if(singleAlbum) {
            setTitle(singleAlbum.title)
            setImage(singleAlbum.image)
            setSongs(
                singleAlbum.songs.map((s) => ({
                    title: s.title,
                    track_number: String(s.track_number)
                }))
            )
        }
    }, [singleAlbum])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0) {
            setImage(acceptedFiles[0])
        }
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {"image/*": [".png", ".jpg", ".jpeg", ".gif"]},
        maxFiles: 1,
        maxSize: 2 * 1024 * 1024, //1KB 1024byte 1MB 1024 * 1024byte
        validator: (file) => {
            if(file.size > 2 * 1024 * 1024) {
                return {
                    code: "file-too-large",
                    message: "2MB以下のファイルのみアップロード出来ます"
                }
            }
            return null
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("title", title)
            if(image instanceof File) formData.append("image", image)
            songs.forEach((song, index) => {
                formData.append(`songs[${index}][title]`, song.title)
                formData.append(`songs[${index}][track_number]`, song.track_number)
            })
            const response = await api.patch(`/api/album/${id}`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            alert("更新しました")
            console.log(response.data)
        } catch {
            alert("更新できません")
        }
    }


    return (
        <div>
            <div>
                <h3>編集</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>現在の写真</p>
                        {typeof image === "string" && image && (
                            <div>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/images/${image}`}
                                    alt={`${image}`}
                                    width={80}
                                    height={80}
                                />                                   
                            </div>
                        )}
                    </div>
                    <label>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive}
                            <p>ここに画像をドロップして下さい</p>
                        </div>
                        {image && <p>選択した画像：{typeof image === "string" ? image : image?.name}</p>}
                    </label>
                    <label>アルバム名：
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required />
                    </label>
                    {songs.map((song, index) => (
                        <div key={index}>
                            <label>曲名：
                                <input
                                    type="text"
                                    value={song.title}
                                    onChange={(e) => {
                                        const newSongs = [...songs]
                                        newSongs[index].title = e.target.value
                                        setSongs(newSongs)
                                    }}
                                    required />
                            </label>
                            <label>曲順：
                                <input
                                    type="number"
                                    value={song.track_number}
                                    onChange={(e) => {
                                        const newSongs = [...songs]
                                        newSongs[index].track_number = e.target.value
                                    }}
                                    required />
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setSongs([...songs, {title: "", track_number: String(songs.length + 1)}])}
                        disabled={songs.length >= 6}
                    >
                        曲を追加
                    </button>
                    {songs.length >= 6 && <p>最大６曲までです</p>}
                    <button>更新</button>
                </form>
            </div>
        </div>
    )
    

}

export default UpdateAlbum