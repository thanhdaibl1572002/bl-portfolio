import { format, toZonedTime } from 'date-fns-tz'

export const formatDateTime = (isoDateTimeString: string): { formattedDate: string, formattedTime: string } => {
    const timeZone = 'Asia/Ho_Chi_Minh'
    const zonedDate = toZonedTime(isoDateTimeString, timeZone)

    const formattedDate = format(zonedDate, 'dd/MM/yyyy', { timeZone })
    const formattedTime = format(zonedDate, 'HH:mm', { timeZone })

    return { formattedDate, formattedTime }
}