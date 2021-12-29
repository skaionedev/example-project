import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledPaper = styled(Paper)`
  display: flex;
  min-height: 100vh;
  width: 100%;
  color: ${props => props.theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.background.default};
`

export const StyledBox = styled('div')`
  width: 100%;
  min-height: 100%;
  max-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
  ${({ theme }) => theme.breakpoints.up('xs')} {
    padding: 74px 8px 8px 8px;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 90px 20px 20px 20px;
  }
`
