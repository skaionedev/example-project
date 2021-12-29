export interface ITokens {
  accessToken: IAccessToken
  refreshToken: IRefreshToken
}

export interface IStringTokens {
  accessToken: string
  refreshToken: string
}

export interface IGetTokensProps {
  email: string
  password: string
  remember: boolean
}

export interface IAccessToken {
  email: string
  exp: number
  iat: number
  id: number
  role: 'admin'
}

export interface IRefreshToken {
  exp: number
  iat: number
  id: string
}

export type TDecodeToken = <T>(token: string) => T | null
