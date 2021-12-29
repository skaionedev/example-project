import ListTile from '@/components/common/list-tile'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { formatDateDetail, convertPaymentTypes } from '@/lib/utils'
import { Stack } from '@mui/material'
import React from 'react'
import {
  BsFillCalendarEventFill,
  BsCashStack,
  BsFillCreditCard2BackFill
} from 'react-icons/bs'
import { FaTruckLoading, FaUser } from 'react-icons/fa'
import { MdCheck, MdContactless, MdSmartphone } from 'react-icons/md'
import { GiCash } from 'react-icons/gi'
const OrderDetailTableDetail = () => {
  const { data } = useOrdersOneQuery()
  if (!data) return null

  const payment = convertPaymentTypes(data?.payment_method)

  const paymentIcon =
    payment.code === 'terminal' ? (
      <MdContactless size={24} />
    ) : payment.code === 'online' ? (
      <BsFillCreditCard2BackFill size={24} />
    ) : (
      <BsCashStack size={24} />
    )

  return (
    <Stack direction="row" alignItems="center" sx={{ py: 1 }}>
      <ListTile label="Имя" bold value={data?.user.name} icon={<FaUser size={24} />} />
      <ListTile
        label="Телефон"
        bold
        value={data?.user.phone}
        icon={<MdSmartphone size={24} />}
      />
      <ListTile
        label="Дата заказа"
        value={formatDateDetail(data.createdAt)}
        icon={<BsFillCalendarEventFill size={24} />}
      />
      <ListTile label="Тип оплаты" value={payment.name} icon={paymentIcon} />
      {/* <ListTile
        label="Доставка"
        value={data?.shipping_price}
        icon={<FaTruckLoading size={24} />}
      />
      <ListTile
        label="Подтвержден"
        value={data?.is_confirmed ? 'да' : 'нет'}
        icon={<MdCheck size={24} />}
      /> */}

      <ListTile bold label="Cумма" value={data?.total} icon={<GiCash size={24} />} />
    </Stack>
  )
}

export default OrderDetailTableDetail
