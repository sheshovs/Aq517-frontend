import { RoomTypes } from './room'
export interface Event {
  title: string
  date: string
  startTime: string
  endTime: string
  email: string
  phone: string
  attendant: string
  room: RoomTypes
}

export interface EventResponse extends Event {
  uuid: string
  status: EventStatuses
  createdAt: string
  expirationDate: string
}

export interface EventCalendar extends Event {
  start: Date
  end: Date
}

export enum EventStatuses {
  BLOCKED = `BLOCKED`,
  SCHEDULED = `SCHEDULED`,
}
