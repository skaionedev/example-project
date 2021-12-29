import ListTile from '@/components/common/list-tile'
import AppModal from '@/components/common/modal'
import { IOrderProductFull } from '@/hooks/queries/orders/types'
import { IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { BiLinkExternal } from 'react-icons/bi'

interface Props {
  product: IOrderProductFull
}

const OrderDetailProductInfo = ({ product }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = () => setIsOpen(true)

  return (
    <>
      <Tooltip title="Подробности">
        <IconButton size="small" onClick={openModal}>
          <BiLinkExternal />
        </IconButton>
      </Tooltip>

      <AppModal
        title="Информация о товаре"
        open={isOpen}
        onClose={setIsOpen}
        disableBackdropClick
        maxWidth="sm"
      >
        <div style={{ marginLeft: -14 }}>
          <ListTile bold label="Название" value={product.name_ru} />
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <ListTile bold label="Ид" value={product.od_id} />
            <ListTile bold label="Размер" value={product.size} />
            <ListTile bold label="Кол-во" value={product.count} />
            <ListTile bold label="Цена" value={product.cost_price} />
            <ListTile bold label="usd price" value={product.usd_price} />
          </Stack>
        </div>
      </AppModal>
    </>
  )
}

export default OrderDetailProductInfo
