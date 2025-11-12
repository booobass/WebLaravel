"use client"

import { api } from "@/lib/axios"
import { ReadAlbum } from "@/lib/ReadAlbum"
import button from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const UpdateAlbum = () => {

    const router = useRouter()

    const params = useParams()
    const id = params.id as string

    const {albums, loading} = ReadAlbum()

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
            const filterSongs = songs.filter(s => s.title.trim() !== "" && s.track_number.trim() !== "")

            const formData = new FormData()
            formData.append("title", title)
            if(image instanceof File) formData.append("image", image)
            filterSongs.forEach((song, index) => {
                formData.append(`songs[${index}][title]`, song.title)
                formData.append(`songs[${index}][track_number]`, String(song.track_number))
            })
            const response = await api.post(`/api/album/${id}`,
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
            console.log(response.data)
            router.push("/customer#album")
        } catch {
            alert("更新できません")
        }
    }

    if (loading) return <p className="flex justify-center items-center h-screen text-xl font-bold bg-gray-100">Loading...</p>


    return (
        <div className="wrapper">
            <div className={`${styles.main}`}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>現在の画像</p>
                        {typeof image === "string" && image && (
                            <div className="mt-3">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/images/${image}`}
                                    alt={`${image}`}
                                    width={80}
                                    height={80}
                                />                                   
                            </div>
                        )}
                    </div>
                    <label className="block mt-3">
                        <div {...getRootProps()} className={`${styles.drop}`}>
                            <input {...getInputProps()}/>
                            {isDragActive}
                            <p>画像を変更する場合<br/>ここにドロップして下さい</p>
                        </div>
                        {image && <div className="mt-3"><p>選択した画像</p><p>{typeof image === "string" ? image : image?.name}</p></div>}
                    </label>
                    <label className="block mt-3">アルバム名
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    {songs.map((song, index) => (
                        <div key={index}>
                            <label className="block mt-3">曲順
                                <input
                                    type="number"
                                    value={song.track_number}
                                    min={1}
                                    onChange={(e) => {
                                        const newSongs = [...songs]
                                        newSongs[index].track_number = e.target.value
                                        setSongs(newSongs)
                                    }}
                                    className={`${styles.input} pl-2 w-[40px]`} />
                            </label>
                            <label className="block mt-1">曲名
                                <input
                                    type="text"
                                    value={song.title}
                                    onChange={(e) => {
                                        const newSongs = [...songs]
                                        newSongs[index].title = e.target.value
                                        setSongs(newSongs)
                                    }}
                                    className={`${styles.input} pl-2`} />
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setSongs([...songs, {title: "", track_number: String(songs.length + 1)}])}
                        disabled={songs.length >= 6}
                        className={`${button.linkBtn} block mt-2`}
                    >
                        曲を追加
                    </button>
                    {songs.length >= 6 && <p>最大６曲までです</p>}
                    <div className="flex gap-8 mt-6">
                        <button className={`${button.submitBtn}`}>更新</button>
                        <Link href={"/customer"} className={`${button.linkBtn}`}>キャンセル</Link>
                    </div>
                </form>
            </div>
        </div>
    )
    

}

export default UpdateAlbum