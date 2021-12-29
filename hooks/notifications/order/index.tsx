import { isObjectEmpty } from '@/lib/utils'

import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import { useOrdersStatsQuery } from '@/hooks/queries/orders/useOrdersStatsQuery'
import { useAuthContext } from '@/providers/auth'
import { useOrdersAllQuery } from '@/hooks/queries/orders/useOrdersAllQuery'

const audioURL = `/sound/notification.mp3`

const faviconUrl = `/favicon.svg`
const faviconNotificationUrl = `/favicon-notification.svg`

const useOrderNotificationHook = () => {
  const router = useRouter()
  const { data: counts, status, refetch } = useOrdersStatsQuery()
  const [oldOrderCount, setOldOrderCount] = React.useState({ ...counts })
  const { refetch: OrderListRefetch } = useOrdersAllQuery()
  const audioRef = React.useRef<HTMLAudioElement>()
  const [favIconLink, setFavIconLink] = React.useState(faviconUrl)
  const { isAuthenticated } = useAuthContext()

  React.useEffect(() => {
    if (status !== 'success' || !isAuthenticated) return
    if (counts && isObjectEmpty(oldOrderCount)) {
      setOldOrderCount({ ...counts })
      changeFaviconIfHaveNotification()
      return
    }

    if (!isObjectEmpty(oldOrderCount) && counts) {
      const condition =
        oldOrderCount?.pending?.ordersCount !== null &&
        Number(oldOrderCount?.pending?.ordersCount) < Number(counts?.pending?.ordersCount)

      if (condition) {
        notificateAboutNewOrders()
      } else {
        syncOrdersCount()
      }
    }
    // eslint-disable-next-line
  }, [counts, status, isAuthenticated])

  React.useEffect(() => {
    if (!isAuthenticated) return
    audioRef.current = new Audio(audioURL)
    if (audioRef.current) audioRef.current.volume = 0.5

    let cleanup = false

    let ocTimerId = setInterval(() => {
      if (cleanup) return
      refetch()
    }, 1000 * 30)

    return () => {
      cleanup = true
      clearTimeout(ocTimerId)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  function notificateAboutNewOrders() {
    audioRef?.current && audioRef.current.play()
    setOldOrderCount({ ...counts })
    if (router.asPath.includes('/orders')) {
      OrderListRefetch()
    }
    changeFaviconIfHaveNotification()
    toast.success('У вас новый заказ', {
      autoClose: false
    })
  }

  function changeFaviconIfHaveNotification() {
    const faviconToSet: string =
      Number(counts?.pending?.ordersCount) <= 0 ? faviconUrl : faviconNotificationUrl
    setFavIconLink(faviconToSet)
  }

  function syncOrdersCount() {
    setOldOrderCount({ ...counts })
    changeFaviconIfHaveNotification()
  }

  return { favIconLink, counts: counts?.pending?.ordersCount ?? 0 }
}

export default useOrderNotificationHook
