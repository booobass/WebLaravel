"use client"

import CreateAlbum from "@/components/album/create/page"
import CreateGig from "@/components/gig/create/page"
import LogoutButton from "@/components/LogoutButton"
import CreateProfile from "@/components/profile/create/page"
import CreateTrack from "@/components/track/create/page"

const CreateWebPage = () => {
    return (
        <div>
            <h2>ホームページ作成</h2>
            <CreateProfile />
            <CreateAlbum />
            <CreateTrack />
            <CreateGig />
            <LogoutButton />
        </div>
    )
}

export default CreateWebPage