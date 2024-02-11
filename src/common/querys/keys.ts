import { QueryKey, UseQueryOptions } from 'react-query'

export const API_QUERY_KEYS = {
  //event keys
  getAllEvents: (date: string, room: string) => [`events`, date, room],
  getAllEventsByMonth: (month: string) => [`events`, month],
  //order keys
  getAllOrders: [`orders`],
  getOrder: (orderId: string) => [`orders`, orderId],
  //room keys
  getAllRooms: [`rooms`],
  //transbank keys
  confirmTransaction: (token: string) => [`transbank`, `confirm`, token],
}

export type QueryOptions<T, V extends QueryKey = string[], K = T> = Omit<
  UseQueryOptions<T, unknown, K, V>,
  `initialData` | `queryFn` | `queryKey`
>
