import AppPagination from '@/components/common/pagination'
import { useProductsAllQuery } from '@/hooks/queries/products/useProductsAllQuery'
import { Card } from '@mui/material'
import React from 'react'
import ProductRootTable from '../table'
import ProductRootTableHeader from '../table-header'

const ProductRootContainer = () => {
  const { data } = useProductsAllQuery()
  const pages = data?.count ? Math.ceil(data?.count / 10) : 1
  return (
    <Card variant="outlined">
      <ProductRootTableHeader />
      <ProductRootTable />
      <AppPagination pages={pages} />
    </Card>
  )
}

export default ProductRootContainer
