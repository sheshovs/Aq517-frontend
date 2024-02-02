import { Dayjs } from 'dayjs'
import { RoomResponse } from '../types'

export const hoursByDate = (
  hoursSelected: {
    hour: Dayjs
    room: RoomResponse
  }[],
) => {
  const hoursByDate: {
    [key: string]: {
      hour: Dayjs
      room: RoomResponse
    }[]
  } = {}
  const hoursSorted = hoursSelected.sort((a, b) => a.hour.diff(b.hour))
  hoursSorted.forEach((hour) => {
    const date = hour.hour.format(`YYYY-MM-DD`)
    if (!hoursByDate[date]) {
      hoursByDate[date] = []
    }
    hoursByDate[date].push(hour)
  })
  return hoursByDate
}
