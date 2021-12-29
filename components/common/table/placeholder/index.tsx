import { TableRow } from '@mui/material'
import React from 'react'
import { StyledLinearProgress, StyledTableCell, StyledText } from './styles'

interface Props {
  status: 'loading' | 'success' | 'error' | 'idle'
  length?: number
  noDataText?: string
  errorText?: string
  isFetching?: boolean
}

const TablePlaceholder = (props: Props) => {
  const {
    status,
    length,
    noDataText = 'Нет данных',
    errorText = 'Проблемы с подключением',
    isFetching = false
  } = props

  const loadingState = (status === 'loading' || isFetching) && (
    <TableRow sx={{ position: 'relative', height: status === 'success' ? 'auto' : 80 }}>
      <StyledTableCell>
        <StyledLinearProgress />
      </StyledTableCell>
    </TableRow>
  )

  const errorState = status === 'error' && !isFetching && (
    <TableRow sx={{ position: 'relative', height: 60 }}>
      <StyledTableCell>
        <StyledText>{errorText}</StyledText>
      </StyledTableCell>
    </TableRow>
  )

  const emptyState = status === 'success' && !isFetching && !length && (
    <TableRow sx={{ position: 'relative', height: 60 }}>
      <StyledTableCell>
        <StyledText>{noDataText}</StyledText>
      </StyledTableCell>
    </TableRow>
  )

  return (
    <>
      {loadingState}
      {errorState}
      {emptyState}
    </>
  )
}

export default TablePlaceholder
