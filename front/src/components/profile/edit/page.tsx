"use client"

import { ReadProfile } from "@/lib/ReadProfile"
import border from "@/styles/border.module.css"
import button from "@/styles/button.module.css"
import Link from "next/link"

const EditProfile = () => {

   const {prof} = ReadProfile()

    return (
        <div>
            <div className="mt-6 pb-6 border-b border-dashed">
                <h3 className="font-bold text-center">ホームページの基本情報</h3>
                {prof.map((p) => (
                    <div key={p.id} className="mt-3">
                        <div>
                            <p>ホームページ名：{p.homepage_name}</p>
                            <p>ホームページの説明：{p.description}</p>
                            <p>ホームページの背景色：
                                <span className={`${border.maru}`} style={{backgroundColor: p.background_color}}>
                                    {' '}
                                </span> {p.background_color}
                            </p>
                        </div>
                        <div className="mt-3 justify-items-center">
                            <Link href={`/update/profile/${p.id}`} className={`${button.linkBtn} block`}>編集</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default EditProfile