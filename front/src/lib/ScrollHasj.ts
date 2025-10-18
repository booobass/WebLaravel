"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export const ScrollHash = () => {
    const pathname = usePathname()
    const hash = typeof window !== "undefined" ? window.location.hash : ""

    useEffect(() => {
        if (hash) {
            const target = document.querySelector(hash)
            if (target) {
                target.scrollIntoView({behavior: "smooth", block: "start"})
            }
        }
    }, [pathname, hash])
}