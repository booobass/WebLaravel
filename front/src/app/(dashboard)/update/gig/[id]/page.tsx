"use client"

import { api } from "@/lib/axios"
import { ReadGig } from "@/lib/ReadGig"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const UpdateGig = () => {

    const params = useParams()
    const id = params.id as string

    const {gigs} = ReadGig()

    
    const singleGig = gigs.find((e) => String(e.id) === id)

    console.log("sG", singleGig)
    
    console.log("gigs", singleGig)
    const [update, setUpdate] = useState({
        date: "",
        place: "",
        open_time: "",
        start_time: "",
        adv_price: "",
        day_price: "",
    })

    console.log("date", update)

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
        } catch {
            alert("更新できません")
        }
    }

    return (
        <div>
            <div>
                <h3>編集</h3>
                <form onSubmit={handleSubmit}>
                    <label>日付：
                        <input
                            type="date"
                            name="date"
                            value={update.date}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>場所：
                        <input
                            type="text"
                            name="place"
                            value={update.place}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>オープン：
                        <input
                            type="time"
                            name="open_time"
                            value={update.open_time}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>スタート：
                        <input
                            type="time"
                            name="start_time"
                            value={update.start_time}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>前売りチケット：
                        <input
                            type="text"
                            name="adv_price"
                            value={update.adv_price}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>当日チケット：
                        <input
                            type="text"
                            name="day_price"
                            value={update.day_price}
                            onChange={handleChange}
                            required />
                    </label>
                    {bands.map((b, i) => (
                        <div key={i}>
                            <label>バンド：
                                <input
                                    type="text"
                                    value={b.name}
                                    onChange={(e) => {
                                        const newBand = [...bands]
                                        newBand[i].name = e.target.value
                                        setBands(newBand)
                                    }} />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={() => setBands([...bands, {name: ""}])}>バンドを追加</button>
                    {djs.map((d, i) => (
                        <div key={i}>
                            <label>DJ：
                                <input
                                    type="text"
                                    value={d.name}
                                    onChange={(e) => {
                                        const newDj = [...djs]
                                        newDj[i].name = e.target.value
                                        setDjs(newDj)
                                    }} />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={() => setDjs([...djs, {name: ""}])}>DJを追加</button>
                    <button>登録</button>
                </form>
            </div>
        </div>
    )

    

}

export default UpdateGig