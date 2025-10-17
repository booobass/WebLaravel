"use client"

import LogoutButton from "@/components/LogoutButton"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { usePathname } from "next/navigation"

const CustomerHeader = () => {

    const pathname = usePathname()

    const {slug} = useAuth()

    return (
        <div className="wrapper">
            <div className="flex gap-8">
                <Link
                    href={slug ? (`/uuu/${slug}`) : ('/create')}
                    target="_blank"
                    className="border p-2 rounded  hover:bg-gray-200">ホームページ確認
                </Link>
                <Link
                    href={"/create"}
                    className={`${pathname === "/create" ? "bg-gray-300" : ""} border p-2 rounded hover:bg-gray-200 transition`}>ホームページ作成
                </Link>
                <Link
                    href={"/customer"}
                    className={`${pathname === "/customer" ? "bg-gray-300" : ""} border p-2 rounded hover:bg-gray-200`}>登録情報の確認
                </Link>
                <LogoutButton />
            </div>
        </div>
    )
}

export default CustomerHeader