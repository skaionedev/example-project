import useOrderNotificationHook from '@/hooks/notifications/order'
import { getResolution } from '@/lib/utils'
import Head from 'next/head'
import { parseCookies, setCookie } from 'nookies'
import React from 'react'
import AppHeader from '../header'
import AppSidebar from '../sidebar'
import { StyledBox, StyledPaper } from './styles'

const LayoutContainer: React.FC = ({ children }) => {
  const isMobile = getResolution() === 'MOBILE'
  const { counts, favIconLink } = useOrderNotificationHook()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true)

  React.useEffect(() => {
    const DRAWER_STATE = parseCookies({})['ADMIN_DRAWER_STATE']
    const state = DRAWER_STATE ? DRAWER_STATE === 'true' : true
    setIsDrawerOpen(isMobile ? false : state)
  }, [])

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev)
    if (isMobile) return
    setCookie({}, 'ADMIN_DRAWER_STATE', `${!isDrawerOpen}`, {
      path: '/',
      maxAge: 10 * 365 * 24 * 60 * 60
    })
  }

  return (
    <>
      <Head>
        <link rel="icon" href={favIconLink} key="favicon" id="favicon" />
        <title key="head-title">
          {counts > 0 ? `(${counts}) Dashboard` : 'Dashboard'}
        </title>
      </Head>

      <StyledPaper>
        <AppHeader toggle={toggleDrawer} />
        <AppSidebar isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
        <StyledBox>{children}</StyledBox>
      </StyledPaper>
    </>
  )
}

export default LayoutContainer
