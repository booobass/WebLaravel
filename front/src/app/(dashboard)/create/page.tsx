"use client"

import CreateAlbum from "@/components/album/create/page"
import LogoutButton from "@/components/LogoutButton"
import CreateTrack from "@/components/track/create/page"

const CreateWebPage = () => {
    return (
        <div>
            <h2>ホームページ作成</h2>
            <CreateAlbum />
            <CreateTrack />
            <LogoutButton />
        </div>
    )
}

export default CreateWebPage