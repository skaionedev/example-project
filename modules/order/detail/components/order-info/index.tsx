import ListTile from '@/components/common/list-tile'
import AppModal from '@/components/common/modal'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { convertPaymentTypes, formatDateDetail } from '@/lib/utils'
import { IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { BsCashStack, BsFillCalendarEventFill } from 'react-icons/bs'
import { FaBox, FaTruckLoading, FaSlackHash } from 'react-icons/fa'
import { MdCheck, MdContactless } from 'react-icons/md'

const OrderDetailOrderInfo = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { data } = useOrdersOneQuery()
  if (!data) return null
  const openModal = () => setIsOpen(true)

  return (
    <>
      <Tooltip title="Подробности заказа">
        <IconButton size="small" onClick={openModal}>
          <FaBox />
        </IconButton>
      </Tooltip>

      <AppModal
        title="Информация о заказе"
        open={isOpen}
        onClose={setIsOpen}
        disableBackdropClick
        maxWidth="sm"
      >
        <div style={{ marginLeft: -14 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <ListTile
              bold
              label="Дата заказа"
              value={formatDateDetail(data.createdAt)}
              // icon={<BsFillCalendarEventFill size={22} />}
            />
            <ListTile
              bold
              label="Тип оплаты"
              value={convertPaymentTypes(data?.payment_method).name}
              // icon={<MdContactless size={22} />}
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <ListTile
              bold
              label="Ид"
              value={data?.order_id}
              // icon={<FaSlackHash size={22} />}
            />
            <ListTile
              bold
              label="Подтвержден"
              value={data?.is_confirmed ? 'да' : 'нет'}
              // icon={<MdCheck size={22} />}
            />
            <ListTile
              bold
              label="Cумма"
              value={data?.total}
              // icon={<BsCashStack size={22} />}
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <ListTile
              bold
              label="Статус"
              value={data?.statusDetail.name}
              // icon={<MdContactless size={22} />}
            />
            <ListTile
              bold
              label="Доставка"
              value={data?.shipping ? 'да' : 'нет'}
              // icon={<BsCashStack size={22} />}
            />
            <ListTile
              bold
              label="Цена доставки"
              value={data?.shipping_price}
              // icon={<FaTruckLoading size={22} />}
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <ListTile bold label="Дней до доставки" value={data?.delivery_day} />
            <ListTile bold label="Ид локации" value={data?.loc_id} />
            <ListTile bold label="Ид сублокации" value={data?.sub_loc_id} />
          </Stack>
        </div>
      </AppModal>
    </>
  )
}

export default OrderDetailOrderInfo
