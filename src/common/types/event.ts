import { RoomResponse } from './room'
import { Dayjs } from 'dayjs'

export interface Event {
  title: string
  date: string
  startTime: string
  endTime: string
  email: string
  phone: string
  attendant: string
  room: RoomResponse
}

export interface EventResponse extends Event {
  uuid: string
  status: EventStatuses
  createdAt: string
  expirationDate: string
  accesories: Accesory[]
}

export interface EventCalendar extends Event {
  start: Date
  end: Date
  accesories?: Accesory[]
  status: EventStatuses
}

export enum EventStatuses {
  BLOCKED = `BLOCKED`,
  SCHEDULED = `SCHEDULED`,
}

export interface Session {
  startTime: string
  endTime: string
  date: Dayjs
  room: RoomResponse
}

export interface Accesory {
  uuid: string
  name: string
  price: number
  session: Session
}

export interface Hour {
  hour: Dayjs
  room: RoomResponse
}
