export interface IConstant {
  const_id: string
  createdAt: string
  key: TConstantKey
  value: string
}

export type TConstantKey =
  | 'inc_percent'
  | 'delivery_day'
  | 'usd_price'
  | 'usd_manat'
  | 'usd_lira'
  | 'product_percent'
