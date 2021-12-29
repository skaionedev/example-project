import api from '@/lib/axios'
import { useAuthContext } from '@/providers/auth'
import { useQuery, UseQueryResult } from 'react-query'
import { IStatus } from './types'

type QueryType = () => UseQueryResult<IStatus[], unknown>

export const useStatusesAllQuery: QueryType = () => {
  const { isAuthenticated } = useAuthContext()

  return useQuery(
    ['statuses-all', isAuthenticated],
    async () => {
      const { data } = await api.get(`/statuses`)
      return data
    },
    {
      enabled: isAuthenticated,
      staleTime: Infinity,
      refetchOnMount: false
    }
  )
}
