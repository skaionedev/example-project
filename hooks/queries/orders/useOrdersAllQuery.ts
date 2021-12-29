import api from '@/lib/axios'
import { filterOutFalsyItems } from '@/lib/utils'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import { IOrder, IOrderProductShort } from './types'

interface Response {
  count: number
  rows: IOrder<IOrderProductShort>[]
}
type QueryType = () => UseQueryResult<Response, unknown>

export const useOrdersAllQuery: QueryType = () => {
  const { isAuthenticated, user } = useAuthContext()
  const { locale, query } = useRouter()

  const params = filterOutFalsyItems({
    limit: 10,
    page: query.page ?? 1,
    search: query.search ?? '',
    status: query.status ?? null
  })

  return useQuery(
    ['orders-all', params, isAuthenticated, user],
    async ({ signal }) => {
      const { data } = await api.get('/admin/orders', { params, signal })
      return data
    },
    {
      enabled: isAuthenticated,
      keepPreviousData: true,
      refetchOnMount: true
    }
  )
}
