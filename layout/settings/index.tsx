import { useAuthContext } from '@/providers/auth'
import { useThemeContext } from '@/providers/theme'
import {
  Box,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { FaCog } from 'react-icons/fa'
import SettingsUserSection from './SettingsUserSection'

function AppSettings() {
  const [open, setOpen] = React.useState(false)
  const { mode, toggleTheme } = useThemeContext()
  const { isAuthenticated } = useAuthContext()

  return (
    <>
      <IconButton size="small" color="inherit" onClick={() => setOpen(prev => !prev)}>
        <FaCog size={20} />
      </IconButton>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        elevation={1}
        sx={{ zIndex: theme => theme.zIndex.drawer + 2 }}
      >
        <StyledDrawerBox>
          <SettingsUserSection closeDrawer={setOpen} />
          {isAuthenticated && <Divider sx={{ margin: '20px 0 24px 0' }} />}

          <Typography
            variant="overline"
            sx={{ paddingBottom: '6px', display: 'block', opacity: 0.7 }}
          >
            Настройки
          </Typography>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={mode === 'dark'} onChange={toggleTheme} name="theme" />
                }
                label={
                  <Typography variant="body2">
                    {mode === 'dark' ? 'Темный режим' : 'Светлый режим'}
                  </Typography>
                }
              />
            </FormGroup>
          </FormControl>
        </StyledDrawerBox>
      </Drawer>
    </>
  )
}

export default AppSettings

const StyledDrawerBox = styled(Box)`
  width: 240px;
  padding: 20px;
  min-height: 100vh;
  height: 100%;
  background: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.background.default};
`
