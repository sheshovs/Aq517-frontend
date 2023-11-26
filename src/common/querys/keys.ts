import { QueryKey, UseQueryOptions } from 'react-query'

export const API_QUERY_KEYS = {
  //event keys
  getAllEvents: (date: string) => [`events`, date],
}

export type QueryOptions<T, V extends QueryKey = string[], K = T> = Omit<
  UseQueryOptions<T, unknown, K, V>,
  `initialData` | `queryFn` | `queryKey`
>
