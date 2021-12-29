import api from '@/lib/axios'
import { filterOutFalsyItems } from '@/lib/utils'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import { IOrder, IOrderProductFull, IOrderUser } from './types'

interface Response extends IOrder<IOrderProductFull> {
  user: IOrderUser
}

type QueryType = () => UseQueryResult<Response, unknown>

export const useOrdersOneQuery: QueryType = () => {
  const { isAuthenticated } = useAuthContext()
  const { locale, query } = useRouter()

  const orderId = query.id ?? ''

  return useQuery(
    ['orders-all', isAuthenticated, orderId],
    async () => {
      const { data } = await api.get(`/admin/orders/${orderId}`)
      console.log({ SingleOrder: data })

      return data
    },
    {
      enabled: isAuthenticated && Boolean(orderId),
      keepPreviousData: true,
      refetchOnMount: true
    }
  )
}
