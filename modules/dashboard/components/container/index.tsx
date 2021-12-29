import PageStateComponent from '@/components/common/page-state'
import { useConstantsQuery } from '@/hooks/queries/constants/useConstantsQuery'
import { useOrdersStatsQuery } from '@/hooks/queries/orders/useOrdersStatsQuery'
import { useAuthContext } from '@/providers/auth'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import DashboardContants from '../constants'
import DashboardStats from '../stats'
import { Grid } from './styles'

const DashboardContainer = () => {
  const { status } = useOrdersStatsQuery()
  const { user } = useAuthContext()
  return (
    <PageStateComponent status={status}>
      <Card variant="outlined">
        <CardContent>
          {/* <Typography variant="h4">
            Добро пожаловать{user && `, ${user?.email}`}
          </Typography> */}

          <Grid>
            <DashboardStats />
            <Divider sx={{ my: 3 }} />
            <DashboardContants />
          </Grid>
        </CardContent>
      </Card>
    </PageStateComponent>
  )
}

export default DashboardContainer
