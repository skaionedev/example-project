import { Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

interface MyListProps {
  label: string
  value: string | number
  bold?: boolean
  icon?: JSX.Element
}
const ListTile = (props: MyListProps) => {
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

export default ListTile
