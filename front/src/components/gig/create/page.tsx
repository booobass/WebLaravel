"use client"

import { api } from "@/lib/axios"
import { useState } from "react"

const CreateGig = () => {

    const [data, setData] = useState({
        date: "",
        place: "",
        open_time: "",
        start_time: "",
        adv_price: "",
        day_price: ""
    })

    const [band, setBand] = useState([{name: ""}])
    const [dj, setDj] = useState([{name: ""}])

    console.log("band", band)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const filterBands = band
                .map(b => ({name: (b.name ?? "").trim()}))
                .filter(b => b.name !== "")
            const filteredDjs = dj
                .map(d => ({name: (d.name ?? "").trim()})) //??でnull,undefinedを"""にして、trimで文字列の前後の空白を削除
                .filter(d => d.name !== "")
            await api.post("/api/gig/store",
                {
                    date: data.date,
                    place: data.place,
                    open_time: data.open_time,
                    start_time: data.start_time,
                    adv_price: data.adv_price,
                    day_price: data.day_price,
                    bands: filterBands,
                    djs: filteredDjs
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            alert("データを登録しました")
        } catch {
            alert("データを登録出来ません")
        }
    }

    return (
        <div>
            <div>
                <h3>ライブ登録</h3>
                <form onSubmit={handleSubmit}>
                    <label>日付：
                        <input
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>場所：
                        <input
                            type="text"
                            name="place"
                            value={data.place}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>オープン：
                        <input
                            type="time"
                            name="open_time"
                            value={data.open_time}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>スタート
                        <input
                            type="time"
                            name="start_time"
                            value={data.start_time}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>前売りチケット
                        <input
                            type="text"
                            name="adv_price"
                            value={data.adv_price}
                            onChange={handleChange}
                            required />
                    </label>
                    <label>当日チケット
                        <input
                            type="text"
                            name="day_price"
                            value={data.day_price}
                            onChange={handleChange}
                            required />
                    </label>
                    {band.map((b, i) => (
                        <div key={i}>
                            <label>バンド：
                                <input
                                    type="text"
                                    value={b.name}
                                    onChange={(e) => {
                                        const newBand = [...band]
                                        newBand[i].name = e.target.value
                                        setBand(newBand)
                                    }} />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={() => setBand([...band, {name: ""}])}>バンドを追加</button>
                    {dj.map((d, i) => (
                        <div key={i}>
                            <label>DJ：
                                <input
                                    type="text"
                                    value={d.name}
                                    onChange={(e) => {
                                        const newDj = [...dj]
                                        newDj[i].name = e.target.value
                                        setDj(newDj)
                                    }} />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={() => setDj([...dj, {name: ""}])}>DJを追加</button>
                    <button>登録</button>
                </form>
            </div>
        </div>
    )

}

export default CreateGig