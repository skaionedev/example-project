import { useAuthContext } from '@/providers/auth'
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import React from 'react'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'

interface Props {
  closeDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsUserSection = ({ closeDrawer }: Props) => {
  const { logout, user, isAuthenticated } = useAuthContext()
  const exit = () => {
    closeDrawer(false)
    logout()
  }
  return (
    <>
      {isAuthenticated && (
        <>
          <Typography
            variant="overline"
            sx={{ paddingBottom: '6px', display: 'block', opacity: 0.7 }}
          >
            Аккаунт
          </Typography>

          <ListItem
            sx={{ paddingLeft: 0 }}
            dense
            secondaryAction={
              <Stack direction="row" sx={{ marginRight: '-16px' }}>
                <Tooltip title="Выход" onClick={exit}>
                  <IconButton edge="end" aria-label="logout" size="small">
                    <FaSignOutAlt size={16} />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          >
            <ListItemAvatar sx={{ minWidth: 36 }}>
              <Avatar sx={{ width: 28, height: 28 }} alt={'user'}>
                <FaUserCircle size={22} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="body2">{user && user.email}</Typography>}
            />
          </ListItem>
        </>
      )}
    </>
  )
}

export default SettingsUserSection
