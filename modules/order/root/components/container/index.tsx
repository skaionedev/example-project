import { Card } from '@mui/material'
import React from 'react'
import OrderRootTableHeader from '../table-header'
import OrderRootTable from '../table'
import AppPagination from '@/components/common/pagination'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'

const OrderRootContainer = () => {
  const { data } = useOrdersAllQuery()

  const pages = data?.count ? Math.ceil(data?.count / 10) : 1

  return (
    <Card variant="outlined">
      <OrderRootTableHeader />
      <OrderRootTable />
      <AppPagination pages={pages} />
    </Card>
  )
}

export default OrderRootContainer
