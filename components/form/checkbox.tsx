import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@mui/material'
import ReactInputMask from 'react-input-mask'

interface Props {
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'default' | undefined
  disabled?: boolean
  errMsg?: string
  err?: boolean
  fullWidth?: boolean
  margin?: 'normal' | 'dense' | 'none'
}

const FormCheckbox = (props: Props) => {
  const {
    name,
    label,
    control,
    size = 'medium',
    color = 'primary',
    disabled = false,
    err,
    errMsg,
    fullWidth = false,
    margin = 'dense'
  } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => {
        const msg = error ? error.message : null

        return (
          <FormControl margin={margin} fullWidth={fullWidth}>
            <FormControlLabel
              control={
                <Checkbox
                  size={size}
                  onChange={onChange}
                  disabled={disabled || formState.isSubmitting}
                  color={color}
                  checked={value}
                  // error={Boolean(error) || err}
                />
              }
              label={
                <Typography
                  variant="inherit"
                  sx={{ userSelect: 'none', opacity: disabled || formState.isSubmitting ? 0.7 : 1 }}
                >
                  {label}
                </Typography>
              }
            />
          </FormControl>
        )
      }}
    />
  )
}

export default FormCheckbox
