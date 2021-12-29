import axios from 'axios'
import { parseCookies } from 'nookies'
import { clearTokens, setTokens } from '../services/auth'
import { API_URL, ACCESS_TOKEN, REFRESH_TOKEN } from './constants'
import Router from 'next/router'
import { IStringTokens } from '@/services/auth/types'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getTokens()[ACCESS_TOKEN]}`
  }
})

let isRefreshing = false
let requests: any[] = []

api.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    const { response, config } = error

    const status = response ? response.status : null

    const isAuthRequest = response.request.responseURL.includes('/login')

    if (status === 401 && !isAuthRequest) {
      if (!isRefreshing) {
        isRefreshing = true

        return refreshToken()
          .then(data => {
            setTokens({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken
            })
            // @ts-ignore: Unreachable code error
            api.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`
            config.headers['Authorization'] = `Bearer ${data.accessToken}`
            requests.forEach(cb => cb(data.accessToken))
            requests = []
            return api(config)
          })
          .catch(() => {
            requests = []
            clearTokens()
            // @ts-ignore: Unreachable code error
            api.defaults.headers['Authorization'] = ''
            if (typeof window !== 'undefined') {
              Router.replace('/login')
            }
          })
          .finally(() => {
            isRefreshing = false
          })
      } else {
        return new Promise(resolve => {
          requests.push((token: string) => {
            config.headers['Authorization'] = `Bearer ${token}`
            resolve(api(config))
          })
        })
      }
    }

    return Promise.reject(error)
  }
)

export default api

function refreshToken() {
  const refreshToken = getTokens()[REFRESH_TOKEN]
  return axios
    .get<IStringTokens>(`${API_URL}/auth/refresh`, {
      headers: { Authorization: `Bearer ${refreshToken}` }
    })
    .then(res => {
      return res.data
    })
}

function getTokens() {
  return process.browser ? parseCookies(null) : {}
}
