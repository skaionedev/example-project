import api from '@/lib/axios'
import { filterOutFalsyItems } from '@/lib/utils'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import type { IBox } from './types'

interface Response {
  count: number
  rows: IBox[]
}
type QueryType = () => UseQueryResult<Response, unknown>

export const useBoxesAllQuery: QueryType = () => {
  const { isAuthenticated, user } = useAuthContext()
  const { locale, query } = useRouter()

  const params = filterOutFalsyItems({
    limit: 10,
    page: query.page ?? 1,
    search: query.search ?? ''
  })

  return useQuery(
    ['boxes-all', params, isAuthenticated, user],
    async ({ signal }) => {
      const { data } = await api.get('/admin/boxes', { params, signal })
      return data
    },
    {
      enabled: isAuthenticated,
      keepPreviousData: true,
      refetchOnMount: true
    }
  )
}
