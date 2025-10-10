"use client"

import CreateAlbum from "@/components/album/create/page"
import LogoutButton from "@/components/LogoutButton"

const CreateWebPage = () => {
    return (
        <div>
            <h2>ホームページ作成</h2>
            <CreateAlbum />
            <LogoutButton />
        </div>
    )
}

export default CreateWebPage