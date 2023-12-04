import { UseQueryResult, useQuery } from 'react-query'
import { EventResponse } from '../types'
import { API_QUERY_KEYS, QueryOptions } from './keys'
import API from '../api'

export const useEventsQuery = ({
  date,
  room,
  options = {},
}: {
  date: string
  room: string
  options?: QueryOptions<{ data: EventResponse[] }>
}): UseQueryResult<{ data: EventResponse[] }, unknown> =>
  useQuery(API_QUERY_KEYS.getAllEvents(date, room), () => API.event.getByFilters(date, room), {
    ...options,
  })

export const useEventMonthQuery = ({
  month,
  options = {},
}: {
  month: string
  options?: QueryOptions<{ data: EventResponse[] }>
}): UseQueryResult<{ data: EventResponse[] }, unknown> =>
  useQuery(API_QUERY_KEYS.getAllEventsByMonth(month), () => API.event.getAllByMonth(month), {
    ...options,
  })
