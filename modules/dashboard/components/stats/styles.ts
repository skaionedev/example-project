import { styled } from '@mui/material/styles'

export const StyledGrid = styled('div')`
  /* margin-top: 24px; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 14px;
`

export const StyledListItem = styled('div')`
  display: flex;
  align-items: center;
  column-gap: 6px;
  span:nth-of-type(1) {
    opacity: 0.7;
    color: inherit;
  }
  .title {
    /* color: ${({ theme }) => theme.palette.primary.main}; */
    text-transform: uppercase;
    font-size: 18px;
  }
  div {
    font-weight: 600;
  }
`
