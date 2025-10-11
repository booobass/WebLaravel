"use client"

import ShowAlbum from "@/components/album/show/page"
import ShowGig from "@/components/gig/show/page"
import ShowTrack from "@/components/track/show/page"

const MyWebPage = () => {
    return (
        <div>
            <h2>ホームページ</h2>
            <ShowAlbum />
            <ShowTrack />
            <ShowGig />
        </div>
    )
}

export default MyWebPage