import AppModal from '@/components/common/modal'
import FormTextField from '@/components/form/textfield'
import { IConstant } from '@/hooks/queries/constants/types'
import { useConstantsQuery } from '@/hooks/queries/constants/useConstantsQuery'
import api from '@/lib/axios'
import { getConstantsName } from '@/lib/utils'
import { Button, CircularProgress, Stack } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Props {
  constant: IConstant
}

const DashboarConstantEdit: React.FC<Props> = props => {
  const { refetch } = useConstantsQuery()
  const { children, constant } = props
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const title = getConstantsName(constant.key)

  const openModal = () => setIsOpen(true)
  const defaultValues = {
    key: constant.value || ''
  }

  async function onSubmit(values: typeof defaultValues) {
    try {
      setIsLoading(true)
      await api.patch(`/constants/${constant.const_id}`, {
        value: values.key
      })
      refetch()
      setIsLoading(false)
      setIsOpen(false)
      toast.success(`${title} | успешно изменено`)
    } catch (error: any) {
      setIsLoading(false)
      console.log(error)
      const errorMessage = error?.response?.data?.message || 'Что-то пошло не так'
      toast.error(errorMessage, {
        toastId: 'submit-error'
      })
    }
  }

  const { control, handleSubmit } = useForm({ defaultValues })

  return (
    <>
      <div onClick={openModal}>{children}</div>

      <AppModal open={isOpen} onClose={setIsOpen} title={`Изменить значение `}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FormTextField name="key" label={title} control={control} />

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
          </Stack>
        </form>
      </AppModal>
    </>
  )
}

export default DashboarConstantEdit
