import { TConstantKey } from '@/hooks/queries/constants/types'
import { IStatus } from '@/hooks/queries/statuses/types'

export function htmldecode(str?: string): string {
  if (!process.browser) return ''
  var txt = document.createElement('textarea')
  txt.innerHTML = str || ''
  return txt.value
}

export const isObjectEmpty = (obj: any) => {
  try {
    if (!obj) throw new Error(`argument type is not object or in null value`)

    return Object.keys(obj).length === 0 && obj.constructor === Object
  } catch (error) {
    console.log(error)
  }
}

export function filterOutFalsyItems(obj: any): any {
  const resObj: any = {}
  for (const i in obj) {
    if (obj[i]) {
      resObj[i] = obj[i]
    }
  }
  return resObj
}

export function priceConverter(priceStr: string | number): string {
  const price = +priceStr
  const res = price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'TMT'
  })
  return res
}

type ResolutionType = 'DESKTOP' | 'MOBILE'

export function getResolution(): ResolutionType {
  if (process.browser) {
    return window.innerWidth <= 768 ? 'MOBILE' : 'DESKTOP'
  } else return 'DESKTOP'
}

export const formatDateDetail = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()

  const month = date.getMonth() + 1
  const monthString = String(month)
  const monthToSHow = monthString.length === 2 ? monthString : '0' + monthString

  const day = date.getDate()
  const dayString = String(day)
  const dayToShow = dayString.length === 2 ? dayString : '0' + dayString

  const hours = date.getHours()
  const hoursString = String(hours)
  const hoursToShow = hoursString.length === 2 ? hoursString : '0' + hoursString

  const minutes = date.getMinutes()
  const minutesString = String(minutes)
  const minutesToShow = minutesString.length === 2 ? minutesString : '0' + minutesString

  return `${hoursToShow}:${minutesToShow} - ${dayToShow}.${monthToSHow}.${year}`
}

export type TPaymetns = 'Наличные' | 'Терминал' | 'Онлайн'

export function convertPaymentTypes(type: number): {
  name: TPaymetns
  code: 'cash' | 'terminal' | 'online'
} {
  if (type === 3) {
    return {
      name: 'Онлайн',
      code: 'online'
    }
  } else if (type === 2) {
    return {
      code: 'terminal',
      name: 'Терминал'
    }
  } else {
    return {
      name: 'Наличные',
      code: 'cash'
    }
  }
}

export type TMuiColors =
  | 'error'
  | 'success'
  | 'default'
  | 'warning'
  | 'primary'
  | 'secondary'
  | 'info'

interface IColors {
  color: TMuiColors
}

export function getStatusColor(status: IStatus): IColors {
  if (status?.code === 'in_truck') return { color: 'primary' }
  if (status?.code === 'rejected') return { color: 'error' }
  // if (status.code === '') return { title: 'Завершен', color: 'success' }
  if (status?.code === 'accepted') return { color: 'info' }
  if (status?.code === 'pending') return { color: 'warning' }
  return { color: 'default' }
}

export function getConstantsName(key: TConstantKey): string {
  switch (key) {
    case 'delivery_day':
      return 'Время доставки'
    case 'inc_percent':
      return '% добавочный'
    case 'product_percent':
      return '% товара'
    case 'usd_lira':
      return '1$ -> TL'
    case 'usd_manat':
      return '1$ -> TMT'
    case 'usd_price':
      return 'USD'

    default:
      return ''
  }
}
