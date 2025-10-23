"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect } from "react"

export const ScrollHash = () => {
    const pathname = usePathname()

    useLayoutEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash

            if (hash) {
                const target = document.querySelector(hash)
                if (target) {
                    target.scrollIntoView({behavior: "smooth", block: "start"})
                }
            }
        }
        handleHashChange()

        window.addEventListener("hashchange", handleHashChange)

        return () => window.removeEventListener("hashchange", handleHashChange)
        
    }, [pathname])
}

