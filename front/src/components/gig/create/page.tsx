"use client"

import { api } from "@/lib/axios"
import button from "@/styles/button.module.css"
import styles from "@/styles/form.module.css"
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
        <div className="wrapper">
            <div className={`${styles.main}`}>
                <h3 className="text-xl font-bold">ライブ登録</h3>
                <form onSubmit={handleSubmit} className="mt-6">
                    <label className="block">日付
                        <input
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">場所
                        <input
                            type="text"
                            name="place"
                            value={data.place}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">オープン
                        <input
                            type="time"
                            name="open_time"
                            value={data.open_time}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">スタート
                        <input
                            type="time"
                            name="start_time"
                            value={data.start_time}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">前売りチケット
                        <input
                            type="text"
                            name="adv_price"
                            value={data.adv_price}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    <label className="block mt-3">当日チケット
                        <input
                            type="text"
                            name="day_price"
                            value={data.day_price}
                            onChange={handleChange}
                            required
                            className={`${styles.input} pl-2`} />
                    </label>
                    {band.map((b, i) => (
                        <div key={i}>
                            <label className="block mt-3">バンド
                                <input
                                    type="text"
                                    value={b.name}
                                    onChange={(e) => {
                                        const newBand = [...band]
                                        newBand[i].name = e.target.value
                                        setBand(newBand)
                                    }}
                                    className={`${styles.input} pl-2`} />
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setBand([...band, {name: ""}])}
                        className={`${button.linkBtn} block mt-2`}>バンドを追加
                    </button>
                    {dj.map((d, i) => (
                        <div key={i}>
                            <label className="block mt-3">DJ
                                <input
                                    type="text"
                                    value={d.name}
                                    onChange={(e) => {
                                        const newDj = [...dj]
                                        newDj[i].name = e.target.value
                                        setDj(newDj)
                                    }}
                                    className={`${styles.input} pl-2`} />
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setDj([...dj, {name: ""}])}
                        className={`${button.linkBtn} block mt-2`}>DJを追加
                    </button>
                    <button className={`${button.submitBtn} block mt-6`}>登録</button>
                </form>
            </div>
        </div>
    )

}

export default CreateGig