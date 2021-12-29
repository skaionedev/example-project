import AppBreadcrumbs from '@/components/common/breadcrumbs'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { Card } from '@mui/material'
import React from 'react'
import OrderDetailOrderStatus from '../order-status'
import OrderDetailTable from '../table'
import OrderDetailTableHeader from '../table-header'

const OrderDetailContainer = () => {
  const { data } = useOrdersOneQuery()
  return (
    <>
      <AppBreadcrumbs current={data?.order_id && `заказ №${data?.order_id}`}>
        {data?.order_id && <OrderDetailOrderStatus />}
      </AppBreadcrumbs>
      <Card variant="outlined">
        <OrderDetailTableHeader />
        <OrderDetailTable />
      </Card>
    </>
  )
}

export default OrderDetailContainer
