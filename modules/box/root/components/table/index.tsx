import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useBoxesAllQuery } from '@/hooks/queries/boxes/useBoxesAllQuery'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
import { formatDateDetail } from '@/lib/utils'
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

const BoxRootTable = () => {
  const { data, status, isFetched, isFetching } = useBoxesAllQuery()
  const router = useRouter()

  console.log(data)

  function goToDetail(id: number) {
    router.push(`/boxes/${id}`)
  }

  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
      <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Ид</TableHeaderCell>
            <TableHeaderCell align="left">Название</TableHeaderCell>
            <TableHeaderCell align="left">Трейлер</TableHeaderCell>
            <TableHeaderCell align="left">Дата создания</TableHeaderCell>

            <TableHeaderCell align="left">Статус </TableHeaderCell>
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
                key={row.id}
                sx={{ cursor: 'pointer' }}
                onClick={() => goToDetail(row.id)}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.name_truck}</TableCell>
                <TableCell align="left">{formatDateDetail(row.createdAt)}</TableCell>
                <TableCell align="left">{row.statusDetail.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BoxRootTable
