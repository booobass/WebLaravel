"use client"

import AudioPlayer from "@/components/AudioPlayer"
import { ReadTrack } from "@/lib/ReadTrack"
import Link from "next/link"

const EditTrack = () => {

    const {tracks} = ReadTrack()

    return (
        <div>
            <div>
                <h3>音源編集</h3>
                    {tracks.map((t) => (
                        <div
                            key={t.id}
                            className={`max-w-[300px] w-full justify-items-center p-3 border-4 border-double rounded-sm bg-[#fefefe]`}
                        >
                            <div className="text-center">
                                <h4 className="text-xl border-b">{t.describe}</h4>
                                <h3 className="mt-2 text-2xl font-bold">{t.name}</h3>
                            </div>
                            <AudioPlayer src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/tracks/${t.audio_path}`} />
                            <div>
                                <Link href={`/update/track/${t.id}`}>編集</Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default EditTrack