import AppModal from '@/components/common/modal'
import FormSelect from '@/components/form/select'
import { IOrderProductFull } from '@/hooks/queries/orders/types'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { useStatusesAllQuery } from '@/hooks/queries/statuses/useStatusesAllQuery'
import api from '@/lib/axios'
import { filterOutFalsyItems, getStatusColor } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Button, Chip, CircularProgress, MenuItem, Stack } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { toast } from 'react-toastify'
import { schema } from './schema'

interface Props {
  product: IOrderProductFull
}

const OrderDetailProductStatus = ({ product }: Props) => {
  const { refetch } = useOrdersOneQuery()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { data: statuses } = useStatusesAllQuery()

  const openModal = () => setIsOpen(true)

  const defaultValues = {
    status: product?.status ?? ''
  }

  async function onSubmit(values: typeof defaultValues) {
    try {
      setIsLoading(true)
      const dataToServer = filterOutFalsyItems(values)

      await api.patch(`/admin/order-details/${product.od_id}`, dataToServer)
      await refetch()
      setIsLoading(false)
      setIsOpen(false)
      toast.success('Статус успешно изменен')
    } catch (error: any) {
      console.log(error)

      setIsLoading(false)
      const errorMessage = error?.response?.data?.message || 'Что-то пошло не так'
      toast.error(errorMessage, {
        toastId: 'submit-error'
      })
    }
  }
  const { control, handleSubmit, reset } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  React.useEffect(() => {
    // if (isOpen) reset()
  }, [isOpen, reset])

  return (
    <>
      <Chip
        icon={<MdModeEdit style={{ paddingLeft: 4 }} size={20} />}
        label={product.statusDetail?.name}
        color={getStatusColor(product.statusDetail).color}
        onClick={openModal}
      />

      <AppModal
        title="Изменить статус товара"
        open={isOpen}
        onClose={setIsOpen}
        disableBackdropClick
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} style={{ width: '100%' }}>
            <FormSelect name="status" label="Статус" control={control}>
              {statuses?.map(s => (
                <MenuItem key={s.id} value={s.code}>
                  {s.name}
                </MenuItem>
              ))}
            </FormSelect>
          </Stack>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
            sx={{ mt: 3 }}
          >
            <Button
              disabled={isLoading}
              startIcon={<FaTimes size="18" />}
              disableElevation
              type="button"
              variant="contained"
              color="error"
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </Button>
            <Button
              disabled={isLoading}
              startIcon={
                isLoading ? <CircularProgress size=".9em" /> : <FaEdit size="18" />
              }
              disableElevation
              type="submit"
              variant="contained"
              color="primary"
            >
              Изменить
            </Button>
          </Stack>
        </form>
      </AppModal>
    </>
  )
}

export default OrderDetailProductStatus
