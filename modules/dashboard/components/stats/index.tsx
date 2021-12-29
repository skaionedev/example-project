import { useOrdersStatsQuery } from '@/hooks/queries/orders/useOrdersStatsQuery'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import { StyledGrid, StyledListItem } from './styles'

const DashboardStats = () => {
  const { data, status } = useOrdersStatsQuery()
  return (
    <>
      <Typography color="primary" variant="h6">
        Статистика
      </Typography>
      <StyledGrid>
        {data && (
          <StatCard
            title="Всего"
            quantity={data?.ordersCount}
            total={data?.ordersTotalPrice}
          />
        )}
        {data?.statuses?.map(item => (
          <StatCard
            key={item.code}
            title={item.name}
            quantity={item.ordersCount}
            total={item.ordersTotalPrice}
          />
        ))}
      </StyledGrid>
    </>
  )
}

export default DashboardStats

interface Props {
  title: string
  quantity: number
  total: number
}

function StatCard({ total, title, quantity }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <StyledListItem>
          {/* <span>Статус:</span> */}
          <div className="title">{title}</div>
        </StyledListItem>
        <Divider sx={{ my: 1 }} />
        <StyledListItem>
          <span>Кол-во:</span>
          <div>{quantity} шт.</div>
        </StyledListItem>
        <StyledListItem>
          <span>Сумма:</span>
          <div>{total.toFixed(2)} ТМТ</div>
        </StyledListItem>
      </CardContent>
    </Card>
  )
}
