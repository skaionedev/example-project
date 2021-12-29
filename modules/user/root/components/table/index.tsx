import TablePlaceholder from '@/components/common/table/placeholder'
import { TableHeaderCell } from '@/components/styled/TableHeaderCell'
import { useUsersAllQuery } from '@/hooks/queries/users/useUsersAllQuery'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React from 'react'

const UserRootTable = () => {
  const { data, status, isFetched, isFetching } = useUsersAllQuery()

  return (
    <TableContainer sx={{ maxHeight: 'calc(100vh - 260px)', position: 'relative' }}>
      <Table stickyHeader style={{ position: 'relative', minHeight: 120 }}>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Ид</TableHeaderCell>
            <TableHeaderCell align="left">Имя </TableHeaderCell>
            <TableHeaderCell align="left">Фамилия</TableHeaderCell>
            <TableHeaderCell align="left">Телефон</TableHeaderCell>
            <TableHeaderCell align="left">Еmail</TableHeaderCell>
            <TableHeaderCell align="left">Роль</TableHeaderCell>
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
              <TableRow hover key={row.user_id}>
                <TableCell>{row.user_id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.surname}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">
                  <Chip label={row.role} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserRootTable
