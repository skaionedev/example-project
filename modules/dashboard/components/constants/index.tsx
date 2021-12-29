import { useConstantsQuery } from '@/hooks/queries/constants/useConstantsQuery'
import { getConstantsName } from '@/lib/utils'
import { Card, CardContent, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import { StyledListItem, StyledListTitle, StyledGrid } from './styles'

import { FaPen } from 'react-icons/fa'
import DashboarConstantEdit from '../constant-edit'
import { IConstant } from '@/hooks/queries/constants/types'

const DashboardContants = () => {
  const { data } = useConstantsQuery()
  return (
    <>
      <Typography color="primary" variant="h6">
        Константы
      </Typography>
      <StyledGrid>
        {data?.map(c => (
          <MyCard key={c.key} constant={c} />
        ))}
      </StyledGrid>
    </>
  )
}

export default DashboardContants

interface Props {
  constant: IConstant
}

function MyCard({ constant }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <StyledListTitle>
          <div className="title">{getConstantsName(constant.key)}</div>
          <DashboarConstantEdit constant={constant}>
            <IconButton size="small">
              <FaPen size={14} />
            </IconButton>
          </DashboarConstantEdit>
        </StyledListTitle>
        <Divider sx={{ my: 1 }} />
        <StyledListItem>
          <span>Значение:</span>
          <div>{constant.value} </div>
        </StyledListItem>
      </CardContent>
    </Card>
  )
}
