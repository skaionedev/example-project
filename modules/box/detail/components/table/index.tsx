import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useBoxesOneQuery } from '@/hooks/queries/boxes/useBoxesOneQuery'
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
import { StyledTitle } from './styles'

const BoxDetailTable = () => {
  const { data, status, isFetched, isFetching } = useBoxesOneQuery()
  const router = useRouter()

  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
      <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">№</TableHeaderCell>
            <TableHeaderCell align="left">Наименование</TableHeaderCell>
            <TableHeaderCell align="left">Размер</TableHeaderCell>

            <TableHeaderCell align="left">Цена</TableHeaderCell>
            <TableHeaderCell align="left">Количество</TableHeaderCell>
            <TableHeaderCell align="left">Сумма</TableHeaderCell>
            <TableHeaderCell align="left">Статус</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TablePlaceholder
            status={status}
            length={data?.orderedProducts.length}
            isFetching={isFetching && !isFetched}
          />

          {status === 'success' &&
            data?.orderedProducts?.map(row => (
              <TableRow hover key={row.od_id}>
                <TableCell>{row.od_id}</TableCell>
                <TableCell align="left">
                  <StyledTitle title={row.name_ru}>{row.name_ru}</StyledTitle>
                </TableCell>
                <TableCell align="left">{row.size}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.count}</TableCell>
                <TableCell align="left">{(row.price * row.count).toFixed(2)}</TableCell>
                <TableCell align="left">
                  <Chip label={row.statusDetail.name} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BoxDetailTable
