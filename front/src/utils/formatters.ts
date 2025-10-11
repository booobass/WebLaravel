export const formatDateWithDay = (dateString: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""

    const month = date.getMonth() + 1
    const day = date.getDate()
    const days = ["日", "月", "火", "水", "木", "金", "土"]
    const weekday = days[date.getDay()]

    return `${month}月${day}日(${weekday})`

}

export const formatTime = (timeString: string) => {
    if (!timeString) return ""
    return timeString.slice(0, 5)
}

export const formatBand = (band: {name: string}[]) => {
    if(!band || band.length === 0) return ""
    return `w/ ${band.map(b => b.name).join(" / ")}`
}

export const formatDj = (dj: {name: string}[]): string => {
    if(!dj || dj.length === 0) return ""
    return `DJ: ${dj.map(d => d.name).join(" / ")}`
}