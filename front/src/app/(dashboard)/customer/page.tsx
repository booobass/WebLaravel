"use client"

import EditAlbum from "@/components/album/edit/page"
import EditGig from "@/components/gig/edit/page"
import EditProfile from "@/components/profile/edit/page"
import EditTrack from "@/components/track/edit/page"

const Customer = () => {
    return (
        <div className="wrapper">
            <h3>ホームページ登録情報</h3>
            <div>
                <EditProfile />
                <EditAlbum />
                <EditTrack />
                <EditGig />
            </div>
        </div>
    )
}

export default Customer