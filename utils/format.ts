import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'

export const formatDateTime = (isoDateTimeString: string): string => {
    const timeZone = 'Asia/Ho_Chi_Minh'
    const zonedDate = toZonedTime(isoDateTimeString, timeZone)

    const dayOfWeek = format(zonedDate, 'eeee', { locale: vi })
    const formattedDate = format(zonedDate, 'dd/MM/yyyy')
    const formattedTime = format(zonedDate, 'HH:mm')

    return `${dayOfWeek}, ngày ${formattedDate}, lúc ${formattedTime}`
}
