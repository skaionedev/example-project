import TableToolbar from '@/components/common/table/toolbar'
import { useBoxesOneQuery } from '@/hooks/queries/boxes/useBoxesOneQuery'
import { Chip } from '@mui/material'
import React from 'react'

const BoxDetailTableHeader = () => {
  const { data } = useBoxesOneQuery()
  return (
    <TableToolbar
      title="Товары"
      titleCount={data?.orderedProducts.length || 0}
      titleCountTooltip="Количество товаров"
    />
  )
}

export default BoxDetailTableHeader
