"use client"

import { api } from "@/lib/axios"
import styles from "@/styles/slider.module.css"
import { AlbumType } from "@/types/type"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type UserAlbums = {
    user: {
        id: number;
        slug: string;
    }
    albums: AlbumType[]
}

const ShowAlbum = () => {

    const {slug} = useParams<{slug: string}>()

    const [data, setData] = useState<UserAlbums | null>(null)
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)


    useEffect(() => {
        if(!slug) return

        const fetchAlbums = async () => {
            try {
                const response = await api.get(`/api/uuu/${slug}/albums`)
                setData(response.data)
                console.log(response.data)
                console.log(response.data.albums)
            } catch {
                alert("データを取得出来ません")
            } finally {
                setLoading(false)
            }
        }

        fetchAlbums()
    }, [slug])

    useEffect(() => {
        if(!data || !data.albums) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % data.albums.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [data])

    if(loading) return <p>loading...</p>
    if(!data) return <p>no data available</p>

    return (
        <div>
            <div>
                {data.albums.length === 0 ? (
                    <p>登録されていません</p>
                ) : (
                    <div className="max-w-[800px]">
                        <div className={`${styles.main}`}>
                            <div
                                className={styles.sliderInner}
                                style={{transform: `translateX(-${currentIndex * 100}%)`}}
                            >
                                {data.albums.map((a) => (
                                    <div key={a.id} className={styles.slide}>
                                        <div>
                                            <Image
                                                src={`${a.image_url}`}
                                                alt={a.title}
                                                width={220}
                                                height={220}
                                                priority
                                                />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.indicator}>
                                {data.albums.map((_, index) => (
                                    <span
                                        key={index}
                                        className={index === currentIndex ? styles.dotActive : styles.dot}
                                        onClick={() => setCurrentIndex(index)}
                                    >
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.songMain}>
                            <div
                                className={styles.songSliderInner}
                                style={{ transform: `translateY(-${currentIndex * 100}%)`}}
                            >
                                {data.albums.map((a) => (
                                    <div key={a.id} className={styles.songSlide}>
                                        <h3 className="text-xl font-bold">{a.title}</h3>
                                        <ul className="mt-3">
                                            {a.songs.map((as) => (
                                                <li key={as.id}>
                                                    {as.track_number}. {as.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowAlbum