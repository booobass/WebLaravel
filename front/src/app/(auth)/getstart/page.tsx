"use client"

import Login from "@/app/(auth)/login/page"
import Register from "@/app/(auth)/register/page"
import styles from "@/styles/auth.module.css"
import { useState } from "react"

const GetStarted = () => {

    const [view, setView] = useState<"log" | "reg">("log")
    return (
        <div className="wrapper">
            <div className={`${styles.main}`}>
                <div className="flex gap-4">
                    <button
                        onClick={() => setView("log")}
                        className={`border-gray-600 text-xl hover:text-[#333] cursor-pointer
                            ${view === "log" ? "text-[#333] border-b-2" : "text-gray-400"}
                        `}>ログイン
                    </button>
                    <button
                        onClick={() => setView("reg")}
                        className={`border-gray-600 text-xl hover:text-[#333] cursor-pointer
                            ${view === "reg" ? "text-[#333] border-b-2" : "text-gray-400"}
                        `}>新規登録
                    </button>
                </div>
                {view === "log" && (
                    <Login />
                )}
                {view === "reg" && (
                    <Register />
                )}
            </div>
        </div>
    )

}

export default GetStarted