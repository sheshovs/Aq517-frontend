export interface Event {
  title: string
  date: string
  startTime: string
  endTime: string
  email: string
  phone: string
  attendant: string
}

export interface EventResponse extends Event {
  uuid: string
  status: EventStatuses
  createdAt: string
  expirationDate: string
}

export enum EventStatuses {
  BLOCKED = `BLOCKED`,
  SCHEDULED = `SCHEDULED`,
}
