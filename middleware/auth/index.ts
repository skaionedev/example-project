import { ACCESS_TOKEN, REFRESH_TOKEN, REMEMBER_ME } from '@/lib/constants'
import { decodeToken, isTokenExpired } from '@/services/auth'
import { IRefreshToken } from '@/services/auth/types'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface Props {
  req: NextRequest
  res: NextResponse
}

export async function authMiddleware({ req, res }: Props) {
  const refreshTokenString = req.cookies[REFRESH_TOKEN]
  const isLoginPage = req.url.includes('/login')

  // // NO TOKEN IN COOKIE AND ROUTE IS NOT EQAUL LOGIN
  if (!refreshTokenString && !isLoginPage) {
    clearCookies(res)
    return NextResponse.redirect('/login')
  }

  const refreshToken = decodeToken<IRefreshToken>(refreshTokenString)

  const isRefreshTokenExp = refreshToken ? isTokenExpired(refreshToken) : true

  // // RESTRICT ACCESS TO LOGIN PAGE FOR AUTHENTICATED USERS
  if (isLoginPage && !isRefreshTokenExp) {
    return NextResponse.redirect('/users')
  }

  // // REDIRECT TO LOGIN PAGE IF TOKEN IS EXPIRED
  if (!isLoginPage && isRefreshTokenExp) {
    clearCookies(res)
    return NextResponse.redirect('/login')
  }

  return null
}

function clearCookies(res: NextResponse) {
  res.clearCookie(ACCESS_TOKEN)
  res.clearCookie(REFRESH_TOKEN)
  res.clearCookie(REMEMBER_ME)
}
