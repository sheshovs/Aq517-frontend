import { getAxiosInstance } from '@/config/axios'
import { Event, EventResponse, Order } from '../types'

const axiosInstance = getAxiosInstance(import.meta.env.VITE_BACKEND_URL)

const API = {
  createPreference: (orderData: Order): Promise<{ data: { url: string } }> =>
    axiosInstance.post(`/mercadopago/create_preference`, orderData),
  updateItems: (preferenceId: string) => {
    return axiosInstance.post(`/mercadopago/events`, { preferenceId })
  },
  event: {
    delete: (uuid: string) => {
      return axiosInstance.delete(`/block/events/${uuid}`)
    },
    block: (events: Event[]) => {
      return axiosInstance.post(`/block/events`, { events })
    },
    getByFilters: (date: string, room: string): Promise<{ data: EventResponse[] }> => {
      return axiosInstance.get(`/events/filter`, { params: { date, room } })
    },
  },
}

export default API
