import { styled } from '@mui/material/styles'
import { AppBar, IconButton, Paper, Typography } from '@mui/material'

export const StyledAppBar = styled(AppBar)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  background: ${({ theme }) => (theme.palette.mode === 'dark' ? '#2D333B' : '#fff')};
`

export const StyledPaper = styled(Paper)`
  background: ${({ theme }) => (theme.palette.mode === 'dark' ? '#2D333B' : '#fff')};
  border-bottom: ${({ theme }) => '1px solid ' + theme.palette.divider};
  box-shadow: none;
`

export const StyledTitle = styled(Typography)`
  color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#fff' : '#222')};
  text-decoration: none;
  user-select: none;
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
`

export const StyledIconButton = styled(IconButton)`
  margin-right: 8px;
  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-left: -12px;
  }
`
