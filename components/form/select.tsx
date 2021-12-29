import { FormControl, InputLabel, Select } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

interface Props {
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  variant?: 'outlined' | 'filled' | 'standard'
  disabled?: boolean
  errMsg?: string
  err?: boolean
  fullWidth?: boolean
  margin?: 'normal' | 'dense' | 'none'
}

const FormSelect: React.FC<Props> = props => {
  const {
    name,
    control,
    label,
    children,
    size = 'medium',
    variant = 'outlined',
    margin = 'dense',
    fullWidth = true,
    disabled,
    err,
    errMsg
  } = props

  if (!children) console.log(`Options was not provided for FormSelect component with name: ${name}`)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => {
        const msg = error ? error.message : null

        return (
          <FormControl
            size={size}
            margin={margin}
            fullWidth={fullWidth}
            disabled={disabled || formState.isSubmitting}
            error={Boolean(error) || err}
          >
            <InputLabel>{label}</InputLabel>
            <Controller
              render={({ field: { onChange, value } }) => (
                <Select variant={variant} onChange={onChange} value={value} label={label}>
                  {children}
                </Select>
              )}
              control={control}
              name={name}
            />
          </FormControl>
        )
      }}
    />
  )
}

export default FormSelect
