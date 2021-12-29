import ListTile from '@/components/common/list-tile'
import AppModal from '@/components/common/modal'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { FaSlackHash, FaUser, FaUserAlt } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdSmartphone } from 'react-icons/md'

const OrderDetailUserInfo = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { data } = useOrdersOneQuery()
  if (!data) return null

  const openModal = () => setIsOpen(true)

  return (
    <>
      <Tooltip title="Иформация о заказчике">
        <IconButton size="small" onClick={openModal}>
          <FaUserAlt size={16} />
        </IconButton>
      </Tooltip>

      <AppModal
        title="Информация о заказчике"
        open={isOpen}
        onClose={setIsOpen}
        disableBackdropClick
        maxWidth="sm"
      >
        <div style={{ marginLeft: -14 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <ListTile
              label="Ид"
              bold
              value={data?.user.user_id}
              icon={<FaSlackHash size={22} />}
            />
            <ListTile
              label="Имя"
              bold
              value={data?.user.name}
              icon={<FaUser size={22} />}
            />
            <ListTile
              label="Телефон"
              bold
              value={data?.user.phone}
              icon={<MdSmartphone size={22} />}
            />
          </Stack>
          <ListTile
            label="Email"
            bold
            value={data?.user.email}
            icon={<MdEmail size={22} />}
          />
          <ListTile
            label="Aдрес"
            bold
            value={data?.address}
            icon={<MdLocationOn size={22} />}
          />
          {/* <ListTile bold label="Название" bold value={product.name_ru} />
            <ListTile bold label="Ид" value={product.od_id} />
            <ListTile bold label="Размер" value={product.size} />
            <ListTile bold label="Кол-во" value={product.count} />
            <ListTile bold label="Цена" value={product.cost_price} />
            <ListTile bold label="usd price" value={product.usd_price} />
          */}
        </div>
      </AppModal>
    </>
  )
}

export default OrderDetailUserInfo
