import { UseQueryResult, useQuery } from 'react-query'
import { OrderResponse } from '../types'
import { API_QUERY_KEYS, QueryOptions } from './keys'
import API from '../api'

export const useOrdersQuery = ({
  options = {},
}: {
  options?: QueryOptions<{ data: OrderResponse[] }>
}): UseQueryResult<{ data: OrderResponse[] }, unknown> =>
  useQuery(API_QUERY_KEYS.getAllOrders, () => API.order.getAll(), {
    ...options,
  })

export const useOrderQuery = ({
  orderId,
  options = {},
}: {
  orderId: string
  options?: QueryOptions<{ data: OrderResponse }>
}): UseQueryResult<{ data: OrderResponse }, unknown> =>
  useQuery(API_QUERY_KEYS.getOrder(orderId), () => API.order.get(orderId), {
    ...options,
  })
