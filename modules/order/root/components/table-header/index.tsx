import TableToolbar from '@/components/common/table/toolbar'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
// import { useOrderAllQuery } from '@/hooks/queries/orders/useOrderAllQuery'
import React from 'react'
import OrderRootFilters from '../filters'

const OrderRootTableHeader = () => {
  const { data } = useOrdersAllQuery()
  return (
    <TableToolbar title="Заказы" titleCount={data?.count} titleCountTooltip="Количество заказов">
      <OrderRootFilters />
    </TableToolbar>
  )
}

export default OrderRootTableHeader
