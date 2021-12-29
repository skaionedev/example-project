import { styled } from '@mui/material/styles'

export const StyledGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 14px;
`

export const StyledListTitle = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    /* color: ${({ theme }) => theme.palette.primary.main}; */
    font-size: 16px;
    font-weight: 600;
  }
`
export const StyledListItem = styled('div')`
  display: flex;
  align-items: center;
  column-gap: 6px;

  span:nth-of-type(1) {
    opacity: 0.7;
    color: inherit;
  }
  div {
    font-weight: 600;
  }
`
