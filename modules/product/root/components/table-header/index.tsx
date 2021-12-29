import TableToolbar from '@/components/common/table/toolbar'
import { useProductsAllQuery } from '@/hooks/queries/products/useProductsAllQuery'
import React from 'react'
import ProductRootFilters from '../filters'

const ProductRootTableHeader = () => {
  const { data } = useProductsAllQuery()
  return (
    <TableToolbar
      title="Товары"
      titleCount={data?.count}
      titleCountTooltip="Количество товаров"
    >
      <ProductRootFilters />
    </TableToolbar>
  )
}

export default ProductRootTableHeader
