import api from '@/lib/axios'
import { useAuthContext } from '@/providers/auth'
import { useQuery, UseQueryResult } from 'react-query'
import { TOrderStats } from './types'

type QueryType = () => UseQueryResult<TOrderStats, unknown>

export const useOrdersStatsQuery: QueryType = () => {
  const { isAuthenticated, user } = useAuthContext()

  return useQuery(
    ['orders-stats', isAuthenticated, user],
    async ({ signal }) => {
      const { data } = await api.get('/admin/orders/statistics', { signal })
      let resp = { ...data }

      data.statuses.map((stat: any) => {
        resp[stat.code] = stat
      })

      return resp
    },
    {
      enabled: isAuthenticated,
      keepPreviousData: true,
      refetchOnMount: false
    }
  )
}
