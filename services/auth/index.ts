import api from '@/lib/axios'
import jwtDecode from 'jwt-decode'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REMEMBER_ME,
  SECURE_COOKIE
} from '../../lib/constants'
import type {
  IAccessToken,
  IGetTokensProps,
  IRefreshToken,
  IStringTokens,
  TDecodeToken
} from './types'

export const getTokens = async (props: IGetTokensProps) => {
  const { email, password, remember } = props

  const { data } = await api.post<IStringTokens>(`/auth/login`, {
    email,
    password
  })

  if (remember) {
    setCookie({}, REMEMBER_ME, 'true', {
      path: '/',
      maxAge: 10 * 365 * 24 * 60 * 60,
      secure: SECURE_COOKIE
    })
  }

  return data
}

export const isTokenValid = (token: string): boolean => {
  try {
    if (!token) throw new Error('invalid token')

    const decoded = jwtDecode(token)

    return Boolean(decoded)
  } catch (error) {
    console.log(error)
    return false
  }
}

export const decodeToken: TDecodeToken = token => {
  try {
    return jwtDecode(token)
  } catch (error) {
    return null
  }
}

export const isTokenExpired = (token: IAccessToken | IRefreshToken): Boolean => {
  const { exp } = token
  if (Date.now() >= exp * 1000) return true
  else return false
}

export function setTokens(props: IStringTokens) {
  const { accessToken, refreshToken } = props

  const decodedRefreshToken = jwtDecode<IRefreshToken>(refreshToken)
  const remember = parseCookies({})[REMEMBER_ME]
  const expTime = (decodedRefreshToken.exp * 1000 - Date.now()) / 1000
  const maxAge = remember ? expTime : undefined

  setCookie({}, ACCESS_TOKEN, accessToken, {
    path: '/',
    maxAge,
    secure: SECURE_COOKIE
  })
  setCookie({}, REFRESH_TOKEN, refreshToken, {
    path: '/',
    maxAge,
    secure: SECURE_COOKIE
  })
}

export function clearTokens() {
  destroyCookie({}, ACCESS_TOKEN, { path: '/' })
  destroyCookie({}, REFRESH_TOKEN, { path: '/' })
  destroyCookie({}, REMEMBER_ME, { path: '/' })
}
