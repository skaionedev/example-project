import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
import { convertPaymentTypes, formatDateDetail, getStatusColor } from '@/lib/utils'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const OrderRootTable = () => {
  const { data, status, isFetched, isFetching } = useOrdersAllQuery()
  const router = useRouter()

  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
      <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Ид</TableHeaderCell>
            <TableHeaderCell align="left">Имя заказчика</TableHeaderCell>
            <TableHeaderCell align="left">Номер телефона</TableHeaderCell>
            <TableHeaderCell align="left">Время заказа</TableHeaderCell>
            <TableHeaderCell align="left">Тип оплаты</TableHeaderCell>
            <TableHeaderCell align="left">Сумма</TableHeaderCell>
            <TableHeaderCell align="left">Статус заказа</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TablePlaceholder
            status={status}
            length={data?.count}
            isFetching={isFetching && !isFetched}
          />

          {status === 'success' &&
            data?.rows?.map(row => (
              <TableRow
                hover
                key={row.order_id}
                sx={{ cursor: 'pointer' }}
                onClick={() => router.push(`/orders/${row.order_id}`)}
              >
                <TableCell>{row.order_id}</TableCell>
                <TableCell align="left">{row.user.name}</TableCell>
                <TableCell align="left">{row.user.phone}</TableCell>
                <TableCell align="left">{formatDateDetail(row.createdAt)}</TableCell>
                <TableCell align="left">
                  <Chip label={convertPaymentTypes(row.payment_method).name} />
                </TableCell>
                <TableCell align="left">{row.total}</TableCell>
                <TableCell align="left">
                  <Chip
                    label={row.statusDetail.name}
                    color={getStatusColor(row.statusDetail).color}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderRootTable
