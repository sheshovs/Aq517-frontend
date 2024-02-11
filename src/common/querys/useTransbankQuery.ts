import { UseQueryResult, useQuery } from 'react-query'
import { API_QUERY_KEYS, QueryOptions } from './keys'
import API from '../api'
import { TransactionResponse } from '../types/transaction'

export const useTransbankConfirmQuery = ({
  token,
  options = {},
}: {
  token: string
  options?: QueryOptions<{ data: TransactionResponse }>
}): UseQueryResult<{ data: TransactionResponse }, unknown> =>
  useQuery(API_QUERY_KEYS.confirmTransaction(token), () => API.transbank.confirm(token), {
    ...options,
  })
