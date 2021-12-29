import { useOrdersStatsQuery } from '@/hooks/queries/orders/useOrdersStatsQuery'
import {
  Badge,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Tooltip
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { getRoutes } from './routes'
import { StyledDrawer } from './styles'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const container =
  process.browser && window !== undefined ? () => window.document.body : undefined

const AppSidebar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { data: counts } = useOrdersStatsQuery()

  const routes = getRoutes()

  const tabletAndMobile = useMediaQuery('(max-width:769px)')

  const orderCount = counts ? counts.pending.ordersCount : 0

  const router = useRouter()

  React.useEffect(() => {
    const isMobile = window.innerWidth <= 768
    const eventHandler = () => setIsOpen(false)
    if (!isMobile) return

    router.events.on('routeChangeStart', eventHandler)
    return () => {
      router.events.off('routeChangeStart', eventHandler)
    }
  }, [])

  if (router.asPath.includes('/login')) {
    return null
  }

  const drawerContent = (
    <>
      {!tabletAndMobile && <Toolbar />}

      <List component="nav">
        {routes.map((group, indx) => {
          return (
            <React.Fragment key={group.label}>
              <List
                subheader={
                  tabletAndMobile || isOpen ? (
                    <ListSubheader
                      sx={{
                        lineHeight: '32px',
                        paddingLeft: '14px',
                        fontSize: '0.75rem',
                        fontWeight: 'normal'
                      }}
                    >
                      {group.label}
                    </ListSubheader>
                  ) : null
                }
              >
                {group.children.map(link => {
                  if (link.url === '/orders') {
                    return (
                      <NextLink
                        href={`${link.url}`}
                        passHref
                        prefetch={false}
                        key={link.url}
                      >
                        <Tooltip title={isOpen ? '' : link.title} placement="left-end">
                          <ListItemButton
                            dense
                            selected={router.asPath.includes(link.url)}
                            disabled={link.disabled}
                          >
                            <Badge
                              badgeContent={orderCount}
                              color="primary"
                              invisible={orderCount <= 0 || !orderCount}
                              max={99}
                              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            >
                              <ListItemIcon>{link.icon}</ListItemIcon>
                            </Badge>

                            <ListItemText primary={link.title} />
                          </ListItemButton>
                        </Tooltip>
                      </NextLink>
                    )
                  }

                  const isSelectedRoute =
                    link.url === '/'
                      ? router.asPath === link.url
                      : router.asPath.includes(link.url)

                  return (
                    <NextLink
                      href={`${link.url}`}
                      passHref
                      prefetch={false}
                      key={link.url}
                    >
                      <Tooltip title={isOpen ? '' : link.title} placement="left-end">
                        <ListItemButton
                          dense
                          selected={isSelectedRoute}
                          disabled={link.disabled}
                        >
                          <ListItemIcon>{link.icon}</ListItemIcon>
                          <ListItemText primary={link.title} />
                        </ListItemButton>
                      </Tooltip>
                    </NextLink>
                  )
                })}
              </List>
              {indx !== routes.length - 1 && <Divider />}
            </React.Fragment>
          )
        })}
      </List>
    </>
  )

  return (
    <>
      {tabletAndMobile && (
        <Drawer
          container={container}
          variant="temporary"
          onClose={() => setIsOpen(false)}
          sx={{
            zIndex: theme => theme.zIndex.drawer + 2,
            '& .MuiPaper-root': {
              width: 200,
              bgcolor: theme => theme.palette.background.paper,
              backgroundImage: 'none'
            }
          }}
          open={isOpen}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      {!tabletAndMobile && (
        <StyledDrawer variant="permanent" open={isOpen}>
          {drawerContent}
        </StyledDrawer>
      )}
    </>
  )
}

export default AppSidebar
