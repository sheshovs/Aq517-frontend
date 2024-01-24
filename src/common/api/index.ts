import { getAxiosInstance } from '@/config/axios'
import { Event, EventResponse, Order, OrderResponse, RoomResponse } from '../types'

const axiosInstance = getAxiosInstance(import.meta.env.VITE_BACKEND_URL)

const API = {
  login: (email: string, password: string) => {
    return axiosInstance.post(`/auth/login`, { email, password })
  },
  currentUser: () => {
    return axiosInstance.get(`/auth/current`)
  },
  createPreference: (orderData: Order): Promise<{ data: { url: string } }> =>
    axiosInstance.post(`/mercadopago/create_preference`, orderData),
  updateItems: (preferenceId: string, status: string, paymentId?: string) => {
    return axiosInstance.post(
      `/mercadopago/events`,
      { preferenceId },
      { params: { status, paymentId } },
    )
  },
  deleteItems: (preferenceId: string, status: string) => {
    return axiosInstance.delete(`/mercadopago/events/${preferenceId}`, { params: { status } })
  },
  event: {
    delete: (uuid: string) => {
      return axiosInstance.delete(`/block/events/${uuid}`)
    },
    block: (events: Event[]) => {
      return axiosInstance.post(`/block/events`, { events })
    },
    getByFilters: (date: string, roomId: string): Promise<{ data: EventResponse[] }> => {
      return axiosInstance.get(`/events/filter`, { params: { date, roomId } })
    },
    getAllByMonth: (month: string): Promise<{ data: EventResponse[] }> => {
      return axiosInstance.get(`/events/month`, { params: { month } })
    },
  },
  order: {
    getAll: (): Promise<{ data: OrderResponse[] }> => {
      return axiosInstance.get(`/orders`)
    },
  },
  room: {
    getAll: (): Promise<{ data: RoomResponse[] }> => {
      return axiosInstance.get(`/rooms`)
    },
  },
}

export default API
