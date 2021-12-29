import type { IAccessToken, IGetTokensProps } from '@/services/auth/types'

export interface IAuthContext {
  isAuthenticated: boolean
  user?: IAccessToken | null
  loading: boolean
  login: (values: IGetTokensProps) => Promise<void>
  logout: () => void
}
