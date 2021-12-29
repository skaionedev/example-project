export interface IStatus {
  code: TStatusCode
  id: number
  name: string
}

export type TStatusCode =
  | 'accepted'
  | 'rejected'
  | 'pending'
  | 'stock_tr'
  | 'stock_tm'
  | 'in_truck'
