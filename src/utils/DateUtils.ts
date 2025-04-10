export function DateString(isoDate: string) {
    const date = isoDate.split("T")[0]
    const parts = date.split("-")
    const formattedDate = parts.reverse().join("/")

    return formattedDate
}

export function TimeString(isoDate: string) {
    const time = isoDate.split("T")[1]
    const parts = time.split(":")

    const formattedTime = `${parts[0]}:${parts[1]}`

    return formattedTime
}

export function DateTimeString(isoDate: string){
    const date = DateString(isoDate)
    const time = TimeString(isoDate)

    return `${date} @ ${time}`
}

export function IsoDate(isoDateTime: string) {
    return isoDateTime.split("T")[0]
}