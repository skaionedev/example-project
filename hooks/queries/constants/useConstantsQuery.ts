import api from '@/lib/axios'
import { useAuthContext } from '@/providers/auth'
import { useQuery, UseQueryResult } from 'react-query'
import { IConstant } from './types'

type QueryType = () => UseQueryResult<IConstant[], unknown>

export const useConstantsQuery: QueryType = () => {
  const { isAuthenticated } = useAuthContext()

  return useQuery(
    ['constants', isAuthenticated],
    async () => {
      const { data } = await api.get(`/constants`)
      return data
    },
    {
      enabled: isAuthenticated,
      staleTime: Infinity,
      refetchOnMount: false
    }
  )
}
