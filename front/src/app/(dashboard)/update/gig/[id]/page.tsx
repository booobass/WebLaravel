"use client"

import { api } from "@/lib/axios"
import { ReadGig } from "@/lib/ReadGig"
import button from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const UpdateGig = () => {

    const router = useRouter()

    const params = useParams()
    const id = params.id as string

    const {gigs} = ReadGig()

    
    const singleGig = gigs.find((e) => String(e.id) === id)

    
    const [update, setUpdate] = useState({
        date: "",
        place: "",
        open_time: "",
        start_time: "",
        adv_price: "",
        day_price: "",
    })


    const [bands, setBands] = useState([{name: ""}])
    const [djs, setDjs] = useState([{name: ""}])


    useEffect(() => {
        if(singleGig) {
            setUpdate({
                date: singleGig.date,
                place: singleGig.place,
                open_time: singleGig.open_time.slice(0, 5),
                start_time: singleGig.start_time.slice(0, 5),
                adv_price: String(singleGig.adv_price),
                day_price: String(singleGig.day_price),
            })
            setBands(singleGig.bands)
            setDjs(singleGig.djs ?? [])
        }
        
    }, [singleGig])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const filterBands = bands
                .map(b => ({name: (b.name ?? "").trim()}))
                .filter(b => b.name !== "")
            const filterDjs = djs
                .map(d => ({name: (d.name ?? "").trim()}))
                .filter(d => d.name !== "")
            await api.patch(`/api/gig/${id}`,
                {
                    date: update.date,
                    place: update.place,
                    open_time: update.open_time,
                    start_time: update.start_time,
                    adv_price: update.adv_price,
                    day_price: update.day_price,
                    bands: filterBands,
                    djs: filterDjs
                }, {
                    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                }
            )
            alert("更新しました")
            router.push("/customer#gig")
        } catch {
            alert("更新できません")
        }
    }

    return (
        <div className="wrapper">
            <div className={`${styles.main}`}>
                <form onSubmit={handleSubmit}>
                    <label>日付
                        <input
                            type="date"
                            name="date"
                            value={update.date}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">場所
                        <input
                            type="text"
                            name="place"
                            value={update.place}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">オープン
                        <input
                            type="time"
                            name="open_time"
                            value={update.open_time}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">スタート
                        <input
                            type="time"
                            name="start_time"
                            value={update.start_time}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">前売りチケット
                        <input
                            type="text"
                            name="adv_price"
                            value={update.adv_price}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">当日チケット
                        <input
                            type="text"
                            name="day_price"
                            value={update.day_price}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    {bands.map((b, i) => (
                        <div key={i}>
                            <label className="block mt-3">バンド
                                <input
                                    type="text"
                                    value={b.name}
                                    onChange={(e) => {
                                        const newBand = [...bands]
                                        newBand[i].name = e.target.value
                                        setBands(newBand)
                                    }}
                                    className={`${styles.input} pl-2`} />
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setBands([...bands, {name: ""}])}
                        className={`${button.linkBtn} mt-2`}>バンドを追加
                    </button>
                    {djs.map((d, i) => (
                        <div key={i}>
                            <label className="block mt-3">DJ
                                <input
                                    type="text"
                                    value={d.name}
                                    onChange={(e) => {
                                        const newDj = [...djs]
                                        newDj[i].name = e.target.value
                                        setDjs(newDj)
                                    }}
                                    className={`${styles.input} pl-2`} />
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setDjs([...djs, {name: ""}])}
                        className={`${button.linkBtn} mt-2`}>DJを追加
                    </button>
                    <div className="flex gap-8 mt-6">
                        <button className={`${button.submitBtn}`}>更新</button>
                        <Link href={"/customer"} className={`${button.linkBtn}`}>キャンセル</Link>
                    </div>
                </form>
            </div>
        </div>
    )

    

}

export default UpdateGig