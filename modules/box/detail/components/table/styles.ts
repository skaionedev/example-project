import { styled } from '@mui/material/styles'

export const StyledTitle = styled('span')`
  ${({ theme }) => theme.breakpoints.down('md')} {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: initial;
    text-decoration: none;
    font-size: 15px;
    line-height: 18px;
    width: 200px;
  }
`

export const ImageWrapper = styled('div')`
  border-radius: 2;
  position: relative;
  overflow: hidden;
  height: 50px;
  width: 50px;
`
