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
  paymentMethod?: PaymentMethods
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
  paymentMethod: PaymentMethods
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

export enum PaymentMethods {
  MERCADO_PAGO = `MERCADO_PAGO`,
  TRANSBANK = `TRANSBANK`,
}

export const PaymentMethodLabels = {
  [PaymentMethods.MERCADO_PAGO]: `Mercado Pago`,
  [PaymentMethods.TRANSBANK]: `Transbank`,
}

export const PaymentMethodColors = {
  [PaymentMethods.MERCADO_PAGO]: {
    background: `#009ee3`,
    hover: `#007eb5`,
  },
  [PaymentMethods.TRANSBANK]: {
    background: `#d5006c`,
    hover: `#e5397f`,
  },
}
