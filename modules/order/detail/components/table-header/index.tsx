import TableToolbar from '@/components/common/table/toolbar'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { Button, IconButton, Stack, Tooltip } from '@mui/material'
// import { useOrderAllQuery } from '@/hooks/queries/orders/useOrderAllQuery'
import React from 'react'
import OrderDetailProductInfo from '../product-info'
import { FaUserAlt } from 'react-icons/fa'
import OrderDetailTableDetail from '../table-detail'
import OrderDetailUserInfo from '../user-info'
import OrderDetailOrderInfo from '../order-info'

const OrderDetailTableHeader = () => {
  const { data } = useOrdersOneQuery()
  return (
    <TableToolbar
      title="Инфо о заказе"
      titleCount={data?.orderDetails.length || 0}
      titleCountTooltip="Количество товаров"
      actions={
        <Stack direction="row" spacing={2} alignItems="center">
          <OrderDetailOrderInfo />
          <OrderDetailUserInfo />
        </Stack>
      }
    >
      <OrderDetailTableDetail />
    </TableToolbar>
  )
}

export default OrderDetailTableHeader
