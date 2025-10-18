"use client"

import EditAlbum from "@/components/album/edit/page"
import EditGig from "@/components/gig/edit/page"
import EditProfile from "@/components/profile/edit/page"
import EditTrack from "@/components/track/edit/page"
import { ScrollHash } from "@/lib/ScrollHasj"

const Customer = () => {

    ScrollHash()

    return (
        <div className="wrapper">
            <h3 className="p-1 border rounded bg-gray-200">ホームページの登録情報</h3>
            <div>
                <EditProfile />
                <div id="album">
                    <EditAlbum />
                </div>
                <div id="track">
                    <EditTrack />
                </div>
                <div id="gig">
                    <EditGig />
                </div>
            </div>
        </div>
    )
}

export default Customer