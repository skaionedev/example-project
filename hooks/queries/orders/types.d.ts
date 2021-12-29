import { IStatus, TStatusCode } from '../statuses/types'

export interface IOrder<T> {
  address: string
  createdAt: string
  delivery_day: number
  is_confirmed: boolean
  loc_id: string
  orderDetails: T[]
  order_id: string
  payment_method: number
  shipping: boolean
  shipping_price: number
  status: TStatusCode
  sub_loc_id: string
  total: number
  updatedAt: string
  user: IOrderUser
  user_id: string
  statusDetail: IStatus
}

export interface IOrderProductShort {
  name: string
  name_ru: string
  od_id: string
  status: TStatusCode
}

export interface IOrderProductFull {
  cargo_price: number
  cat_list: string
  cost_price: string
  count: number
  image: string
  inc_percent: number
  name: string
  name_ru: string
  od_id: string
  order_id: string
  order_id_tr: null | string
  origin_url: string
  price: number
  prod_id: string
  size: string
  status: TStatusCode
  statusDetail: IStatus
  tm_id: number
  usd_price: number
}

interface IOrderUser {
  email: string
  gender: 2
  name: string
  phone: string
  user_id: string
}

export type TOrderStats = {
  [key in TStatusCode]: IOrderStatsItem
} & { ordersCount: number; ordersTotalPrice: number; statuses: IOrderStatsItem[] }

export interface IOrderStatsItem {
  code: TStatusCode
  name: string
  ordersCount: number
  ordersTotalPrice: number
}
