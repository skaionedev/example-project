import { Stack, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaBars } from 'react-icons/fa'
import AppSettings from '../settings'
import { StyledAppBar, StyledIconButton, StyledPaper, StyledTitle } from './styles'

interface Props {
  toggle: () => void
}

const AppHeader: React.FC<Props> = ({ toggle }) => {
  const router = useRouter()

  const isLoginPage = router.asPath.includes('/login')

  return (
    <>
      <StyledAppBar position="fixed" elevation={0}>
        <StyledPaper>
          <Toolbar>
            <Stack direction="row" alignItems="center" spacing={1}>
              {!isLoginPage && (
                <StyledIconButton size="small" onClick={toggle}>
                  <FaBars />
                </StyledIconButton>
              )}

              <NextLink href="/" passHref>
                <StyledTitle as="a" variant="h6">
                  Dashboard
                </StyledTitle>
              </NextLink>
            </Stack>

            <Box component="div" sx={{ flexGrow: 1 }} />
            <Stack direction="row" alignItems="center">
              <AppSettings />
            </Stack>
          </Toolbar>
        </StyledPaper>
      </StyledAppBar>
    </>
  )
}

export default AppHeader
