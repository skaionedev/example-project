import AppPagination from '@/components/common/pagination'
import { useBoxesAllQuery } from '@/hooks/queries/boxes/useBoxesAllQuery'
import { Card } from '@mui/material'
import React from 'react'
import BoxRootTable from '../table'
import BoxRootTableHeader from '../table-header'

const BoxRootContainer = () => {
  const { data } = useBoxesAllQuery()

  const pages = data?.count ? Math.ceil(data?.count / 10) : 1
  return (
    <Card variant="outlined">
      <BoxRootTableHeader />
      <BoxRootTable />
      <AppPagination pages={pages} />
    </Card>
  )
}

export default BoxRootContainer
