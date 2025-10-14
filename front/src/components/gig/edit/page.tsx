"use client"

import { ReadGig } from "@/lib/ReadGig"
import { formatBand, formatDateWithDay, formatDj, formatTime } from "@/utils/formatters"
import Link from "next/link"

const EditGig = () => {

    const {gigs} = ReadGig()

    return (
        <div>
            <div>
                {gigs.map((g) => (
                    <div key={g.id}>
                        <p>{formatDateWithDay(g.date)}@{g.place}</p>
                        <div>
                            <p>{formatBand(g.bands)}</p>
                        </div>
                        <div>
                            {(!g.djs) ? (null) : (
                                <p>{formatDj(g.djs)}</p>
                            )}
                            
                        </div>
                        <div>
                            <p>open: {formatTime(g.open_time)} / start: {formatTime(g.start_time)}</p>
                        </div>
                        <div className="flex">
                            <p>adv. ¥{g.adv_price} / day. ¥{g.day_price}</p>
                        </div>
                        <Link href={`/update/gig/${g.id}`}>編集</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditGig