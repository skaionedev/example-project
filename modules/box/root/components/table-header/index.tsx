import TableToolbar from '@/components/common/table/toolbar'
import { useBoxesAllQuery } from '@/hooks/queries/boxes/useBoxesAllQuery'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'
// import { useOrderAllQuery } from '@/hooks/queries/orders/useOrderAllQuery'
import React from 'react'
import BoxRootFilters from '../filters'

const BoxRootTableHeader = () => {
  return (
    <TableToolbar title="Контейнеры">
      <BoxRootFilters />
    </TableToolbar>
  )
}

export default BoxRootTableHeader
