"use client"

import { ReadAlbum } from "@/lib/ReadAlbum"
import Image from "next/image"
import Link from "next/link"

const EditAlbum = () => {

    const {albums} = ReadAlbum()

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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditAlbum