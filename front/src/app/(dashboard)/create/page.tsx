"use client"

import CreateAlbum from "@/components/album/create/page"
import CreateGig from "@/components/gig/create/page"
import CreateTrack from "@/components/track/create/page"
import { useState } from "react"

const CreateWebPage = () => {

    const [view, setView] = useState<"album" | "gig" | "track">("gig")

    return (
        <div className="wrapper">
            <header className="flex gap-8">
                <button onClick={() => setView("gig")} className={`
                    ${
                        view === "gig" ? "bg-gray-200" : ""
                    } block border p-1 rounded hover:bg-gray-100`}>ライブ登録
                </button>
                <button onClick={() => setView("album")} className={`
                    ${
                        view === "album" ? "bg-gray-200" : ""
                    } block border p-1 rounded hover:bg-gray-100`}>アルバム登録
                </button>
                <button onClick={() => setView("track")} className={`
                    ${
                        view === "track" ? "bg-gray-200" : ""
                    } block border p-1 rounded hover:bg-gray-100`}>音源登録
                </button>
            </header>
            <div>
                {view === "gig" && <CreateGig />}
                {view === "album" && <CreateAlbum />}
                {view === "track" && <CreateTrack />}
            </div>
        </div>
    )
}

export default CreateWebPage