import { UseQueryResult, useQuery } from 'react-query'
import { RoomResponse } from '../types'
import { API_QUERY_KEYS, QueryOptions } from './keys'
import API from '../api'

export const useRoomQuery = ({
  options = {},
}: {
  options?: QueryOptions<{ data: RoomResponse[] }>
}): UseQueryResult<{ data: RoomResponse[] }, unknown> =>
  useQuery(API_QUERY_KEYS.getAllRooms, () => API.room.getAll(), {
    ...options,
  })
