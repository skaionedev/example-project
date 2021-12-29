import { Breadcrumbs, Link } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  ${({ theme }) => theme.breakpoints.down('md')} {
    flex-direction: column;
    row-gap: 10px;
    align-items: flex-start;
  }
`

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  ol {
    flex-wrap: nowrap;
    position: relative;
    overflow: hidden;
    max-width: calc(100vw - 24px);
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding-left: 2px;
  }
`

export const StyledLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.25s ease-out;
  :hover {
    opacity: 0.85;
  }
`
