import { EventResponse } from './event'

export interface OrderItem {
  id?: string
  title: string
  quantity: number
  unit_price: number
  currency_id: string
}

export interface Order {
  items: OrderItem[]
  attendant: string
  email: string
  phone: string
}

export interface OrderResponse {
  uuid: string
  total_price: number
  createdAt: string
  status: string
  attendant: string
  email: string
  phone: string
  events: EventResponse[]
}

export enum OrderStatuses {
  PENDING = `PENDING`,
  APPROVED = `APPROVED`,
  FAILURE = `FAILURE`,
  REJECTED = `REJECTED`,
}

export const OrderStatusesLabels: Record<string, string> = {
  [OrderStatuses.PENDING]: `Pendiente`,
  [OrderStatuses.APPROVED]: `Aprobado`,
  [OrderStatuses.FAILURE]: `Cancelado`,
  [OrderStatuses.REJECTED]: `Rechazado`,
}

export const OrderStatusesColors: Record<string, `warning` | `success` | `error`> = {
  [OrderStatuses.PENDING]: `warning`,
  [OrderStatuses.APPROVED]: `success`,
  [OrderStatuses.FAILURE]: `error`,
  [OrderStatuses.REJECTED]: `error`,
}
