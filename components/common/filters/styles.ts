import { styled } from '@mui/material/styles'

export const StyledWrapper = styled('div')`
  padding: 10px 12px;
`

export const StyledGrid = styled('div')`
  display: flex;
  ${({ theme }) => theme.breakpoints.up('md')} {
    flex-direction: row !important;
    column-gap: 16px;
  }
  ${({ theme }) => theme.breakpoints.up('xs')} {
    flex-direction: column;
    row-gap: 14px;
  }
`
