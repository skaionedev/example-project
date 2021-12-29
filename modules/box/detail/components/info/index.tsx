import { useBoxesOneQuery } from '@/hooks/queries/boxes/useBoxesOneQuery'
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'
import { MdLocationOn } from 'react-icons/md'
import { FaTruck, FaTag } from 'react-icons/fa'

interface MyListProps {
  label: string
  value: string | number
  bold?: boolean
  icon?: JSX.Element
}
const MyListItem = (props: MyListProps) => {
  const { label, value, bold = false, icon } = props

  const primaryText = (
    <Typography
      variant="caption"
      sx={{ opacity: 0.7, display: 'block', marginTop: '-2px', userSelect: 'none' }}
    >
      {label}:
    </Typography>
  )
  const secondaryText = (
    <Typography variant="body2" sx={{ fontWeight: bold ? 'bold' : 'normal' }}>
      {value}
    </Typography>
  )
  return (
    <ListItem dense>
      {icon && <ListItemIcon sx={{ minWidth: '36px' }}>{icon}</ListItemIcon>}

      <ListItemText sx={{ my: 0.2 }} primary={primaryText} secondary={secondaryText} />
    </ListItem>
  )
}

const BoxDetailInfo = () => {
  const { data } = useBoxesOneQuery()
  if (!data) return null

  return (
    <Card variant="outlined">
      <Typography color="primary" sx={{ py: 1, px: 2 }}>
        Инфо о контейнере
      </Typography>
      <Divider />
      <List>
        <MyListItem
          label="Статус"
          value={data?.statusDetail.name}
          icon={<MdLocationOn size={20} />}
        />
        <MyListItem label="Трейлер" value={data?.name_truck} icon={<FaTruck />} />
        <MyListItem label="Название" value={data?.name} icon={<FaTag />} />
      </List>
    </Card>
  )
}

export default BoxDetailInfo
