import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/lib/constants'
import {
  clearTokens,
  decodeToken,
  getTokens,
  isTokenValid,
  setTokens
} from '@/services/auth'
import { IAccessToken, IGetTokensProps } from '@/services/auth/types'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { toast } from 'react-toastify'
import { IAuthContext } from './types'

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  const [user, setUser] = React.useState(initUser)

  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()

  React.useEffect(() => {
    const cookies = parseCookies({})
    const token = cookies[REFRESH_TOKEN]
    setIsAuthenticated(Boolean(token))
  }, [])

  function initUser() {
    const cookies = parseCookies({})
    const token = cookies[ACCESS_TOKEN]
    if (!token) return null
    return decodeToken<IAccessToken>(token)
  }

  async function login(values: IGetTokensProps) {
    try {
      setLoading(true)
      const data = await getTokens(values)
      if (!data) throw new Error('auth error')
      const { accessToken, refreshToken } = data
      if (!isTokenValid(accessToken)) throw new Error('invalid Token')
      setTokens({ refreshToken, accessToken })
      const tId = setTimeout(() => {
        setUser(initUser)
        setIsAuthenticated(true)
        setLoading(false)
        router.replace('/')
        clearTimeout(tId)
      }, 100)
    } catch (error: any) {
      setLoading(false)
      toast.error('Что-то пошло не так', {
        toastId: 'auth-error'
      })
    }
  }

  function logout() {
    clearTokens()
    setUser(null)
    setIsAuthenticated(false)
    router.replace('/login')
  }

  const memoedValue = React.useMemo(
    () => ({
      isAuthenticated,
      loading,
      user,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, user, isAuthenticated]
  )

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}

export default AuthProvider
