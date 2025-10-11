"use client"

import { api } from "@/lib/axios"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

const CreateAlbum = () => {

    const [image, setImage] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [songs, setSongs] = useState([{title: "", track_number: 1}])

    console.log("image", image)

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

    const handleSubmit = async (e :React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("title", title)
            if(image) formData.append("image", image)

            songs.forEach((song, index) => {
                formData.append(`songs[${index}][title]`, song.title)
                formData.append(`songs[${index}][track_number]`, String(song.track_number))
            })

            await api.post("api/album/store",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            alert("アルバムを登録しました")

        } catch {
            alert("アルバムを登録出来ません")
        }
    }

    return (
        <div>
            <div>
                <h4>アルバム登録</h4>
                <form onSubmit={handleSubmit}>
                    <label>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive}
                            <p>ここに画像をドロップして下さい</p>
                        </div>
                        {image && <p>選択した画像：{image.name}</p>}
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
                                        newSongs[index].track_number = Number(e.target.value)
                                    }}
                                    required />
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setSongs([...songs, {title: "", track_number: songs.length + 1}])}
                        disabled={songs.length >= 6}
                    >
                        曲を追加
                    </button>
                    {songs.length >= 6 && <p>最大６曲までです</p>}
                    <button>登録</button>
                </form>
                <div>
                    <p>リンク</p>
                </div>
            </div>
        </div>
    )
}

export default CreateAlbum