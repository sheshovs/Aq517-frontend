import { UseQueryResult, useQuery } from 'react-query'
import { EventResponse } from '../types'
import { API_QUERY_KEYS, QueryOptions } from './keys'
import API from '../api'

export const useEventsQuery = ({
  date,
  options = {},
}: {
  date: string
  options?: QueryOptions<{ data: EventResponse[] }>
}): UseQueryResult<{ data: EventResponse[] }, unknown> =>
  useQuery(API_QUERY_KEYS.getAllEvents(date), () => API.event.getByDate(date), {
    ...options,
  })
