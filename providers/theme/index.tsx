import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { ToastContainer } from 'react-toastify'
import { parseCookies, setCookie } from 'nookies'
import React from 'react'
import { AppThemeContextType, ThemeType } from './types'
import { getTheme } from './getTheme'
import { ConfirmProvider } from 'material-ui-confirm'
import { APP_THEME, SECURE_COOKIE } from '@/lib/constants'
import { getResolution } from '@/lib/utils'

const ThemeContext = React.createContext<AppThemeContextType>({
  mode: 'dark',
  toggleTheme: () => undefined
})

const AppThemeProvider: React.FC = ({ children }) => {
  const isMobile = getResolution() === 'MOBILE'

  const [themeMode, setThemeMode] = React.useState<ThemeType>('dark')

  React.useEffect(() => {
    const cookies = parseCookies({})
    let initialThemeMode = cookies[APP_THEME] ? (cookies[APP_THEME] as ThemeType) : 'dark'
    setCookie({}, APP_THEME, initialThemeMode, {
      path: '/',
      maxAge: 10 * 365 * 24 * 60 * 60,
      secure: SECURE_COOKIE
    })
    setThemeMode(initialThemeMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleTheme = () => {
    const mode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(mode)
    setCookie({}, APP_THEME, mode, {
      path: '/',
      secure: SECURE_COOKIE
    })
  }

  const theme = getTheme(themeMode)

  const memoedValue = React.useMemo(
    () => ({
      mode: themeMode,
      toggleTheme
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeMode]
  )

  return (
    <ThemeContext.Provider value={memoedValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ConfirmProvider
          defaultOptions={{
            confirmationText: 'Ок',
            cancellationText: 'Отмена',
            title: 'Внимание',
            description: 'Вы уверены что хотите сделать это?'
          }}
        >
          {children}
        </ConfirmProvider>
        <ToastContainer
          position={isMobile ? 'top-center' : 'top-right'}
          pauseOnHover
          hideProgressBar={false}
          theme={memoedValue.mode}
          toastStyle={{
            zIndex: 99999
          }}
        />
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default AppThemeProvider

export const useThemeContext = (): AppThemeContextType => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a AppThemeProvider')
  }
  return context
}
