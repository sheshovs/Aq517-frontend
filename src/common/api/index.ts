import { getAxiosInstance } from '@/config/axios'
import { Order } from '../types/order'

const axiosInstance = getAxiosInstance(`http://localhost:4000`)

const API = {
  createPreference: (orderData: Order): Promise<{ data: { url: string } }> =>
    axiosInstance.post(`/api/mercadopago/create_preference`, orderData),
}

export default API
