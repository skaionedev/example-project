import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { StyledBreadcrumbs, StyledLink, StyledWrapper } from './styles'

interface Props {
  back?: string
  backLink?: string
  current?: string | number
}

const AppBreadcrumbs: React.FC<Props> = props => {
  const { back = 'назад', current, backLink = '/', children } = props
  const router = useRouter()
  return (
    <StyledWrapper>
      <StyledBreadcrumbs>
        <StyledLink as="div" onClick={() => router.back()}>
          <BsArrowLeft size={18} style={{ marginRight: 6 }} />
          {back}
        </StyledLink>
        {current && (
          <Typography noWrap color="text.primary">
            {current}
          </Typography>
        )}
      </StyledBreadcrumbs>
      {children}
    </StyledWrapper>
  )
}

export default AppBreadcrumbs
