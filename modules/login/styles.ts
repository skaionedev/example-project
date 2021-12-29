import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'

export const StyledWrapper = styled('div')`
  max-width: 500px;
  margin: 0 auto;
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-inline: 8px;
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding-inline: 4px;
  }
`

export const StyledCard = styled(Card)`
  width: 100%;
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 26px 18px;
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 26px 12px;
  }
`

export const StyledTitle = styled('div')`
  text-align: center;
  font-size: 46px;
  font-weight: 500;
  opacity: 0.9;
`
export const StyledSubtitle = styled('div')`
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  opacity: 0.8;
  max-width: 95%;
  margin: 0 auto;
  margin-bottom: 14px;
`
