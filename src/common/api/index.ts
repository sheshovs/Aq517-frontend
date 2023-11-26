import { getAxiosInstance } from '@/config/axios'
import { Event, EventResponse, Order } from '../types'

const axiosInstance = getAxiosInstance(import.meta.env.VITE_BACKEND_URL)

const API = {
  createPreference: (orderData: Order): Promise<{ data: { url: string } }> =>
    axiosInstance.post(`/api/mercadopago/create_preference`, orderData),
  event: {
    block: (events: Event[]) => {
      return axiosInstance.post(`/block/events`, { events })
    },
    getByDate: (date: string): Promise<{ data: EventResponse[] }> => {
      return axiosInstance.get(`/events`, { params: { date } })
    },
  },
}

export default API
