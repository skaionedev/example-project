import React from 'react'
import { StyledGrid, StyledWrapper } from './styles'

const AppFilters: React.FC = ({ children }) => {
  return (
    <StyledWrapper>
      <StyledGrid>{children}</StyledGrid>
    </StyledWrapper>
  )
}

export default AppFilters
