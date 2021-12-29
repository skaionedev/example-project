import api from '@/lib/axios'
import { filterOutFalsyItems } from '@/lib/utils'
import { useAuthContext } from '@/providers/auth'
import { useRouter } from 'next/router'
import { useQuery, UseQueryResult } from 'react-query'
import { IProductFull } from './types'

type QueryType = () => UseQueryResult<IProductFull, unknown>

export const useProductsOneQuery: QueryType = () => {
  const { isAuthenticated } = useAuthContext()
  const { locale, query } = useRouter()

  const productId = query.id ?? ''

  return useQuery(
    ['product-one', isAuthenticated, productId],
    async () => {
      const { data } = await api.get(`/admin/products/${productId}`)
      return data
    },
    {
      enabled: isAuthenticated && Boolean(productId),
      keepPreviousData: true,
      refetchOnMount: true
    }
  )
}
