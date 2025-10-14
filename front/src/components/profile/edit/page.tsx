"use client"

import { ReadProfile } from "@/lib/ReadProfile"
import Link from "next/link"

const EditProfile = () => {

   const {prof} = ReadProfile()

    return (
        <div>
            <div>
                {prof.map((p) => (
                    <div key={p.id}>
                        <div>
                            <p>{p.homepage_name}</p>
                            <p>{p.description}</p>
                            <p>{p.background_color}</p>
                        </div>
                        <div>
                            <Link href={`/update/profile/${p.id}`}>編集</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default EditProfile