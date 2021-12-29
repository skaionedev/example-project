import AppBreadcrumbs from '@/components/common/breadcrumbs'
import { useBoxesOneQuery } from '@/hooks/queries/boxes/useBoxesOneQuery'
import { Card } from '@mui/material'
import React from 'react'
import BoxDetailInfo from '../info'
import BoxDetailTable from '../table'
import BoxDetailTableHeader from '../table-header'
import { StyledWrapper } from './styles'

const BoxDetailContainer = () => {
  const { data } = useBoxesOneQuery()
  return (
    <>
      <AppBreadcrumbs current={data?.id} />
      <StyledWrapper>
        <Card variant="outlined">
          <BoxDetailTableHeader />
          <BoxDetailTable />
        </Card>
        <BoxDetailInfo />
      </StyledWrapper>
    </>
  )
}

export default BoxDetailContainer
