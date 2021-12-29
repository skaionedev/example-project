import { IOrderProductFull } from '../orders/types'
import { TStatusCode } from '../statuses/types'

export interface IBox {
  createdAt: string
  id: number
  name: string
  name_truck: string
  status: TStatusCode
  statusDetail: { id: number; code: TStatusCode; name: string }
  updatedAt?: string
}
