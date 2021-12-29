import api from '@/lib/axios'
import { filterOutFalsyItems } from '@/lib/utils'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import { IUser } from './types'

interface Response {
  count: number
  rows: IUser[]
}
type QueryType = () => UseQueryResult<Response, unknown>

export const useUsersAllQuery: QueryType = () => {
  const { isAuthenticated, user } = useAuthContext()
  const { query } = useRouter()

  const params = filterOutFalsyItems({
    limit: 10,
    page: query.page ?? 1,
    search: query.search ?? ''
  })

  return useQuery(
    ['users-all', params, isAuthenticated, user],
    async ({ signal }) => {
      const { data } = await api.get('/users', { params, signal })
      return data
    },
    {
      enabled: isAuthenticated,
      keepPreviousData: true,
      refetchOnMount: true
    }
  )
}
